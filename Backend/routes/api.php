<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\MuscleGroupController;
use App\Http\Controllers\RoutineController;
use App\Http\Controllers\RoutineExerciseController;
use App\Http\Controllers\RoutineExerciseSetController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


// Rutas públicas
Route::controller(AuthController::class)->group(function (){
    Route::post('/login', 'login');
    Route::post('/loginAdmin', 'loginAdmin');
    Route::post('/register', 'register');
});

// Rutas de prueba


Route::middleware('auth:sanctum')->group(function() {

    // Logout
    Route::post('/logout', [AuthController::class, 'logout']);

    // Users
    Route::controller(UserController::class)->group(function() {
        Route::get('/users', 'index');
        Route::get('/users/routines', 'getRoutines');
    
        Route::post('/createUser', 'store');
        Route::delete('/deleteUser/{id}', 'delete');
    });

    // Routines
    Route::controller(RoutineController::class)->group(function() {
        Route::get('/routines', 'index');
    
        Route::post('/createRoutine', 'store');
        Route::delete('/deleteRoutine/{id}', 'delete');
    });

    // Routine Exercises
    Route::controller(RoutineExerciseController::class)->group(function() {
        Route::get('/routineExercises/{idRoutine}', 'index');

        Route::post('/createRoutineExercise', 'store');
    });

    // Routine Exercise Sets
    Route::controller(RoutineExerciseSetController::class)->group(function() {
        Route::get('/routineExerciseSets/{idRoutineExercise}', 'index');

        Route::post('/createRoutineExerciseSet', 'store');
    });

    // Muscle Groups
    Route::controller(MuscleGroupController::class)->group(function() {
        Route::get('/muscleGroups', 'index');

        Route::post('/createMuscleGroup', 'store');
    });

    // Exercises
    Route::controller(ExerciseController::class)->group(function() {
        Route::get('/exercises', 'index');

        Route::post('/createExercise', 'store');
    });
});
