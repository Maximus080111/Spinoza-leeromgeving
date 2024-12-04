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
        Schema::create('question1', function (Blueprint $table) {
            $table->id();
            $table->string('image');
            $table->string('correct');
            $table->string('incorrect1');
            $table->string('incorrect2');
            $table->string('incorrect3');
            $table->foreignId('thema_id')->references('id')->on('themas')->onDelete('cascade');
            $table->foreignId('lesson_id')->references('id')->on('lesson')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('question1');
    }
};
