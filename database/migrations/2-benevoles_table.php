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
        Schema::create('benevoles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('phone_number'); // Numéro de téléphone
            $table->boolean('validation')->default(0); // Status de validation, par défaut à 0 (non validé)
            $table->text('motif'); // Motif de la candidature
            $table->foreignId('service_id')->constrained()->onDelete('cascade'); // Un seul service
            $table->foreignId('warehouse_id')->constrained()->onDelete('cascade'); // Warehouse associé
            $table->string('nationalite'); // Nationalité
            $table->date('date_derniere_candidature'); // Date de dernière candidature
            $table->integer('age'); // Âge du bénévole
            $table->text('refus')->nullable(); // Motif de refus
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('benevoles');
    }
};
