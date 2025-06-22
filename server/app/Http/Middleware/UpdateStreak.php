<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UpdateStreak
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->user();
        $start = Carbon::now()->startOfDay();
        $lastActive = Carbon::parse($user->last_active_at)->startOfDay();

       $diff =$lastActive->diffInDays($start);

       if ($user->streak > $user->max_streak) {
        $user->max_streak = $user->streak;
        
    }
       if ($diff ==1) {
        // Consecutive day
        $user->streak += 1;
        $test ="true";
    } else {
        // Missed a day or first time
        $user->streak = 1;
    }

   
       $user->save();
        return $next($request);
    }
}
