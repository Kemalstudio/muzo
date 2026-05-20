<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SongResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'lyrics' => $this->lyrics,
            'audio_url' => $this->audio_url,
            'cover_url' => $this->cover_url,
            'duration' => $this->duration,
            'release_date' => $this->release_date?->toDateString(),
            'artist' => $this->whenLoaded('artist', function () {
                return [
                    'id' => $this->artist->id,
                    'name' => $this->artist->name,
                    'slug' => $this->artist->slug,
                ];
            }),
            'album' => $this->whenLoaded('album', function () {
                return [
                    'id' => $this->album->id,
                    'title' => $this->album->title,
                    'slug' => $this->album->slug,
                ];
            }),
            'created_at' => $this->created_at?->toDateTimeString(),
            'updated_at' => $this->updated_at?->toDateTimeString(),
        ];
    }
}
