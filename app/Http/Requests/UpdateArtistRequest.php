<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateArtistRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() != null;
    }

    public function rules(): array
    {
        $artistId = $this->route('artist')?->id ?? $this->route('artist');

        return [
            'name' => 'required|string|max:150',
            'slug' => 'nullable|string|max:160|unique:artists,slug,' . $artistId,
            'bio' => 'nullable|string|max:4000',
            'avatar' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'banner' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',
            'is_verified' => 'sometimes|boolean',
        ];
    }
}
