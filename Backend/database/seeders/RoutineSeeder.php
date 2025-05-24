<?php

namespace Database\Seeders;

use App\Models\Exercise;
use App\Models\Routine;
use App\Models\Routine_Exercise;
use App\Models\Routine_Exercise_Set;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoutineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear 4 rutinas
        $routines = [
            'Empuje',
            'Tracción',
            'Piernas',
            'Torso completo'
        ];

        // Mapear ejercicios por rutina
        $routineExercises = [
            'Empuje' => [
                'Press de banca',
                'Aperturas en polea',
                'Press militar',
                'Elevaciones laterales',
                'Fondos en paralelas',
            ],
            'Tracción' => [
                'Dominadas',
                'Remo con barra',
                'Curl con barra',
                'Curl concentrado',
                'Extensión de tríceps en polea',
            ],
            'Piernas' => [
                'Sentadilla frontal',
                'Extensiones de pierna',
                'Peso muerto rumano',
                'Curl femoral en máquina',
                'Elevaciones de talón de pie',
            ],
            'Torso completo' => [
                'Press de banca',
                'Dominadas',
                'Remo con barra',
                'Press militar',
                'Crunch abdominal',
            ],
        ];

        foreach ($routines as $routineName) {
            $routine = Routine::create([
                'name' => $routineName,
                'description' => "Rutina por defecto de $routineName",
                'user_id' => 1, 
            ]);

            $order = 1;

            foreach ($routineExercises[$routineName] as $exerciseName) {
                $exercise = Exercise::where('name', $exerciseName)->first();

                if (!$exercise) {
                    continue; 
                }

                $routineExercise = Routine_Exercise::create([
                    'order' => $order++,
                    'routine_id' => $routine->id,
                    'exercise_id' => $exercise->id,
                ]);
                
                for ($i = 1; $i <= 3; $i++) {
                    Routine_Exercise_Set::create([
                        'order' => $i,
                        'reps' => 0,
                        'weight' => 0,
                        'routine_exercise_id' => $routineExercise->id,
                    ]);
                }
            }
        }  
    }
}
