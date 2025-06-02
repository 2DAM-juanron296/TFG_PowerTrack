<?php

namespace App\Http\Controllers;

use App\Models\Workout;
use Exception;
use Illuminate\Http\Request;

class WorkoutController extends Controller
{
    // Obtener todos los entrenos de un usuario - App
    public function index(Request $request)
    {
        try
        {
            $idUser = $request->user()->id;

            $workouts = Workout::where('user_id', $idUser)->get();

            if ($workouts->isEmpty()) {
                return response()->json([
                    'message' => 'No hay entrenamientos actualmente',
                    'workouts' => []
                ], 200);
            }

            return response()->json([
                'message' => 'Entrenamientos recogidos',
                'workouts' => $workouts
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error: '.$e->getMessage()
            ], 500);
        }
    }

    public function getLastWorkouts(Request $request) 
    {
        try
        {
            $idUser = $request->user()->id;

            $workouts = Workout::where('user_id', $idUser)
                               ->orderBy('created_at', 'desc')
                               ->take(4)
                               ->get();

            if ($workouts->isEmpty()) {
                return response()->json([
                    'message' => 'No hay entrenamientos actualmente',
                    'workouts' => []
                ], 200);
            }

            return response()->json([
                'message' => 'Entrenamientos recogidos',
                'workouts' => $workouts
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error: '.$e->getMessage()
            ], 500);
        }
    }

    // Método para crear un nuevo entreno - App
    public function store(Request $request)
    {
        try
        {
            $data = $request->validate([
                'date' => 'required|date',
                'name' => 'nullable|string|max:50',
                'duration' => 'required|integer',
                'volume_training' => 'required|integer',
                'routine_id' => 'required|integer',
            ]);

            $data['user_id'] = $request->user()->id;

            $workout = Workout::create($data);

            if (!$workout) 
                return response()->json([
                    'message' => 'Error al crear el entrenamiento'
                ], 500);

            return response()->json([
                'message' => 'Entrenamiento creado correctamente',
                'workout' => $workout
            ], 201);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error: '.$e->getMessage()
            ], 500);
        }
    }

    // Método para eliminar un entrenamiento - App
    public function delete(Request $request, $idWorkout) 
    {
        try 
        {
            $idUser = $request->user()->id;
            $workout = Workout::find($idWorkout);
            
            if (!$workout) {
                return response()->json([
                    'message' => 'No se ha encontrado el entrenamiento'
                ], 404);
            }

            if ($workout->user_id !== $idUser) {
                return response()->json([
                    'message' => 'Usuario no autorizado'
                ], 403);
            }

            $result = $workout->delete();

            if (!$result) {
                return response()->json([
                    'message' => 'Error al eliminar el entrenamiento'
                ], 500);
            }

            return response()->json([
                'message' => 'Entrenamiento eliminado correctamente'
            ], 200);

        }  catch (Exception $e) {
            return response()->json([
                'message' => 'Error: '.$e->getMessage()
            ], 500);
        }
    }
}
