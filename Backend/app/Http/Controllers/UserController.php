<?php

namespace App\Http\Controllers;

use App\Models\Routine;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // Obtener todos los usuarios que no sean admin - Web
    public function index()
    {
        $users = User::where('is_admin', false)->get();
        return response()->json([
            'message' => 'Usuarios recogidos',
            'users' => $users
        ], 200);
    }

    // Crear nuevo usuario - Web
    public function store(Request $request)
    {
        try
        {
            $data = $request->validate([
                'name' => 'required|string',
                'is_admin' => 'required|boolean',
                'username' => 'required|string|unique:users,username',
                'email' => 'required|string|unique:users,email',
                'password' => 'required|string',
            ]);

            $data['password'] = Hash::make($data['password']);

            $user = User::create($data);

            if (!$user) 
                return response()->json([
                    'message' => 'Error al crear el usuario'
                ], 500);
            
            return response()->json([
                'message' => 'Usuario creado correctamente',
                'user' => $user
            ], 201);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error: '.$e->getMessage()
            ], 400);
        }
    }

    // Eliminar un usuario - Web
    public function delete($id_user) {

        try
        {
            $deleted = User::where('id', $id_user)->delete();            

            if (!$deleted)
                return response()->json([
                    'message' => 'No se encontró al usuario'
                ], 400);

            return response()->json([
                'message' => 'Usuario eliminado con éxito'
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error: '.$e->getMessage()
            ], 500);
        }
    }

    // Obtener rutinas de un usuario - App
    public function getRoutines($id_user) {

        try
        {
            $routines = Routine::where('user_id', $id_user)->get();

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
}
