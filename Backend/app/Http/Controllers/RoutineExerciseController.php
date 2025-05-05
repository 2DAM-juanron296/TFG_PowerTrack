<?php

namespace App\Http\Controllers;

use App\Models\Routine;
use App\Models\Routine_Exercise;
use Exception;
use Illuminate\Http\Request;

class RoutineExerciseController extends Controller
{
    public function  index($idRoutine) {
        $exercises = Routine_Exercise::with('exercise:id,name')
                                     ->where('routine_id', $idRoutine)
                                     ->orderBy('order')
                                     ->get();

        return response()->json([
            'message' => 'Ejercicios de Rutina recogidos',
            'exercises' => $exercises
        ], 200);
    }

    public function store(Request $request) {

        $exercises = [];

        try 
        {
            $request->validate([
                'exercises' => 'required|array', 
                'exercises.*.routine_id' => 'required|exists:routines,id', 
                'exercises.*.exercise_id' => 'required|exists:exercises,id', 
                'exercises.*.order' => 'required|integer', 
            ]);
            
            foreach ($request->exercises as $exercise) {
                $created = Routine_Exercise::create($exercise);
                $exercises[] = $created; 
            }

            if (empty($exercises))
                return response()->json([
                    'message' => 'Error al crear ejercicio para la rutina'
                ], 400);
            
            return response()->json([
                'message' => 'Ejercicios añadidos a la Rutina',
                'exercises' => $exercises
            ], 201);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error: '.$e->getMessage()
            ], 500);
        }
    }
}
