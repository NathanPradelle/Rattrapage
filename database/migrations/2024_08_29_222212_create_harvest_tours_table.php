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
        Schema::create('harvest_tours', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->foreignId('warehouse_id')->constrained()->onDelete('cascade');
            $table->enum('period', ['morning', 'afternoon', 'evening']);
            $table->foreignId('volunteer_driver_id')->constrained('users')->onDelete('cascade');
            $table->json('volunteer_assistants_ids'); // Stockage des assistants en tant que JSON
            $table->json('harvest_requests_ids'); // Stockage des demandes de récolte en tant que JSON
            $table->enum('status', ['pending', 'approved', 'completed', 'cancelled'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('harvest_tours');
    }
};
