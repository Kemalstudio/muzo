<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AlbumResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'cover_url' => $this->cover_url ?? null,
            'released_at' => $this->released_at?->toDateString(),
            'artist' => $this->whenLoaded('artist', function () {
                return [
                    'id' => $this->artist->id,
                    'name' => $this->artist->name,
                    'slug' => $this->artist->slug,
                    'avatar_url' => $this->artist->avatar_url ?? null,
                ];
            }),
            'tracks_count' => $this->when(isset($this->tracks_count), $this->tracks_count),
            'created_at' => $this->created_at?->toDateTimeString(),
            'updated_at' => $this->updated_at?->toDateTimeString(),
        ];
    }
}
