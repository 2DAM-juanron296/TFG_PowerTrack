<?php

namespace App\Http\Controllers;

use App\Models\Progress;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class ProgressController extends Controller
{
    // Obtener progreso e info de un usuario - App
    public function index(Request $request)
    {
        try 
        {
            $idUser = $request->user()->id;

            if (!$idUser) {
                return response()->json([
                    'message' => 'Error al reconocer usuario',
                ], 400);
            }

            $progress = Progress::where('user_id', $idUser)->latest()->first();
            $user = User::findOrFail($idUser);
            $history = Progress::where('user_id', $idUser)
                               ->orderBy('created_at', 'asc')
                               ->get(['weight', 'created_at']);

            return response()->json([
                'message' => 'Progreso obtenido',
                'progress' => $progress,
                'user' => $user,
                'history' => $history
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error: '.$e->getMessage()
            ], 500);
        }
    }

    // Actualizar progreso de un usuario - App
    public function store(Request $request) 
    {
        try 
        {
            $request->validate([
                'weight' => 'nullable|numeric',
                'height' => 'nullable|numeric',
                'body_fat' => 'nullable|numeric'
            ]);

            $progress = new Progress();
            $progress->user_id = $request->user()->id;
            $progress->weight = $request->input('weight');
            $progress->height = $request->input('height');
            $progress->body_fat = $request->input('body_fat');

            $progress->save();

            return response()->json([
                'message' => 'Progreso actualizado correctamente',
                'progress' => $progress
            ], 200);
            
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error: '.$e->getMessage()
            ], 500);
        }
    }
}
