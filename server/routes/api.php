<?php

use App\Http\Controllers\Room\FavoriteController;
use App\Http\Controllers\User\AuthController;
use App\Http\Controllers\Room\GoalsController;
use App\Http\Controllers\Room\ImageController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Room\TimerController;
use App\Http\Controllers\Room\VideoController;
use App\Http\Controllers\User\ProfileController;
use App\Models\Timer;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    //user
Route::get('/user', [AuthController::class, 'user']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::post('profile_pic',[ProfileController::class,'Profile_Pic']);
Route::get('profile_pic',[ProfileController::class,'pic']);

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
});
    // Route::get('status',[TimerController::class,'status']);
    // Route::post('start',[TimerController::class,'start']);
    // Route::post('pause/{pause}',[TimerController::class,'pause']);
    // Route::post('end/{end?}',[TimerController::class,'end']);


    //background and favorites

    Route::group(['prefix'=>'background' ],function(){
        //images
        Route::get('images',[ImageController::class,'images']);

        //videos
        Route::get('videos',[VideoController::class,'videos']);

        //favorites
        Route::get('favorites',[FavoriteController::class,'index']);
        Route::post('favorites/{id}/section/{section}',[FavoriteController::class,'store']);
        Route::delete('favorites/{id}',[FavoriteController::class,'delete']);
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

