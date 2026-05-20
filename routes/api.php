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
    });
});
