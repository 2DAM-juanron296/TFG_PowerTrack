<?php

namespace App\Http\Controllers;

use App\Models\Routine_Exercise_Set;
use Exception;
use Illuminate\Http\Request;

class RoutineExerciseSetController extends Controller
{
    public function  index($idRoutineExercise) {
        $sets = Routine_Exercise_Set::where('routine_exercise_id', $idRoutineExercise)
                                     ->orderBy('order')
                                     ->get();

        return response()->json([
            'message' => 'Sets recogidos',
            'routine_exercises_sets' => $sets
        ], 200);
    }

    public function store(Request $request) {

        try 
        {
            $request->validate([
                'order' => 'required|integer',
                'reps' => 'required|integer',
                'weight' => 'required|double',
                'routine_exercise_id' => 'required|exists:routine_exercises,id'
            ]);

            $created = Routine_Exercise_Set::create($request->all());

            if (!$created)
                return response()->json([
                    'message' => 'Error el set para el ejercicio'
                ], 400);
            
            return response()->json([
                'message' => 'Set añadida al ejercicio',
                'set' => $created
            ], 201);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error: '.$e->getMessage()
            ], 500);
        }
    }
}
