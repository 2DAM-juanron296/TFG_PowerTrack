<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'is_admin' => true,
            'username' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('1234'),
        ]);

        User::create([
            'name' => 'Juan',
            'is_admin' => false,
            'username' => 'Juan',
            'email' => 'juan@gmail.com',
            'password' => Hash::make('1234'),
        ]);
    }
}
