<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('track_favorites', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('track_id')->constrained('tracks')->cascadeOnDelete();
            $table->timestampTz('favorited_at')->useCurrent();
            $table->unique(['user_id', 'track_id']);
            $table->index(['track_id', 'user_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('track_favorites');
    }
};
