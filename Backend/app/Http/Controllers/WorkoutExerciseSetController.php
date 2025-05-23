<?php

namespace App\Http\Controllers;

use App\Models\Workout_Exercise_Set;
use Exception;
use Illuminate\Http\Request;

class WorkoutExerciseSetController extends Controller
{
    public function store(Request $request)
    {
        $sets = [];

        try {
            $request->validate([
                'sets' => 'required|array',
                'sets.*.workout_exercise_id' => 'required|exists:workout_exercises,id',
                'sets.*.order' => 'required|integer',
                'sets.*.reps' => 'required|integer',
                'sets.*.weight' => 'required|numeric|decimal:0,2',
            ]);

            foreach ($request->sets as $set) {
                $created = Workout_Exercise_Set::create($set);
                $sets[] = $created;
            }

            if (empty($sets))
                return response()->json([
                    'message' => 'Error al añadir los sets'
                ], 400);

            return response()->json([
                'message' => 'Sets añadidos al ejercicio',
                'sets' => $sets
            ], 201);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error: '.$e->getMessage()
            ], 500);
        }
    }
}
