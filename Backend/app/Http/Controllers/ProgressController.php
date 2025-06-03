<?php

namespace App\Http\Controllers;

use App\Models\Progress;
use Exception;
use Illuminate\Http\Request;

class ProgressController extends Controller
{
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

            $progress = Progress::where('user_id', $idUser)->get();

            return response()->json([
                'message' => 'Progreso obtenido',
                'progress' => $progress
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error: '.$e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $idProgress) 
    {
        try 
        {
            $request->validate([
                'weight' => 'nullable|double',
                'height' => 'nullable|double',
                'body_fat' => 'nullable|double'
            ]);

            $progress = Progress::findOrFail($idProgress);

            if ($progress->user_id !== $request->user()->id) {
                return response()->json([
                    'message' => 'No tienes permiso para modificar este progreso.'
                ], 403);
            }

            $progress->update($request->only(['weight, height, body_fat']));

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
