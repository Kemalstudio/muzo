<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\User;
use App\Models\Genre;
use App\Policies\UserPolicy;
use App\Policies\GenrePolicy;
use App\Models\Artist;
use App\Policies\ArtistPolicy;
use App\Models\Album;
use App\Models\Song;
use App\Policies\AlbumPolicy;
use App\Policies\SongPolicy;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        User::class => UserPolicy::class,
        Genre::class => GenrePolicy::class,
        Artist::class => ArtistPolicy::class,
        Album::class => AlbumPolicy::class,
        Song::class => SongPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();
    }
}
