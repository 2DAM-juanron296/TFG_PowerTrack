<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use Exception;
use Illuminate\Http\Request;

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
}
