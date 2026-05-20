<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ArtistResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'bio' => $this->bio,
            'avatar_url' => $this->avatar_url ?? null,
            'banner_url' => $this->banner_url ?? null,
            'is_verified' => (bool) $this->is_verified,
            'tracks_count' => $this->whenLoaded('tracks', function () {
                return $this->tracks->count();
            }, null),
            'albums_count' => $this->whenLoaded('albums', function () {
                return $this->albums->count();
            }, null),
            'created_at' => $this->created_at?->toDateTimeString(),
            'updated_at' => $this->updated_at?->toDateTimeString(),
        ];
    }
}
