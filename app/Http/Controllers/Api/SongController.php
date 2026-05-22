<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSongRequest;
use App\Http\Requests\UpdateSongRequest;
use App\Http\Resources\SongResource;
use App\Models\Song;
use App\Services\FileUploadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class SongController extends Controller
{
    public function __construct(protected FileUploadService $uploads)
    {
        $this->authorizeResource(Song::class, 'song');
    }

    public function index(Request $request)
    {
        $perPage = (int) $request->get('per_page', 20);
        $cacheKey = sprintf('songs.index.%s', md5($request->fullUrl()));

        $data = Cache::remember($cacheKey, now()->addMinutes(10), function () use ($request, $perPage) {
            $songs = Song::with(['artist:id,name,slug', 'album:id,title,slug'])
                ->orderBy('release_date', 'desc')
                ->paginate($perPage);

            return SongResource::collection($songs->appends($request->query()))->response()->getData(true);
        });

        return response()->json($data);
    }

    public function store(StoreSongRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('audio')) {
            $data['audio_path'] = $this->uploads->storePublicFile($request->file('audio'), 'songs/audio');
        }

        if ($request->hasFile('cover')) {
            $data['cover_path'] = $this->uploads->storePublicFile($request->file('cover'), 'songs/covers');
        }

        $song = Song::create($data);

        return new SongResource($song->load(['artist', 'album']));
    }

    public function show(Song $song)
    {
        $cacheKey = sprintf('songs.show.%s.%s', $song->id, $song->updated_at?->timestamp);

        $data = Cache::remember($cacheKey, now()->addMinutes(30), function () use ($song) {
            return (new SongResource($song->load(['artist', 'album'])))->response()->getData(true);
        });

        return response()->json($data);
    }

    public function update(UpdateSongRequest $request, Song $song)
    {
        $data = $request->validated();

        if ($request->hasFile('audio')) {
            $data['audio_path'] = $this->uploads->replacePublicFile($song->audio_path, $request->file('audio'), 'songs/audio');
        }

        if ($request->hasFile('cover')) {
            $data['cover_path'] = $this->uploads->replacePublicFile($song->cover_path, $request->file('cover'), 'songs/covers');
        }

        $song->update($data);

        return new SongResource($song->fresh(['artist', 'album']));
    }

    public function destroy(Song $song)
    {
        $this->uploads->deletePublicFile($song->audio_path);
        $this->uploads->deletePublicFile($song->cover_path);

        $song->delete();

        return response()->noContent();
    }
}
