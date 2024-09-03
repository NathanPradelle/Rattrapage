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
        Schema::create('plannings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user')
                ->constrained('user')
                ->cascadeOnDelete();
            $table->foreignId('service')
                ->constrained('service')
                ->cascadeOnDelete();
            $table->foreignId('harvest_tour')
                ->constrained('harvest_tour')
                ->cascadeOnDelete();
            $table->foreignId('distribution_tours')
                ->constrained('distribution_tours')
                ->cascadeOnDelete();
            $table->date('date')->nullable();
            $table->time('time_start')->nullable();
            $table->time('time_end')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plannings');
    }
};
