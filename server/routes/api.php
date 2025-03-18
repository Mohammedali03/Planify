<?php
use App\Http\Controllers\User\AuthController;
use App\Http\Controllers\Room\GoalsController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Room\TimerController;
use App\Models\Timer;

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

Route::group(['prefix'=>'timer' ],function(){
    Route::controller(TimerController::class)->group(function(){
        Route::post('start','start');
        Route::post('pause/{pause}','pause');
        Route::post('end/{end?}','end');
        Route::delete('delete','delete');
    });

    // Route::get('status',[TimerController::class,'status']);
    // Route::post('start',[TimerController::class,'start']);
    // Route::post('pause/{pause}',[TimerController::class,'pause']);
    // Route::post('end/{end?}',[TimerController::class,'end']);
});
// Route::post('timer/start',[TimerController::class,'start']);
// Route::post('timer/pause/{pause}',[TimerController::class,'pause']);
// Route::post('timer/end/{end?}',[TimerController::class,'end']);



});




// Route::middleware('auth:sanctum')->group(function () {
//     Route::post('/rooms', [RoomController::class, 'store']);
//     Route::post('/rooms/{room}/start', [RoomController::class, 'startSession']);
//     Route::post('/rooms/{room}/pause', [RoomController::class, 'pauseSession']);
//     Route::post('/rooms/{room}/end', [RoomController::class, 'endSession']);
// });

