<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('albums', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('artist_id')->constrained('artists')->cascadeOnDelete();
            $table->string('title')->index();
            $table->string('slug')->unique();
            $table->string('cover_art')->nullable();
            $table->text('description')->nullable();
            $table->timestampTz('released_at')->nullable();
            $table->integer('track_count')->unsigned()->default(0);
            $table->jsonb('metadata')->nullable();
            $table->timestampsTz();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('albums');
    }
};
