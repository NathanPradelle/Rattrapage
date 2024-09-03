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
        Schema::create('harvest_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('building_number')->nullable();
            $table->string('street')->nullable();
            $table->string('city')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('country')->nullable();
            $table->integer('quantity');
            $table->date('preferred_date');
            $table->enum('period', ['morning', 'afternoon', 'evening']); // Période de la journée
            $table->foreignId('warehouse_id')->constrained()->onDelete('cascade'); // Secteur basé sur la ville du bâtiment de stockage
            $table->enum('status', ['pending', 'assigned', 'completed', 'refused'])->default('pending');
            $table->text('note')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('harvest_requests');
    }
};
