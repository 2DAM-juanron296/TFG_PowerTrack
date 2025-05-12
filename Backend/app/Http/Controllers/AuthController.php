<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try 
        {
            $request->validate([
                'username' => 'required',
                'password' => 'required'
            ]);

            $user = User::where('username', $request->username)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json(['message' => 'Credenciales Incorrectas'], 401);
            }

            return response()->json([
                'message' => 'Login exitoso',
                'token' => $user->createToken('token')->plainTextToken,
                'user' => $user        
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error: '.$e->getMessage()
            ], 500);
        }
    }

    public function loginAdmin(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required'
        ]);

        $user = User::where('username', $request->username)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Credenciales Incorrectas'], 401);
        }

        if (!$user->admin) {
            return response()->json(['message' => 'No tienes permisos de administrador'], 403);
        }

        return response()->json([
            'message' => 'Login exitoso - Admin',
            'token' => $user->createToken('token')->plainTextToken,
            'user' => $user        
        ]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required',
            'email' => 'required',
            'name' => 'required'
        ]);

        $user = User::where('username', $request->username)->first();

        if (!$user ) {

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'username' => $request->username,
                'password' => Hash::make($request->password),
            ]);
        }
        else
        {
            return response()->json([
                'message' => 'Error: Ya existe un username así registrado'
            ], 400);
        }

        return response()->json([
            'message' => 'Registro exitoso',
            'token' => $user->createToken('token')->plainTextToken,
            'user' => $user        
        ], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Sesión cerrada']);
    }
}
