<?php

namespace App\Http\Controllers;

use App\Models\Routine;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class RoutineController extends Controller
{
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

    public function indexUser($idUser) {
        try
        {
            $routines = Routine::where('user_id', $idUser)->get();

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
}
