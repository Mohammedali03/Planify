<?php

namespace App\Http\Controllers\Stats;
use App\Models\Timer;
use App\Models\Goal;
use Carbon\Carbon;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Room\GoalsController;
use App\Models\User;
use Carbon\CarbonPeriod;
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
   // this month 

public function monthlyStudyData()
{
    $start = Carbon::now()->startOfMonth();
    $end = Carbon::now()->endOfMonth();

    $studyData = Timer::where('user_id', auth()->id())
        ->whereBetween('created_at', [$start, $end])
        ->whereNotNull('time_spent')
        ->get()
        ->groupBy(function ($timer) {
            return $timer->created_at->day;
        })
        ->map(function ($dayTimers, $day) {
            $totalSeconds = $dayTimers->sum('time_spent');
            $monthName = $dayTimers->first()->created_at->format('F'); // 'April'

            return [
                'date' => (string) $day,
                'month' => $monthName,
                'time' => $totalSeconds,
            ];
        })
        ->values(); // Reset the keys to be sequential

    return response()->json($studyData, 200);
}

// last 30 days 




public function last30DaysStudyData() 
{ 
    $start = Carbon::now()->subDays(29)->startOfDay(); // 30 days including today
    $end = Carbon::now()->endOfDay();

    // Fetch timers
    $timers = Timer::where('user_id', auth()->id())
        ->whereBetween('created_at', [$start, $end])
        ->whereNotNull('time_spent')
        ->get();

    // Group by date string (e.g., "2025-04-22")
    $grouped = $timers->groupBy(function ($timer) {
        return $timer->created_at->format('Y-m-d');
    });

    // Create a 30-day period
    $period = CarbonPeriod::create($start, $end);

    // Build the final dataset
    $studyData = collect();

    foreach ($period as $date) {
        $day = $date->format('Y-m-d');
        $timersForDay = $grouped->get($day, collect());

        $studyData->push([
            'date' => $date->day, // Just the day number
            'month' => $date->format('F'),
            'time' => $timersForDay->sum('time_spent'),
        ]);
    }

    return response()->json($studyData->values(), 200);
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
       ->get(['id', 'name'])
       ; // only fetch fields you need
      $data = $leaderboard->map(function($user){
        $totalSeconds = $user->total_time_spent;
        $hours = floor($totalSeconds / 3600);
        $minutes = floor(($totalSeconds % 3600) / 60);

        return [
            'id' => $user->id,
            'name' => $user->name,
            'profilePic' => $user->profile_picture_url,
            'totalTimeSpent' => "{$hours}h {$minutes}min",
            'maxStreak'=>$user->max_streak,
            'completedGoals'=>$user->goals()->where('status', true)->count(),
            'numberOfSessions'=>$user->timers()->count(),
        ];
       });
  
       return response()->json($data,200);
   }

   public function getUserMonthStats()
   {
    $user = auth()->user();
    $start = Carbon::now()->startOfMonth();
    $end = Carbon::now()->endOfMonth();

    $studyData = Timer::where('user_id', $user->id)
        ->whereBetween('created_at', [$start, $end])
        ->whereNotNull('time_spent')
        ->sum('time_spent');
    $completedGoals = Goal::where('user_id', $user->id)
    ->whereBetween('start_date', [$start, $end])
    ->where('status', true)
    ->count();
    $monthStreak = $user->streak;
    $monthTimers = $user->timers()->whereBetween('created_at', [$start, $end])->where('status', 'ended')->count();

    $hours = floor($studyData / 3600);
    $minutes = floor(($studyData % 3600) / 60);

    return response()->json([
        'monthlyStudyTime' => "{$hours}h {$minutes}min",
        'monthlyCompletedGoals' => $completedGoals,
        'monthlyStreak' => $monthStreak,
        'monthlySessions' => $monthTimers
    ], 200);
   }
}
