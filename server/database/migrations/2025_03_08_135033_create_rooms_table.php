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
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Room owner
            $table->string('name');
            // $table->foreignId('background_id')->nullable()->constrained()->onDelete('set null');
            // $table->foreignId('sound_id')->nullable()->constrained()->onDelete('set null');
            $table->integer('goal_minutes')->default(25);
            $table->enum('status', ['idle', 'running', 'paused', 'ended'])->default('idle');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};
