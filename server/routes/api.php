<?php

use App\Http\Controllers\Room\FavoriteController;
use App\Http\Controllers\User\AuthController;
use App\Http\Controllers\Room\GoalsController;
use App\Http\Controllers\Room\ImageController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Room\TimerController;
use App\Http\Controllers\Room\VideoController;
use App\Http\Controllers\Stats\StatsController;
use App\Http\Controllers\User\ProfileController;
use App\Models\Timer;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
//user
Route::get('/user', [AuthController::class, 'user']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::post('/profile_pic',[ProfileController::class,'Profile_Picture']);
Route::post('/profile',[ProfileController::class,'profile']);
Route::delete('/profile_pic',[ProfileController::class,'deleteProfilePicture']);
Route::post('/update_password',[ProfileController::class,'update_password']);
// Route::get('profile_pic',[ProfileController::class,'pic']);

//Goals

// Route::get('/goals', [GoalsController::class, 'index']);
// Route::post('/goals', [GoalsController::class, 'store']);
// Route::get('/goals/{goal}', [GoalsController::class, 'show']);

Route::apiResource('goals', GoalsController::class);
Route::post('goals/{goal}/complete',[GoalsController::class,'complete']);

//Timer
Route::group(['prefix'=>'timer'],function(){
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



// Route::post('timer/start',[TimerController::class,'start']);
// Route::post('timer/pause/{pause}',[TimerController::class,'pause']);
// Route::post('timer/end/{end?}',[TimerController::class,'end']);

Route::group(['prefix'=>'stats'],function(){
    Route::get('streak',[StatsController::class,'streak']);
    Route::get('max_streak',[StatsController::class,'max_streak']);
    Route::get('last_visit',[StatsController::class,'last_visit']);
    Route::get('total_study_time',[StatsController::class,'getTotalStudyTime']);
    //monthly study data for graph  
    Route::get('monthly_study_data',[StatsController::class,'monthlyStudyData']);


    Route::get('completed_goals',[StatsController::class,'completedGoals']);
    Route::get('number_of_sessions',[StatsController::class,'numberOfTimers']);
    Route::get('session_duration',[StatsController::class,'sessionDuration']);
    Route::get('leaderboard',[StatsController::class,'leaderboard']);
});


});
//leaderboard
Route::get('leaderboard',[StatsController::class,'leaderboard']);



// Route::middleware('auth:sanctum')->group(function () {
//     Route::post('/rooms', [RoomController::class, 'store']);
//     Route::post('/rooms/{room}/start', [RoomController::class, 'startSession']);
//     Route::post('/rooms/{room}/pause', [RoomController::class, 'pauseSession']);
//     Route::post('/rooms/{room}/end', [RoomController::class, 'endSession']);
// });

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




