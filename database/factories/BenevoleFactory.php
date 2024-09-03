<?php

namespace Database\Factories;

use App\Models\Benevole;
use App\Models\Service;
use App\Models\User;
use App\Models\Warehouse;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Benevole>
 */
class BenevoleFactory extends Factory
{
    protected $model = Benevole::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory()->state(['role' => 1]), // Génère un nouvel utilisateur
            'phone_number' => $this->faker->phoneNumber,
            'validation' => $this->faker->boolean(70), // 70% chance d'être validé
            'motif' => $this->faker->sentence,
            'service_id' => Service::inRandomOrder()->first()->id, // Génère un service associé
            'warehouse_id' => Warehouse::inRandomOrder()->first()->id, // Génère une warehouse associée
            'nationalite' => $this->faker->country,
            'date_derniere_candidature' => $this->faker->date,
            'age' => $this->faker->numberBetween(18, 60),
            'refus' => $this->faker->optional()->sentence,
        ];
    }
}
