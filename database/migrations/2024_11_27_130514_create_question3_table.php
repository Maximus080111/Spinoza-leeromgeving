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
        Schema::create('question3', function (Blueprint $table) {
            $table->id();
            $table->string('image');
            $table->string('answer');
            $table->foreignId('theme_id')->references('id')->on('theme')->onDelete('cascade');
            $table->foreignId('lesson_id')->references('id')->on('lesson')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('question3');
    }
};
