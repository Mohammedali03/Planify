<?php

namespace App\Http\Middleware;

use App\Models\Statistique;
use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UserStats
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(auth()->check()){
        $user = auth()->user();
        $stats = Statistique::firstOrCreate(['user_id' => $user->id]);
        $stats->increment('page_visited');
        $stats->update(['last_active_at' => Carbon::now()]);
    }
        return $next($request);
    }
}
