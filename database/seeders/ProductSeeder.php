<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run()
    {
        // Créer 50 produits fictifs
        Product::factory()->count(50)->create();
    }
}
