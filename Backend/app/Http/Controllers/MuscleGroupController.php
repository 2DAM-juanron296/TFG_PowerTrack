<?php

namespace App\Http\Controllers;

use App\Models\MuscleGroup;
use Exception;
use Illuminate\Http\Request;

class MuscleGroupController extends Controller
{
    public function index() {
        $groups = MuscleGroup::get();

        return response()->json([
            'message' => 'Grupos musculares recogidos',
            'muscle_groups' => $groups
        ], 200);
    }

    public function store(Request $request) {

        try 
        {
            $request->validate([
                'name' => 'required|string|unique:muscle_groups,name'
            ]);

            $group = MuscleGroup::create($request->only('name'));

            if (!$group)
                return response()->json([
                    'message' => 'Error al añadir grupo muscular'
                ], 400);

            return response()->json([
                'message' => 'Grupo muscular añadido correctamente',
                'muscle_group' => $group
            ], 201);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error: '.$e->getMessage()
            ], 500);
        }
    }
}
