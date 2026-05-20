<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Track;
use App\Models\PlaylistTrack;

class Playlist extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'user_id',
        'title',
        'slug',
        'description',
        'is_public',
        'track_count',
        'metadata',
    ];

    protected $casts = [
        'is_public' => 'boolean',
        'metadata' => 'array',
    ];

    public function owner()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function tracks()
    {
        return $this->belongsToMany(Track::class)->using(PlaylistTrack::class)->withPivot('position')->withTimestamps();
    }
}
