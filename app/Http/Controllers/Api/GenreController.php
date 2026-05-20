<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreGenreRequest;
use App\Http\Requests\UpdateGenreRequest;
use App\Http\Resources\GenreResource;
use App\Models\Genre;
use Illuminate\Http\Request;

class GenreController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Genre::class, 'genre');
    }

    public function index(Request $request)
    {
        $perPage = (int) $request->get('per_page', 20);
        $genres = Genre::orderBy('name')->paginate($perPage);
        return GenreResource::collection($genres);
    }

    public function store(StoreGenreRequest $request)
    {
        $genre = Genre::create($request->validated());
        return new GenreResource($genre);
    }

    public function show(Genre $genre)
    {
        return new GenreResource($genre);
    }

    public function update(UpdateGenreRequest $request, Genre $genre)
    {
        $genre->update($request->validated());
        return new GenreResource($genre);
    }

    public function destroy(Genre $genre)
    {
        $genre->delete();
        return response()->noContent();
    }
}
