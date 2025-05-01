<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
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
    });
});
