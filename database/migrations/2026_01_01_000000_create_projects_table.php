<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->string('id')->primary(); // Preserves Firebase document ID (e.g. iasIFGOcdOlRZvYNNB4a)
            $table->string('user_id')->index(); // Firebase UID or local user ID/firebase_uid reference
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->json('layers')->nullable();
            $table->json('data')->nullable(); // Show/movie metadata details mapped by ID
            $table->string('bookmark')->nullable();
            $table->string('space_multi_parters')->default('normally');
            $table->integer('streak_duration')->nullable();
            $table->integer('streaks_per_session')->nullable();
            $table->integer('session_duration')->nullable();
            $table->boolean('show_streaks')->default(true);
            $table->boolean('group_streaks')->default(false);
            $table->bigInteger('last_modified')->nullable();
            $table->timestamps();
        });

        Schema::create('project_members', function (Blueprint $table) {
            $table->id();
            $table->string('project_id');
            $table->string('user_id');
            $table->timestamps();

            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
            $table->unique(['project_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_members');
        Schema::dropIfExists('projects');
    }
};
