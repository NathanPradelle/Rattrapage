<?php

namespace Database\Factories;

use App\Models\HarvestRequest;
use App\Models\User;
use App\Models\Warehouse;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\HarvestRequest>
 */
class HarvestRequestFactory extends Factory
{
    protected $model = HarvestRequest::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory()->state(['role' => 0]), // Génère un utilisateur associé
            'building_number' => $this->faker->buildingNumber,
            'street' => $this->faker->streetName,
            'city' => $this->faker->city,
            'postal_code' => $this->faker->postcode,
            'country' => $this->faker->country,
            'quantity' => $this->faker->numberBetween(1, 100),
            'preferred_date' => $this->faker->dateTimeBetween('now', '+1 month')->format('Y-m-d'),
            'period' => $this->faker->randomElement(['morning', 'afternoon', 'evening']),
            'warehouse_id' => Warehouse::inRandomOrder()->first()->id, // Génère un entrepôt associé
            'status' => $this->faker->randomElement(['pending', 'assigned', 'completed']),
            'note' => $this->faker->sentence,
        ];
    }
}
