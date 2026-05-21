<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Models\Track;
use App\Models\User;

class FavoritesController extends Controller
{
    /**
     * Get all favorite tracks for authenticated user
     */
    public function index(Request $request)
    {
        $favorites = $request->user()->favoriteTracks()
            ->with(['artist', 'album'])
            ->orderByDesc('track_favorites.favorited_at')
            ->paginate(50);

        return response()->json($favorites);
    }

    /**
     * Check if a track is favorited by user
     */
    public function show(Request $request, Track $track)
    {
        $isFavorited = $request->user()->favoriteTracks()->where('track_id', $track->id)->exists();

        return response()->json([
            'track_id' => $track->id,
            'is_favorited' => $isFavorited,
        ]);
    }

    /**
     * Add track to favorites
     */
    public function store(Request $request, Track $track)
    {
        $user = $request->user();

        // Check if already favorited
        if ($user->favoriteTracks()->where('track_id', $track->id)->exists()) {
            return response()->json([
                'message' => 'Track already in favorites',
                'is_favorited' => true,
            ], 200);
        }

        // Add to favorites
        $user->favoriteTracks()->attach($track->id);

        return response()->json([
            'message' => 'Track added to favorites',
            'is_favorited' => true,
            'track' => $track->load(['artist', 'album']),
        ], 201);
    }

    /**
     * Remove track from favorites
     */
    public function destroy(Request $request, Track $track)
    {
        $user = $request->user();

        // Check if favorited
        if (!$user->favoriteTracks()->where('track_id', $track->id)->exists()) {
            return response()->json([
                'message' => 'Track not in favorites',
                'is_favorited' => false,
            ], 200);
        }

        // Remove from favorites
        $user->favoriteTracks()->detach($track->id);

        return response()->json([
            'message' => 'Track removed from favorites',
            'is_favorited' => false,
        ]);
    }

    /**
     * Get count of user's favorite tracks
     */
    public function count(Request $request)
    {
        $count = $request->user()->favoriteTracks()->count();

        return response()->json([
            'count' => $count,
        ]);
    }

    /**
     * Batch add tracks to favorites
     */
    public function batchAdd(Request $request)
    {
        $request->validate([
            'track_ids' => 'required|array',
            'track_ids.*' => 'integer|exists:tracks,id',
        ]);

        $user = $request->user();
        $trackIds = $request->input('track_ids');

        // Get already favorited tracks
        $alreadyFavorited = $user->favoriteTracks()
            ->whereIn('track_id', $trackIds)
            ->pluck('track_id')
            ->toArray();

        // Only add tracks that aren't already favorited
        $toAdd = array_diff($trackIds, $alreadyFavorited);

        if (!empty($toAdd)) {
            $user->favoriteTracks()->attach($toAdd);
        }

        return response()->json([
            'message' => 'Tracks added to favorites',
            'added_count' => count($toAdd),
            'already_favorited_count' => count($alreadyFavorited),
        ]);
    }

    /**
     * Batch remove tracks from favorites
     */
    public function batchRemove(Request $request)
    {
        $request->validate([
            'track_ids' => 'required|array',
            'track_ids.*' => 'integer|exists:tracks,id',
        ]);

        $user = $request->user();
        $trackIds = $request->input('track_ids');

        $user->favoriteTracks()->detach($trackIds);

        return response()->json([
            'message' => 'Tracks removed from favorites',
            'removed_count' => count($trackIds),
        ]);
    }
}
