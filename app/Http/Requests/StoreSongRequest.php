<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSongRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() != null;
    }

    public function rules(): array
    {
        return [
            'artist_id' => 'required|exists:artists,id',
            'album_id' => 'nullable|exists:albums,id',
            'title' => 'required|string|max:250',
            'slug' => 'nullable|string|max:260|unique:songs,slug',
            'lyrics' => 'nullable|string',
            'audio' => 'required|file|mimetypes:audio/mpeg,audio/wav,audio/ogg|mimes:mp3,wav,ogg|max:20480',
            'cover' => 'nullable|image|mimetypes:image/jpeg,image/png,image/webp|mimes:jpg,jpeg,png,webp|max:4096',
            'duration' => 'nullable|integer|min:0',
            'release_date' => 'nullable|date',
        ];
    }
}
