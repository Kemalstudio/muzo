<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreGenreRequest;
use App\Http\Requests\UpdateGenreRequest;
use App\Http\Resources\GenreResource;
use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class GenreController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Genre::class, 'genre');
    }

    public function index(Request $request)
    {
        $perPage = (int) $request->get('per_page', 20);
        $cacheKey = sprintf('genres.index.%s', md5($request->fullUrl()));

        $data = Cache::remember($cacheKey, now()->addMinutes(10), function () use ($request, $perPage) {
            $genres = Genre::orderBy('name')->paginate($perPage);
            return GenreResource::collection($genres->appends($request->query()))->response()->getData(true);
        });

        return response()->json($data);
    }

    public function store(StoreGenreRequest $request)
    {
        $genre = Genre::create($request->validated());
        return new GenreResource($genre);
    }

    public function show(Genre $genre)
    {
        $cacheKey = sprintf('genres.show.%s.%s', $genre->id, $genre->updated_at?->timestamp);

        $data = Cache::remember($cacheKey, now()->addMinutes(30), function () use ($genre) {
            return (new GenreResource($genre))->response()->getData(true);
        });

        return response()->json($data);
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
