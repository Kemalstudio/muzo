<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Artist extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'bio',
        'avatar_path',
        'banner_path',
        'is_verified',
    ];

    protected $casts = [
        'is_verified' => 'boolean',
    ];

    // Relationships
    public function tracks()
    {
        return $this->hasMany(Track::class);
    }

    public function albums()
    {
        return $this->hasMany(Album::class);
    }

    // Accessors for public URLs
    public function getAvatarUrlAttribute()
    {
        if (! $this->avatar_path) {
            return null;
        }

        return Storage::url($this->avatar_path);
    }

    public function getBannerUrlAttribute()
    {
        if (! $this->banner_path) {
            return null;
        }

        return Storage::url($this->banner_path);
    }
}

