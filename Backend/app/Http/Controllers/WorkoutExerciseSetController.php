<?php

namespace App\Http\Controllers;

use App\Models\Routine_Exercise;
use App\Models\Routine_Exercise_Set;
use App\Models\Workout_Exercise;
use App\Models\Workout_Exercise_Set;
use Exception;
use Illuminate\Http\Request;

class WorkoutExerciseSetController extends Controller
{
    // Método para crear sets de un ejercicio/entreno - App
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

                $this->updateRoutineSetsFromWorkoutSet($set);
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

    // Método para cambiar los valores de reps y weight de las sets de la rutina con los nuevos valores de los sets del ejercicio/entreno
    protected function updateRoutineSetsFromWorkoutSet($workoutSet)
    {
        $workoutExerciseId = $workoutSet['workout_exercise_id'];
        $workoutExercise = Workout_Exercise::find($workoutExerciseId);

        if (!$workoutExercise) return;

        $workout = $workoutExercise->workout;

        if (!$workout) return;

        $routineId = $workout->routine_id;

        $routineExercise = Routine_Exercise::where('routine_id', $routineId)
                                           ->where('exercise_id', $workoutExercise->exercise_id)
                                           ->first();

        if (!$routineExercise) return;

        $routineSet = Routine_Exercise_Set::where('routine_exercise_id', $routineExercise->id)
                                           ->where('order', $workoutSet['order'])
                                           ->first();

        if (!$routineSet) return;

        $routineSet->reps = $workoutSet['reps'];
        $routineSet->weight = $workoutSet['weight'];
        $routineSet->save();
    }
}
