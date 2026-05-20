<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreArtistRequest;
use App\Http\Requests\UpdateArtistRequest;
use App\Http\Resources\ArtistResource;
use App\Models\Artist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ArtistController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Artist::class, 'artist');
    }

    public function index(Request $request)
    {
        $perPage = (int) $request->get('per_page', 20);
        $artists = Artist::withCount(['tracks', 'albums'])->orderBy('name')->paginate($perPage);
        return ArtistResource::collection($artists->appends($request->query()));
    }

    public function store(StoreArtistRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('avatar')) {
            $data['avatar_path'] = $request->file('avatar')->store('artists/avatars', 'public');
        }

        if ($request->hasFile('banner')) {
            $data['banner_path'] = $request->file('banner')->store('artists/banners', 'public');
        }

        $artist = Artist::create($data);

        return new ArtistResource($artist);
    }

    public function show(Artist $artist)
    {
        $artist->load(['tracks' => function ($q) {
            $q->select('id', 'artist_id', 'title', 'slug', 'duration', 'audio_url')->limit(10);
        }, 'albums' => function ($q) {
            $q->select('id', 'artist_id', 'title', 'slug')->limit(10);
        }]);

        return new ArtistResource($artist);
    }

    public function update(UpdateArtistRequest $request, Artist $artist)
    {
        $data = $request->validated();

        if ($request->hasFile('avatar')) {
            // delete previous
            if ($artist->avatar_path) {
                Storage::disk('public')->delete($artist->avatar_path);
            }
            $data['avatar_path'] = $request->file('avatar')->store('artists/avatars', 'public');
        }

        if ($request->hasFile('banner')) {
            if ($artist->banner_path) {
                Storage::disk('public')->delete($artist->banner_path);
            }
            $data['banner_path'] = $request->file('banner')->store('artists/banners', 'public');
        }

        $artist->update($data);

        return new ArtistResource($artist);
    }

    public function destroy(Artist $artist)
    {
        if ($artist->avatar_path) {
            Storage::disk('public')->delete($artist->avatar_path);
        }
        if ($artist->banner_path) {
            Storage::disk('public')->delete($artist->banner_path);
        }

        $artist->delete();

        return response()->noContent();
    }
}
