<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Models\Track;
use App\Models\Listen;

class HistoryController extends Controller
{
    /**
     * Get user's recently played tracks
     */
    public function index(Request $request)
    {
        $limit = $request->query('limit', 50);

        $history = $request->user()->listens()
            ->with(['track.artist', 'track.album'])
            ->orderByDesc('listened_at')
            ->limit($limit)
            ->get()
            ->unique('track_id')
            ->values();

        return response()->json([
            'data' => $history,
            'count' => $history->count(),
        ]);
    }

    /**
     * Record a play event for a track
     */
    public function store(Request $request)
    {
        $request->validate([
            'track_id' => 'required|integer|exists:tracks,id',
            'context' => 'nullable|array',
        ]);

        $user = $request->user();
        $trackId = $request->input('track_id');
        $context = $request->input('context', []);

        // Record the listen
        $listen = Listen::create([
            'user_id' => $user->id,
            'track_id' => $trackId,
            'listened_at' => now(),
            'ip_address' => $request->ip(),
            'client_context' => $context,
        ]);

        // Increment track play count
        $track = Track::find($trackId);
        if ($track) {
            $track->increment('play_count');
        }

        return response()->json([
            'message' => 'Play recorded',
            'listen' => $listen->load(['track.artist', 'track.album']),
        ], 201);
    }

    /**
     * Get recently played tracks grouped by date
     */
    public function groupedByDate(Request $request)
    {
        $user = $request->user();

        $listens = $user->listens()
            ->with(['track.artist', 'track.album'])
            ->orderByDesc('listened_at')
            ->get();

        $grouped = $listens
            ->unique('track_id')
            ->groupBy(function ($listen) {
                return $listen->listened_at->format('Y-m-d');
            })
            ->map(function ($group) {
                return [
                    'date' => $group[0]->listened_at->format('Y-m-d'),
                    'day_label' => $this->getDayLabel($group[0]->listened_at),
                    'tracks' => $group->values()->all(),
                ];
            })
            ->values();

        return response()->json([
            'data' => $grouped,
        ]);
    }

    /**
     * Get play stats
     */
    public function stats(Request $request)
    {
        $user = $request->user();

        $totalPlays = $user->listens()->count();
        $uniqueTracks = $user->listens()->distinct('track_id')->count();
        $topTrack = $user->listens()
            ->with('track.artist')
            ->select('track_id')
            ->groupBy('track_id')
            ->selectRaw('track_id, COUNT(*) as play_count')
            ->orderByDesc('play_count')
            ->first();

        return response()->json([
            'total_plays' => $totalPlays,
            'unique_tracks' => $uniqueTracks,
            'top_track' => $topTrack?->track->load('artist'),
            'top_track_plays' => $topTrack?->play_count ?? 0,
        ]);
    }

    /**
     * Clear play history (optional)
     */
    public function clear(Request $request)
    {
        $user = $request->user();
        $deletedCount = $user->listens()->delete();

        return response()->json([
            'message' => 'Play history cleared',
            'deleted_count' => $deletedCount,
        ]);
    }

    /**
     * Get day label for grouped history
     */
    private function getDayLabel($date)
    {
        $today = now()->startOfDay();
        $yesterday = $today->copy()->subDay();
        $dateToCheck = $date->copy()->startOfDay();

        if ($dateToCheck->isSameDay($today)) {
            return 'Today';
        } elseif ($dateToCheck->isSameDay($yesterday)) {
            return 'Yesterday';
        } elseif ($dateToCheck->isCurrentWeek()) {
            return $dateToCheck->format('l'); // e.g., 'Monday'
        } elseif ($dateToCheck->isCurrentYear()) {
            return $dateToCheck->format('M d'); // e.g., 'May 21'
        } else {
            return $dateToCheck->format('M d, Y');
        }
    }
}
