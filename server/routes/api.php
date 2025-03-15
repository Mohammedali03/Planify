<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GoalsController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\StudySessionController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    //user
Route::get('/user', [AuthController::class, 'user']);
Route::post('/logout', [AuthController::class, 'logout']);

//Goals

Route::get('/goals', [GoalsController::class, 'index']);
//ROOM
Route::get('/rooms', [RoomController::class, 'index']);
// Route::post('/rooms', [RoomController::class, 'store']);
// Route::post('/rooms/{room}/start', [RoomController::class, 'startSession']);
// Route::post('/rooms/{room}/pause', [RoomController::class, 'pauseSession']);
// Route::post('/rooms/{room}/end', [RoomController::class, 'endSession']);


Route::post('/sessions/{id}/start', [StudySessionController::class, 'start']);
Route::post('/sessions/{id}/pause', [StudySessionController::class, 'pause']);
Route::post('/sessions/{id}/resume', [StudySessionController::class, 'resume']);
Route::post('/sessions/{id}/end', [StudySessionController::class, 'end']);
});




// Route::middleware('auth:sanctum')->group(function () {
//     Route::post('/rooms', [RoomController::class, 'store']);
//     Route::post('/rooms/{room}/start', [RoomController::class, 'startSession']);
//     Route::post('/rooms/{room}/pause', [RoomController::class, 'pauseSession']);
//     Route::post('/rooms/{room}/end', [RoomController::class, 'endSession']);
// });

