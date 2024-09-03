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
            $table->json('volunteer_assistants_ids');
            $table->json('harvest_requests_ids');
            $table->enum('status', ['pending', 'assigned', 'completed', 'cancelled'])->default('pending');
            $table->foreignId('chief_volunteer_id')->nullable()->constrained('users')->onDelete('set null');
            $table->string('pdf_link')->nullable(); // Retirer 'after `status`'
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
