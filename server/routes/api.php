<?php
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoomController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
Route::get('/user', [AuthController::class, 'user']);
Route::post('/logout', [AuthController::class, 'logout']);

Route::get('/rooms', [RoomController::class, 'index']);
Route::post('/rooms', [RoomController::class, 'store']);
Route::post('/rooms/{room}/start', [RoomController::class, 'startSession']);
Route::post('/rooms/{room}/pause', [RoomController::class, 'pauseSession']);
Route::post('/rooms/{room}/end', [RoomController::class, 'endSession']);
});




// Route::middleware('auth:sanctum')->group(function () {
//     Route::post('/rooms', [RoomController::class, 'store']);
//     Route::post('/rooms/{room}/start', [RoomController::class, 'startSession']);
//     Route::post('/rooms/{room}/pause', [RoomController::class, 'pauseSession']);
//     Route::post('/rooms/{room}/end', [RoomController::class, 'endSession']);
// });

