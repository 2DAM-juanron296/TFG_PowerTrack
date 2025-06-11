<?php

namespace App\Http\Controllers;

use App\Models\Routine;
use App\Models\User;
use App\Models\Workout;
use App\Models\Workout_Exercise_Set;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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

    // Actualizar datos de usuario - App
    public function update(Request $request) 
    {
        try 
        {
            $request->validate([
                'name' => 'required|string',
                'username' => 'required|string',
                'email' => 'required|string'
            ]);

            $user = User::findOrFail($request->user()->id);

            $user->update($request->only(['name', 'username', 'email']));
            
            return response()->json([
                'message' => 'Usuario actualizado',
                'user' => $user
            ], 200);

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

    // Obtener rutinas de un usuario - App/Web
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

    // Obtener información del usuario - App
    public function getData(Request $request)
    {
        try 
        {
            $idUser = $request->user()->id;
            $today = Carbon::today();

            $startOfWeek = $today->copy()->startOfWeek();
            $startOfMonth = $today->copy()->startOfMonth(); 
            $startOfYear = $today->copy()->startOfYear();

            // Tiempo de Entreno Total 
            $durationWeek = Workout::where('user_id', $idUser)
                                   ->whereBetween('date', [$startOfWeek, $today])
                                   ->sum('duration');                        
            
            $durationMonth = Workout::where('user_id', $idUser)
                                    ->whereBetween('date', [$startOfMonth, $today])
                                    ->sum('duration');

            $durationYear = Workout::where('user_id', $idUser)
                                   ->whereBetween('date', [$startOfYear, $today])
                                   ->sum('duration');

            // Volumen de Entrenamiento Total
            $workoutsWeek = Workout::where('user_id', $idUser)
                                 ->whereBetween('date', [$startOfWeek, $today])
                                 ->count();

            $workoutsMonth = Workout::where('user_id', $idUser)
                                  ->whereBetween('date', [$startOfMonth, $today])
                                  ->count();

            $workoutsYear = Workout::where('user_id', $idUser)
                                 ->whereBetween('date', [$startOfYear, $today])
                                 ->count();

            // 3 ejercicios Top - PR
            $top = $this->getUserTop($idUser);            

            // Entrenos Totales
            $total = Workout::where('user_id', $idUser)->count();

            return response()->json([
                'message' => 'Datos recogidos',
                'durationWeek' => $durationWeek,
                'durationMonth' => $durationMonth,
                'durationYear' => $durationYear,
                'workoutsWeek' => $workoutsWeek,
                'workoutsMonth' => $workoutsMonth,
                'workoutsYear' => $workoutsYear,
                'top' => $top,
                'totalWorkouts' => $total
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error: '.$e->getMessage()
            ], 500);
        }
    }

    // Obtener Top 3 ejercicios de usuario
    protected function getUserTop($userId)
    {
        $topSets = DB::table('workout_exercise_sets as wes')
                     ->join('workout_exercises as we', 'wes.workout_exercise_id', '=', 'we.id')
                     ->join('workouts as w', 'we.workout_id', '=', 'w.id')
                     ->join('exercises as e', 'we.exercise_id', '=', 'e.id')
                     ->select(
                        'e.name as exercise_name',
                        'wes.weight',
                        'wes.reps',
                        DB::raw('(wes.weight * wes.reps) as intensity') 
                    )
                    ->where('w.user_id', $userId)
                    ->whereNotNull('wes.weight')
                    ->whereNotNull('wes.reps')
                    ->orderByDesc(DB::raw('(wes.weight * wes.reps)'))
                    ->get()
                    ->groupBy('exercise_name')
                    ->map(function ($group) {
                        return $group->first();
                    })
                    ->sortByDesc('intensity')
                    ->take(3)
                    ->map(function ($item) {
                        return [
                            'exercise_name' => $item->exercise_name,
                            'weight' => $item->weight,
                            'reps' => $item->reps,
                        ];
                    })
                    ->values();

        return $topSets;
    }

    // Método para obtener usuarios más activos - Web
    public function getTopUser() 
    {
        try 
        {
            $startOfWeek = Carbon::now()->startOfWeek();
            $endOfWeek = Carbon::now()->endOfWeek();

            $topUsersWeek = DB::table('workouts')
                              ->join('users', 'workouts.user_id', '=', 'users.id')
                              ->select('users.username', DB::raw('COUNT(*) as total'))
                              ->whereBetween('workouts.date', [$startOfWeek, $endOfWeek])
                              ->groupBy('users.username')
                              ->orderByDesc('total')
                              ->limit(10)
                              ->get();
                              
            $startOfMonth = Carbon::now()->startOfMonth();
            $endOfMonth = Carbon::now()->endOfMonth();

            $topUsersMonth = DB::table('workouts')
                              ->join('users', 'workouts.user_id', '=', 'users.id')
                              ->select('users.username', DB::raw('COUNT(*) as total'))
                              ->whereBetween('workouts.date', [$startOfMonth, $endOfMonth])
                              ->groupBy('users.username')
                              ->orderByDesc('total')
                              ->limit(10)
                              ->get();

            return response()->json([
                'message' => 'Usuarios más activos recogidos',
                'topWeek' => $topUsersWeek,
                'topMonth' => $topUsersMonth
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error: '.$e->getMessage()
            ], 500);
        }
    }
}
