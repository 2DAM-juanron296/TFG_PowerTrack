<?php

namespace Database\Seeders;

use App\Models\MuscleGroup;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MuscleGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $groups = [
            'Pecho', 'Espalda', 'Bíceps', 'Tríceps', 'Hombros',
            'Cuádriceps', 'Isquiotibiales', 'Glúteos', 'Abdomen', 
            'Gemelos'
        ];

        foreach ($groups as $group) {
            MuscleGroup::create(['name' => $group]);
        }
    }
}
