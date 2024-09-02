<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

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
            'email' => 'test@example0.com',
            'password' => 'password',
            'role' => '0',
        ]);

        User::factory()->create([
            'name' => 'Test Benevole',
            'email' => 'test@example1.com',
            'password' => 'password',
            'role' => '1',
        ]);

        User::factory()->create([
            'name' => 'Test Admin',
            'email' => 'test@example2.com',
            'password' => 'password',
            'role' => '2',
        ]);

        User::factory()->count(5)->create();

        DB::table('services')->insert([
            ['id' => 1, 'name' => 'Routier', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 2, 'name' => 'Cuisinier', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 3, 'name' => 'Prof', 'created_at' => now(), 'updated_at' => now()],
        ]);

        // DB::statement("INSERT INTO 'benevoles' (user, profile) SELECT id, profile_in_use FROM 'users'");

        $this->call([
            BenevoleSeeder::class,
            HarvestRequestSeeder::class,
            ProductSeeder::class,
        ]);
    }
}
