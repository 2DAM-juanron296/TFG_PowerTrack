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
        Schema::create('routine_exercise_sets', function (Blueprint $table) {
            $table->id();
            $table->integer('order')->nullable();
            $table->integer('reps')->nullable();
            $table->double('weight')->nullable();

            $table->unsignedBigInteger('routine_exercise_id');
            $table->foreign('routine_exercise_id')
                  ->references('id')
                  ->on('routine_exercises')
                  ->onDelete('cascade');

            $table->unique(['routine_exercise_id', 'order']);    

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('routine_exercise_sets');
    }
};
