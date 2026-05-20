<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreGenreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() != null;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:100|unique:genres,name',
            'slug' => 'nullable|string|max:120|unique:genres,slug',
            'description' => 'nullable|string|max:2000',
        ];
    }
}
