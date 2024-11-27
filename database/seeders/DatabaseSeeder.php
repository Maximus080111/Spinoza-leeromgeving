<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'Max Overbeek',
            'email' => 'overbeekmax@gmail.com',
            'is_teacher' => true,
            'class' => null,
            'email_verified_at' => now(),
            'password' => bcrypt('Maximus080111'),
        ]);

        \App\Models\User::factory()->create([
            'name' => 'persoon1',
            'email' => 'persoon@persoon.nl',
            'is_teacher' => false,
            'class' => 'x1',
            'email_verified_at' => now(),
            'password' => bcrypt('12345678'),
        ]);
    }
}
