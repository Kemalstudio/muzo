<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Album extends Model
{
    use HasFactory;

    protected $fillable = [
        'artist_id',
        'title',
        'slug',
        'description',
        'cover_path',
        'released_at',
    ];

    protected $casts = [
        'released_at' => 'date',
    ];

    public function artist()
    {
        return $this->belongsTo(Artist::class);
    }

    public function tracks()
    {
        return $this->hasMany(Track::class);
    }

    public function songs()
    {
        return $this->hasMany(Song::class);
    }

    public function getCoverUrlAttribute()
    {
        if (! $this->cover_path) {
            return null;
        }

        return Storage::url($this->cover_path);
    }
}
