<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('warehouses', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Nom du bâtiment de stockage
            $table->string('building_number')->nullable(); // Numéro de bâtiment
            $table->string('street')->nullable(); // Rue
            $table->string('city')->nullable(); // Ville
            $table->string('postal_code')->nullable(); // Code postal
            $table->string('country')->nullable(); // Pays
            $table->timestamps();
        });

        DB::table('warehouses')->insert([
            [
                'name' => 'Bâtiment A',
                'building_number' => '101',
                'street' => 'Rue de Paris',
                'city' => 'Paris',
                'postal_code' => '75001',
                'country' => 'France'
            ],
            [
                'name' => 'Bâtiment B',
                'building_number' => '202',
                'street' => 'Avenue du Prado',
                'city' => 'Marseille',
                'postal_code' => '13008',
                'country' => 'France'
            ],
            [
                'name' => 'Bâtiment C',
                'building_number' => '303',
                'street' => 'Boulevard des Belges',
                'city' => 'Limoges',
                'postal_code' => '87069',
                'country' => 'France'
            ],
            [
                'name' => 'Bâtiment D',
                'building_number' => '404',
                'street' => 'Rue Pizza',
                'city' => 'Naples',
                'postal_code' => '80078',
                'country' => 'Italie'
            ],
            [
                'name' => 'Bâtiment E',
                'building_number' => '505',
                'street' => 'Rue du foot',
                'city' => 'Milan',
                'postal_code' => '66002',
                'country' => 'Italie'
            ],
            [
                'name' => 'Bâtiment F',
                'building_number' => '606',
                'street' => 'Rue du Fish n chips',
                'city' => 'Dublin',
                'postal_code' => '44000',
                'country' => 'Ireland'
            ],
            [
                'name' => 'Bâtiment G',
                'building_number' => '707',
                'street' => 'Allée des Jonquilles',
                'city' => 'Nantes',
                'postal_code' => '44000',
                'country' => 'France'
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('warehouses');
    }
};
