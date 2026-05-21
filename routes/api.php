<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;

Route::prefix('v1')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);

    // Public genre listing and details
    Route::apiResource('genres', App\Http\Controllers\Api\GenreController::class)->only(['index','show']);
    // Public artist listing and details
    Route::apiResource('artists', App\Http\Controllers\Api\ArtistController::class)->only(['index','show']);
    // Public album listing and details
    Route::apiResource('albums', App\Http\Controllers\Api\AlbumController::class)->only(['index','show']);
    // Public song listing and details
    Route::apiResource('songs', App\Http\Controllers\Api\SongController::class)->only(['index','show']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('me', [AuthController::class, 'me']);
        Route::post('logout', [AuthController::class, 'logout']);
        Route::apiResource('users', UserController::class)->only(['index','show','update','destroy']);
        Route::apiResource('genres', App\Http\Controllers\Api\GenreController::class)->only(['store','update','destroy']);
        Route::apiResource('artists', App\Http\Controllers\Api\ArtistController::class)->only(['store','update','destroy']);
        Route::apiResource('albums', App\Http\Controllers\Api\AlbumController::class)->only(['store','update','destroy']);
        Route::apiResource('songs', App\Http\Controllers\Api\SongController::class)->only(['store','update','destroy']);

        // Favorites routes
        Route::get('me/favorites', [App\Http\Controllers\Api\FavoritesController::class, 'index']);
        Route::get('me/favorites/count', [App\Http\Controllers\Api\FavoritesController::class, 'count']);
        Route::post('tracks/{track}/favorite', [App\Http\Controllers\Api\FavoritesController::class, 'store']);
        Route::delete('tracks/{track}/favorite', [App\Http\Controllers\Api\FavoritesController::class, 'destroy']);
        Route::get('tracks/{track}/favorite', [App\Http\Controllers\Api\FavoritesController::class, 'show']);
        Route::post('favorites/batch-add', [App\Http\Controllers\Api\FavoritesController::class, 'batchAdd']);
        Route::post('favorites/batch-remove', [App\Http\Controllers\Api\FavoritesController::class, 'batchRemove']);

        // History routes
        Route::get('me/history', [App\Http\Controllers\Api\HistoryController::class, 'index']);
        Route::get('me/history/grouped', [App\Http\Controllers\Api\HistoryController::class, 'groupedByDate']);
        Route::get('me/history/stats', [App\Http\Controllers\Api\HistoryController::class, 'stats']);
        Route::post('tracks/{track}/play', [App\Http\Controllers\Api\HistoryController::class, 'store']);
        Route::delete('me/history', [App\Http\Controllers\Api\HistoryController::class, 'clear']);
    });
});
