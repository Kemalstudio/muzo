<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Song extends Model
{
    use HasFactory;

    protected $fillable = [
        'artist_id',
        'album_id',
        'title',
        'slug',
        'lyrics',
        'audio_path',
        'cover_path',
        'duration',
        'release_date',
    ];

    protected $casts = [
        'duration' => 'integer',
        'release_date' => 'date',
    ];

    public function artist()
    {
        return $this->belongsTo(Artist::class);
    }

    public function album()
    {
        return $this->belongsTo(Album::class);
    }

    public function getAudioUrlAttribute()
    {
        return Storage::url($this->audio_path);
    }

    public function getCoverUrlAttribute()
    {
        if (! $this->cover_path) {
            return null;
        }

        return Storage::url($this->cover_path);
    }
}
