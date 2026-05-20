<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tracks', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('artist_id')->constrained('artists')->cascadeOnDelete();
            $table->foreignId('album_id')->nullable()->constrained('albums')->nullOnDelete();
            $table->string('title')->index();
            $table->string('slug')->unique();
            $table->integer('duration')->unsigned()->comment('Length in seconds');
            $table->boolean('explicit')->default(false);
            $table->integer('play_count')->unsigned()->default(0)->index();
            $table->timestampTz('released_at')->nullable();
            $table->string('audio_url');
            $table->jsonb('metadata')->nullable();
            $table->timestampsTz();
        });

        Schema::table('tracks', function (Blueprint $table) {
            $table->index(['artist_id', 'album_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tracks');
    }
};
