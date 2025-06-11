<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use App\Models\MuscleGroup;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class ExerciseController extends Controller
{
    public function index() {
        $exercises = Exercise::get();

        return response()->json([
            'message' => 'Ejercicios totales recogidos',
            'exercises' => $exercises
        ], 200);
    }

    public function store(Request $request) {

        try 
        {
            $request->validate([
                'name' => 'required|string|unique:exercises,name',
                'description' => 'required|string',
                'muscle_group_id' => 'required|exists:muscle_groups,id'
            ]);

            $exercise = Exercise::create($request->all());

            if (!$exercise)
                return response()->json([
                    'message' => 'Error al añadir el ejercicio'
                ], 400);

            return response()->json([
                'message' => 'Ejercicio añadido correctamente',
                'exercise' => $exercise
            ], 201);
            
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error: '.$e->getMessage()
            ], 500);
        }
    }

    // Método para obtener 10 ejercicios más usados en las rutinas
    public function getMostUsed()
    {
        try 
        {
            $topExercises = DB::table('routine_exercises')
                              ->join('exercises', 'routine_exercises.exercise_id', '=', 'exercises.id')
                              ->select('exercises.name', DB::raw('COUNT(*) as usage_count'))
                              ->groupBy('routine_exercises.exercise_id', 'exercises.name')
                              ->orderByDesc('usage_count')
                              ->limit(10)
                              ->get();

            return response()->json([
                'message' => 'Ejercicios más utilizados recogidos',
                'top' => $topExercises
            ], 200);            
            
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error: '.$e->getMessage()
            ], 500);
        }
    }

    public function getMuscleByExercise(Request $request)
    {
        try 
        {
            $request->validate([
                'exercise_ids' => 'required|array',
                'exercise_ids.*' => 'required|exists:exercises,id',
            ]);

            $exerciseIds = Arr::flatten($request->input('exercise_ids'));

            $muscles = MuscleGroup::whereIn('id', function ($query) use ($exerciseIds) {
                $query->select('muscle_group_id')
                      ->from('exercises')
                      ->whereIn('id', $exerciseIds)
                      ->whereNotNull('muscle_group_id');
                })->get();

            return response()->json([
                'message' => 'Grupos Musculares recogido',
                'muscles' => $muscles
            ], 200);  

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error: '.$e->getMessage()
            ], 500);
        }
    }
}
