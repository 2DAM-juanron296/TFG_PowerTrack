<?php

namespace App\Http\Controllers;

use App\Models\Routine;
use App\Models\Routine_Exercise;
use Exception;
use Illuminate\Http\Request;

class RoutineExerciseController extends Controller
{
    public function  index($idRoutine) {
        $exercises = Routine_Exercise::where('routine_id', $idRoutine)
                                     ->orderBy('order')
                                     ->get();

        return response()->json([
            'message' => 'Ejercicios de Rutina recogidos',
            'routine_exercises' => $exercises
        ], 200);
    }

    public function store(Request $request) {

        try 
        {
            $request->validate([
                'order' => 'required|integer',
                'routine_id' => 'required|exists:routines,id',
                'exercise_id' => 'required|exists:exercises,id',
            ]);

            $created = Routine_Exercise::create($request->all());

            if (!$created)
                return response()->json([
                    'message' => 'Error al crear ejercicio para la rutina'
                ], 400);
            
            return response()->json([
                'message' => 'Ejercicio añadido a la Rutina',
                'exercise' => $created
            ], 201);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error: '.$e->getMessage()
            ], 500);
        }
    }
}
