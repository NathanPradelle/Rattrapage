<?php

namespace Database\Seeders;

use App\Models\HarvestRequest;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HarvestRequestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        HarvestRequest::factory()->count(50)->create();
    }
}
