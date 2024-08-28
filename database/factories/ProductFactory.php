<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Warehouse;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition()
    {
        return [
            'name' => $this->faker->word, // Nom fictif pour le produit
            'barcode' => $this->faker->unique()->ean13, // Description fictive
            'weight' => $this->faker->randomFloat(2, 0.1, 10), // Poids aléatoire entre 0.1kg et 10kg
            'brand' => $this->faker->company, // Marque fictive
            'expiry_date' => $this->faker->dateTimeBetween('+1 week', '+1 year'), // Date d'expiration aléatoire entre 1 semaine et 1 an
            'warehouse_id' => Warehouse::inRandomOrder()->first()->id, // ID aléatoire d'un entrepôt existant
        ];
    }
}
