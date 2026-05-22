<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAlbumRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() != null;
    }

    public function rules(): array
    {
        return [
            'artist_id' => 'required|exists:artists,id',
            'title' => 'required|string|max:200',
            'slug' => 'nullable|string|max:220|unique:albums,slug',
            'description' => 'nullable|string|max:4000',
            'cover' => 'nullable|image|mimetypes:image/jpeg,image/png,image/webp|mimes:jpg,jpeg,png,webp|max:4096',
            'released_at' => 'nullable|date',
        ];
    }
}
