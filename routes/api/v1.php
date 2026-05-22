<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\GenreController;
use App\Http\Controllers\Api\ArtistController;
use App\Http\Controllers\Api\SongController;
use App\Http\Controllers\Api\FavoritesController;
use App\Http\Controllers\Api\HistoryController;
use App\Http\Controllers\Api\UserController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::apiResource('genres', GenreController::class)->only(['index', 'show']);
Route::apiResource('artists', ArtistController::class)->only(['index', 'show']);
Route::apiResource('albums', 'App\\Http\\Controllers\\Api\\AlbumController')->only(['index', 'show']);
Route::apiResource('songs', SongController::class)->only(['index', 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);

    Route::apiResource('users', UserController::class)->only(['index', 'show', 'update', 'destroy']);
    Route::apiResource('genres', GenreController::class)->only(['store', 'update', 'destroy']);
    Route::apiResource('artists', ArtistController::class)->only(['store', 'update', 'destroy']);
    Route::apiResource('albums', 'App\\Http\\Controllers\\Api\\AlbumController')->only(['store', 'update', 'destroy']);
    Route::apiResource('songs', SongController::class)->only(['store', 'update', 'destroy']);

    Route::get('me/favorites', [FavoritesController::class, 'index']);
    Route::get('me/favorites/count', [FavoritesController::class, 'count']);
    Route::post('tracks/{track}/favorite', [FavoritesController::class, 'store']);
    Route::delete('tracks/{track}/favorite', [FavoritesController::class, 'destroy']);
    Route::get('tracks/{track}/favorite', [FavoritesController::class, 'show']);
    Route::post('favorites/batch-add', [FavoritesController::class, 'batchAdd']);
    Route::post('favorites/batch-remove', [FavoritesController::class, 'batchRemove']);

    Route::get('me/history', [HistoryController::class, 'index']);
    Route::get('me/history/grouped', [HistoryController::class, 'groupedByDate']);
    Route::get('me/history/stats', [HistoryController::class, 'stats']);
    Route::post('tracks/{track}/play', [HistoryController::class, 'store']);
    Route::delete('me/history', [HistoryController::class, 'clear']);
});
