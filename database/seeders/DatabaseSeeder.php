<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test Particulier',
            'email' => 'test@example1.com',
            'password' => 'password',
            'role' => '0',
        ]);

        User::factory()->create([
            'name' => 'Test Benevole',
            'email' => 'test@example2.com',
            'password' => 'password',
            'role' => '1',
        ]);

        User::factory()->create([
            'name' => 'Test Admin',
            'email' => 'test@example3.com',
            'password' => 'password',
            'role' => '2',
        ]);
    }
}
