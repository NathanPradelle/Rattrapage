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
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // L'utilisateur qui fait la demande
            $table->string('building_number')->nullable(); // Numéro de bâtiment
            $table->string('street')->nullable(); // Rue
            $table->string('city')->nullable(); // Ville
            $table->string('postal_code')->nullable(); // Code postal
            $table->string('country')->nullable(); // Pays
            $table->integer('quantity');
            $table->date('preferred_date');
            $table->enum('status', ['pending', 'assigned', 'completed'])->default('pending'); // Retirer 'cancelled'
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
