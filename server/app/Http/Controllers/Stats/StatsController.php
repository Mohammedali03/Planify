<?php

namespace App\Http\Controllers\Stats;
use App\Models\Timer;
use Carbon\Carbon;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;

class StatsController extends Controller
{
   public function streak(){
      $user = auth()->user();
      $streak = $user->streak;
      return response()->json([
         'streak' => $streak
      ]);
   }

   public function max_streak(){
      $user = auth()->user();
      $max_streak = $user->max_streak;
      return response()->json([
         'max_streak' => $max_streak
      ]);

   }

   public function last_visit(){
      $user = auth()->user();
      $last_visit = $user->last_visit_at;
      return response()->json([
         'last_visit' => $last_visit
      ]);
   }

   public function getTotalStudyTime()
   {
       $user = Auth::user();
   
       // Sum up the time_spent for 'ended' timers
       $totalSeconds = Timer::where('user_id', $user->id)
           ->where('status', 'ended')
           ->sum('time_spent');
   
       // Convert to hours and minutes
       $hours = floor($totalSeconds / 3600);
       $minutes = floor(($totalSeconds % 3600) / 60);
   
       return response()->json([
           'formatted_time' => "{$hours}h {$minutes}m",
           'hours' => $hours,
           'minutes' => $minutes,
           'total_seconds' => $totalSeconds
       ]);
   }


   public function monthlyStudyData()
   {
       $start = Carbon::now()->startOfMonth();
       $end = Carbon::now()->endOfMonth();
   
       $studyData = Timer::where('user_id', auth()->id())
           ->whereBetween('created_at', [$start, $end])
           ->whereNotNull('time_spent')
           ->get()
           ->groupBy(fn ($timer) => $timer->created_at->day)
           ->map(fn ($timers) => round($timers->sum('time_spent') / 3600, 2)); // convert to hours, rounded to 2 decimal places
   
       return response()->json([
           'studyData' => $studyData
       ], 200);
   }

   public function completedGoals(){
      $user = auth()->user();
      $completedGoals = $user->goals()->where('status', true)->count();
      return response()->json([
         'completedGoals' => $completedGoals
      ]);
   }

   public function numberOfTimers(){
      $user = auth()->user();
      $numberOfTimers = $user->timers()->count();
      return response()->json([
         'numberOfSessions' => $numberOfTimers
      ]);
   }

   public function sessionDuration(){
      
          $userId = auth()->id();
      
          // time_spent is in seconds
          $under30min = Timer::where('user_id', $userId)
              ->where('time_spent', '<', 1800) // 30 minutes = 1800 seconds
              ->count();
      
          $between30and60min = Timer::where('user_id', $userId)
              ->where('time_spent', '>=', 1800)
              ->where('time_spent', '<', 3600) // 60 minutes = 3600 seconds
              ->count();
      
          $above60min = Timer::where('user_id', $userId)
              ->where('time_spent', '>=', 3600)
              ->count();
      
          return response()->json([
              'short' => $under30min,
              'medium' => $between30and60min,
              'long' => $above60min,
          ]);
     
      
   }
   public function leaderboard()
   {
       $leaderboard = User::withSum(['timers as total_time_spent' => function ($query) {
           $query->where('status', 'ended');
       }], 'time_spent')
       ->orderByDesc('total_time_spent')
       ->limit(10)
       ->get(['id', 'name']); // only fetch fields you need
   
       return response()->json([
           'leaderboard' =>  $leaderboard->map(function($user){
            return [
                'id' => $user->id,
                'name' => $user->name,
                'total_time_spent' => $user->total_time_spent,
                'max_streak'=>$user->max_streak,
                'completed_goals'=>$user->goals()->where('status', true)->count(),
                'numberOfSessions'=>$user->timers()->count(),
            ];
           })
       ]);
   }
   
}
