<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSongRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() != null;
    }

    public function rules(): array
    {
        $songId = $this->route('song')?->id ?? $this->route('song');

        return [
            'artist_id' => 'required|exists:artists,id',
            'album_id' => 'nullable|exists:albums,id',
            'title' => 'required|string|max:250',
            'slug' => 'nullable|string|max:260|unique:songs,slug,' . $songId,
            'lyrics' => 'nullable|string',
            'audio' => 'nullable|file|mimetypes:audio/mpeg,audio/wav,audio/ogg|mimes:mp3,wav,ogg|max:20480',
            'cover' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',
            'duration' => 'nullable|integer|min:0',
            'release_date' => 'nullable|date',
        ];
    }
}
