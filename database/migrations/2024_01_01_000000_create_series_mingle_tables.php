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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('firebase_uid')->nullable()->unique();
            $table->string('name')->nullable();
            $table->string('email')->unique();
            $table->string('avatar')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('projects', function (Blueprint $table) {
            $table->string('id')->primary(); // Preserving Firebase document ID string primary key
            $table->string('user_id');
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->json('layers')->nullable();
            $table->json('data')->nullable();
            $table->string('space_multi_parters')->default('normal');
            $table->integer('streak_duration')->nullable();
            $table->integer('streaks_per_session')->nullable();
            $table->integer('session_duration')->nullable();
            $table->boolean('show_streaks')->default(true);
            $table->boolean('group_streaks')->default(false);
            $table->timestamp('last_modified')->nullable();
            $table->timestamps();
        });

        Schema::create('project_members', function (Blueprint $table) {
            $table->string('project_id');
            $table->string('user_id');
            $table->primary(['project_id', 'user_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_members');
        Schema::dropIfExists('projects');
        Schema::dropIfExists('users');
    }
};
