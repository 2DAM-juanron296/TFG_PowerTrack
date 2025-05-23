<?php

namespace App\Http\Controllers;

use App\Models\Routine;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class RoutineController extends Controller
{
    // Obtener todas las rutinas - Web
    public function index() {

        try
        {
            $routines = Routine::with('user:id,username')->get()
                ->map(function ($routine) {
                    return [
                        ...$routine->toArray(), 
                        'user_username' => $routine->user->username
                    ];
                });

            if ($routines->isEmpty()) {
                return response()->json([
                    'message' => 'No hay rutinas actualmente',
                    'routines' =>  []
                ], 200);
            }

            return response()->json([
                'message' => 'Rutinas recogidas',
                'routines' =>  $routines
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error: '.$e->getMessage()
            ], 500);
        }

    }

    // Método para obtener nombre de rutina por ID - App
    public function getName($id)
    {
        try
        {
            $routine = Routine::find($id);

            if (!$routine) {
                return response()->json([
                    'message' => 'No se encontró la rutina'
                ], 400);
            }

            return response()->json([
                'message' => 'Rutina encontrada',
                'name' => $routine->name
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error: '.$e->getMessage()
            ], 500);
        }
    }

    // Crear nueva rutina - Web/App
    public function store(Request $request) {
        try
        {
            $data = $request->validate([
                'name' => 'required|string',
                'description' => 'nullable',
                'user_id' => 'required',
            ]);

            $routine = Routine::create($data);

            if (!$routine) 
                return response()->json([
                    'message' => 'Error al crear la rutina'
                ], 500);
            
            return response()->json([
                'message' => 'Rutina creada correctamente',
                'routine' => $routine
            ], 201);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error: '.$e->getMessage()
            ], 400);
        }
    }

    // Eliminar una rutina - Web/App
    public function delete($id) {

        try
        {
            $deleted = Routine::where('id', $id)->delete();            

            if (!$deleted)
                return response()->json([
                    'message' => 'No se encontró la rutina'
                ], 400);

            return response()->json([
                'message' => 'Rutina eliminada con éxito'
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error: '.$e->getMessage()
            ], 500);
        }
    }

    // Asignar una rutina default a un usuario - App
    public function saveRoutine(Request $request) {
        try 
        {
            $request->validate([
                'id_user' => 'required|exists:users,id',
                'id_routine' => 'required|exists:routines,id'
            ]);

            $user = User::find($request->id_user);
            $routine = Routine::find($request->id_routine);

            if (!$user) {
                return response()->json([
                    'message' => 'No se pudo encontrar al Usuario por ID'
                ], status: 404);
            }

            if (!$routine) {
                return response()->json([
                    'message' => 'No se pudo encontrar la Rutina por ID'
                ], status: 404);
            }

            $newRoutine = $routine->replicate();
            $newRoutine->user_id = $request->id_user;
            $newRoutine->save();

            $exercises = $routine->routine_exercises;

            foreach ($exercises as $ex) {
                $newExercise = $ex->replicate();
                $newExercise->routine_id = $newRoutine->id;
                $newExercise->save();

                $sets = $ex->sets;

                foreach ($sets as $set) {
                    $newSet = $set->replicate();
                    $newSet->routine_exercise_id = $newExercise->id;
                    $newSet->save();
                }
            }
            
            return response()->json([
                'message' => 'Rutina asignada'
            ], status: 200);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error: '.$e->getMessage()
            ], 500);
        }
    }
}
