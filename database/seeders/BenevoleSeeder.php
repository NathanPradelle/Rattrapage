<?php

namespace Database\Seeders;

use App\Models\Benevole;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BenevoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Benevole::factory()->count(50)->create(); // Crée 50 bénévoles
    }
}
