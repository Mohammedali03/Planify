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
use App\Models\Timer;

use Illuminate\Http\Request ;
use App\Models\User;
use Illuminate\Support\Facades\Redirect;
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/email/verify/{id}/{hash}', function (Request $request, $id, $hash) {
    $user = User::findOrFail($id);

    if (! hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
        return response()->json(['message' => 'Invalid verification link'], 400);
    }

    if (!$user->hasVerifiedEmail()) {
        $user->markEmailAsVerified();
    }

    return Redirect::to('http://localhost:5173/login?verified=1');
})->middleware(['signed'])->name('verification.verify');

Route::post('/email/resend', function (Request $request) {
    if ($request->user()->hasVerifiedEmail()) {
        return response()->json(['message' => 'Email already verified.'], 200);
    }

    $request->user()->sendEmailVerificationNotification();

    return response()->json(['message' => 'Verification link sent!'], 200);
})->middleware(['auth:sanctum']);

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

// Route::get('/goals', [GoalsController::class, 'index']);
// Route::post('/goals', [GoalsController::class, 'store']);
// Route::get('/goals/{goal}', [GoalsController::class, 'show']);


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
    // Route::get('status',[TimerController::class,'status']);
    // Route::post('start',[TimerController::class,'start']);
    // Route::post('pause/{pause}',[TimerController::class,'pause']);
    // Route::post('end/{end?}',[TimerController::class,'end']);


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




