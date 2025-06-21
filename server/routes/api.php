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
use App\Http\Controllers\Auth\VerificationController;
use App\Http\Controllers\User\MailsController;
use App\Models\Timer;

use Illuminate\Http\Request ;
use App\Models\User;
use Illuminate\Support\Facades\Redirect;
//login and registration
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


//mails section of verification user
Route::get('/email/verify/{id}/{hash}', [MailsController::class,"verify"])
->middleware(['signed'])
->name('verification.verify');
//resend mail of verification
Route::post('/email/resend', [MailsController::class,"resend"])
->middleware(['auth:sanctum']);

Route::middleware(['token.check','auth:sanctum'])->group(function () {
    Route::get('/check-token', function (Request $request) {
        return response()->json(['status' => 'valid']);
    });
//user
Route::get('/user', [AuthController::class, 'user']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::post('/profile_pic',[ProfileController::class,'Profile_Picture']);
Route::post('/profile',[ProfileController::class,'profile']);
Route::delete('/profile_pic',[ProfileController::class,'deleteProfilePicture']);
Route::post('/update_password',[ProfileController::class,'update_password']);
Route::post('/update_last_active_at',[ProfileController::class,'updateLastActiveAt']);
// Route::get('profile_pic',[ProfileController::class,'pic']);

//Goals

Route::post('goals/{goal}/complete',[GoalsController::class,'complete']);
Route::get('goals/today',[GoalsController::class,'todayGoals']);
Route::apiResource('goals', GoalsController::class);

//Timer
Route::group(['prefix'=>'timer'],function(){
    Route::controller(TimerController::class)->group(function(){
        Route::post('start','start');
        Route::post('pause/{pause}','pause');
        Route::post('end/{end?}','end');
        Route::delete('delete','delete');
    });
});
    //background and favorites

// Route::post('timer/start',[TimerController::class,'start']);
// Route::post('timer/pause/{pause}',[TimerController::class,'pause']);
// Route::post('timer/end/{end?}',[TimerController::class,'end']);

Route::group(['prefix'=>'stats'],function(){
    //streak stats
    Route::get('streak',[StatsController::class,'streak']);
    Route::get('max_streak',[StatsController::class,'max_streak']);
    //last visit of the user
    Route::get('last_visit',[StatsController::class,'last_visit']);
    //total study time of the user 
    Route::get('total_study_time',[StatsController::class,'getTotalStudyTime']);
    //monthly study data for graph  
    Route::get('monthly_study_data',[StatsController::class,'monthlyStudyData']);
    //last 30 days study data for graph
    Route::get('last_30_days_study_data',[StatsController::class,'last30DaysStudyData']);
    //completed goals     all time  
    Route::get('completed_goals',[StatsController::class,'completedGoals']);
    //number of sessions aka total timers all time
    Route::get('number_of_sessions',[StatsController::class,'numberOfTimers']);
    //session duration circle graph all time
    Route::get('session_duration',[StatsController::class,'sessionDuration']);
    //leaderboard
    Route::get('leaderboard',[StatsController::class,'leaderboard']);
    //general monthly stats this api return all the stats of the user in a month 
    Route::get('user_month_stats',[StatsController::class,'getUserMonthStats']);
});
});
//leaderboard
Route::get('leaderboard',[StatsController::class,'leaderboard']);
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




