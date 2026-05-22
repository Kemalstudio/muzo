<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAlbumRequest;
use App\Http\Requests\UpdateAlbumRequest;
use App\Http\Resources\AlbumResource;
use App\Models\Album;
use App\Services\FileUploadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class AlbumController extends Controller
{
    public function __construct(protected FileUploadService $uploads)
    {
        $this->authorizeResource(Album::class, 'album');
    }

    public function index(Request $request)
    {
        $perPage = (int) $request->get('per_page', 20);
        $cacheKey = sprintf('albums.index.%s', md5($request->fullUrl()));

        $data = Cache::remember($cacheKey, now()->addMinutes(10), function () use ($request, $perPage) {
            $albums = Album::with(['artist:id,name,slug'])
                ->withCount('tracks')
                ->orderBy('released_at', 'desc')
                ->paginate($perPage);

            return AlbumResource::collection($albums->appends($request->query()))->response()->getData(true);
        });

        return response()->json($data);
    }

    public function store(StoreAlbumRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('cover')) {
            $data['cover_path'] = $this->uploads->storePublicFile($request->file('cover'), 'albums/covers');
        }

        $album = Album::create($data);

        return new AlbumResource($album->load('artist'));
    }

    public function show(Album $album)
    {
        $cacheKey = sprintf('albums.show.%s.%s', $album->id, $album->updated_at?->timestamp);

        $data = Cache::remember($cacheKey, now()->addMinutes(30), function () use ($album) {
            return (new AlbumResource($album->load('artist')))->response()->getData(true);
        });

        return response()->json($data);
    }

    public function update(UpdateAlbumRequest $request, Album $album)
    {
        $data = $request->validated();

        if ($request->hasFile('cover')) {
            $data['cover_path'] = $this->uploads->replacePublicFile($album->cover_path, $request->file('cover'), 'albums/covers');
        }

        $album->update($data);

        return new AlbumResource($album->fresh('artist'));
    }

    public function destroy(Album $album)
    {
        $this->uploads->deletePublicFile($album->cover_path);
        $album->delete();

        return response()->noContent();
    }
}
