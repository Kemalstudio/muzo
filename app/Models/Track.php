<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Artist;
use App\Models\Album;
use App\Models\Playlist;
use App\Models\PlaylistTrack;
use App\Models\User;
use App\Models\Listen;

class Track extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'artist_id',
        'album_id',
        'title',
        'slug',
        'duration',
        'explicit',
        'play_count',
        'released_at',
        'audio_url',
        'metadata',
    ];

    protected $casts = [
        'explicit' => 'boolean',
        'released_at' => 'datetime',
        'metadata' => 'array',
    ];

    public function artist()
    {
        return $this->belongsTo(Artist::class);
    }

    public function album()
    {
        return $this->belongsTo(Album::class);
    }

    public function playlists()
    {
        return $this->belongsToMany(Playlist::class)->using(PlaylistTrack::class)->withPivot('position')->withTimestamps();
    }

    public function favoritedBy()
    {
        return $this->belongsToMany(User::class, 'track_favorites')->withTimestamps();
    }

    public function listens()
    {
        return $this->hasMany(Listen::class);
    }
}
