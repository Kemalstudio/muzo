<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreArtistRequest;
use App\Http\Requests\UpdateArtistRequest;
use App\Http\Resources\ArtistResource;
use App\Models\Artist;
use App\Services\FileUploadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ArtistController extends Controller
{
    public function __construct(protected FileUploadService $uploads)
    {
        $this->authorizeResource(Artist::class, 'artist');
    }

    public function index(Request $request)
    {
        $perPage = (int) $request->get('per_page', 20);
        $cacheKey = sprintf('artists.index.%s', md5($request->fullUrl()));

        $data = Cache::remember($cacheKey, now()->addMinutes(10), function () use ($request, $perPage) {
            $artists = Artist::withCount(['tracks', 'albums'])->orderBy('name')->paginate($perPage);
            return ArtistResource::collection($artists->appends($request->query()))->response()->getData(true);
        });

        return response()->json($data);
    }

    public function store(StoreArtistRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('avatar')) {
            $data['avatar_path'] = $this->uploads->storePublicFile($request->file('avatar'), 'artists/avatars');
        }

        if ($request->hasFile('banner')) {
            $data['banner_path'] = $this->uploads->storePublicFile($request->file('banner'), 'artists/banners');
        }

        $artist = Artist::create($data);

        return new ArtistResource($artist);
    }

    public function show(Artist $artist)
    {
        $cacheKey = sprintf('artists.show.%s.%s', $artist->id, $artist->updated_at?->timestamp);

        $data = Cache::remember($cacheKey, now()->addMinutes(30), function () use ($artist) {
            $artist->load(['tracks' => function ($q) {
                $q->select('id', 'artist_id', 'title', 'slug', 'duration', 'audio_url')->limit(10);
            }, 'albums' => function ($q) {
                $q->select('id', 'artist_id', 'title', 'slug')->limit(10);
            }]);

            return (new ArtistResource($artist))->response()->getData(true);
        });

        return response()->json($data);
    }

    public function update(UpdateArtistRequest $request, Artist $artist)
    {
        $data = $request->validated();

        if ($request->hasFile('avatar')) {
            $data['avatar_path'] = $this->uploads->replacePublicFile($artist->avatar_path, $request->file('avatar'), 'artists/avatars');
        }

        if ($request->hasFile('banner')) {
            $data['banner_path'] = $this->uploads->replacePublicFile($artist->banner_path, $request->file('banner'), 'artists/banners');
        }

        $artist->update($data);

        return new ArtistResource($artist);
    }

    public function destroy(Artist $artist)
    {
        $this->uploads->deletePublicFile($artist->avatar_path);
        $this->uploads->deletePublicFile($artist->banner_path);

        $artist->delete();

        return response()->noContent();
    }
}
