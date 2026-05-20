<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSongRequest;
use App\Http\Requests\UpdateSongRequest;
use App\Http\Resources\SongResource;
use App\Models\Song;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SongController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Song::class, 'song');
    }

    public function index(Request $request)
    {
        $perPage = (int) $request->get('per_page', 20);
        $songs = Song::with(['artist:id,name,slug', 'album:id,title,slug'])
            ->orderBy('release_date', 'desc')
            ->paginate($perPage);

        return SongResource::collection($songs->appends($request->query()));
    }

    public function store(StoreSongRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('audio')) {
            $data['audio_path'] = $request->file('audio')->store('songs/audio', 'public');
        }

        if ($request->hasFile('cover')) {
            $data['cover_path'] = $request->file('cover')->store('songs/covers', 'public');
        }

        $song = Song::create($data);

        return new SongResource($song->load(['artist', 'album']));
    }

    public function show(Song $song)
    {
        return new SongResource($song->load(['artist', 'album']));
    }

    public function update(UpdateSongRequest $request, Song $song)
    {
        $data = $request->validated();

        if ($request->hasFile('audio')) {
            if ($song->audio_path) {
                Storage::disk('public')->delete($song->audio_path);
            }
            $data['audio_path'] = $request->file('audio')->store('songs/audio', 'public');
        }

        if ($request->hasFile('cover')) {
            if ($song->cover_path) {
                Storage::disk('public')->delete($song->cover_path);
            }
            $data['cover_path'] = $request->file('cover')->store('songs/covers', 'public');
        }

        $song->update($data);

        return new SongResource($song->fresh(['artist', 'album']));
    }

    public function destroy(Song $song)
    {
        if ($song->audio_path) {
            Storage::disk('public')->delete($song->audio_path);
        }

        if ($song->cover_path) {
            Storage::disk('public')->delete($song->cover_path);
        }

        $song->delete();

        return response()->noContent();
    }
}
