<?php

namespace App\Http\Controllers;

use App\Models\Workout_Exercise;
use Exception;
use Illuminate\Http\Request;

class WorkoutExerciseController extends Controller
{
    // Método para crear ejercicios de un entreno - App
    public function store(Request $request)
    {
        $exercises = [];

        try 
        {
            $request->validate([
                'exercises' => 'required|array', 
                'exercises.*.workout_id' => 'required|exists:workouts,id', 
                'exercises.*.exercise_id' => 'required|exists:exercises,id', 
                'exercises.*.order' => 'required|integer', 
            ]);
            
            foreach ($request->exercises as $exercise) {
                $created = Workout_Exercise::create($exercise);
                $exercises[] = $created; 
            }

            if (empty($exercises))
                return response()->json([
                    'message' => 'Error al crear ejercicio para el entreno'
                ], 400);
            
            return response()->json([
                'message' => 'Ejercicios añadidos al Entrenamiento',
                'exercises' => $exercises
            ], 201);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error: '.$e->getMessage()
            ], 500);
        }
    }
}
