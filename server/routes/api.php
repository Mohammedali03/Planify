<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GoalsController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\StudySessionController;
use App\Http\Controllers\TimerController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    //user
Route::get('/user', [AuthController::class, 'user']);
Route::post('/logout', [AuthController::class, 'logout']);

//Goals

// Route::get('/goals', [GoalsController::class, 'index']);
// Route::post('/goals', [GoalsController::class, 'store']);
// Route::get('/goals/{goal}', [GoalsController::class, 'show']);

Route::apiResource('goals', GoalsController::class);
Route::post('goals/{goal}/complete',[GoalsController::class,'complete']);

//Timer

Route::post('timer/start',[TimerController::class,'start']);
Route::post('timer/pause/{pause}',[TimerController::class,'pause']);
Route::post('timer/end/{end?}',[TimerController::class,'end']);



});




// Route::middleware('auth:sanctum')->group(function () {
//     Route::post('/rooms', [RoomController::class, 'store']);
//     Route::post('/rooms/{room}/start', [RoomController::class, 'startSession']);
//     Route::post('/rooms/{room}/pause', [RoomController::class, 'pauseSession']);
//     Route::post('/rooms/{room}/end', [RoomController::class, 'endSession']);
// });

