<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UpdateLastVisit
{
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check()) {
            $user = Auth::user();
            if ($user->last_visit_at === null || $user->last_visit_at->diffInMinutes(now()) >= 1) {
                $user->update(['last_visit_at' => now()]);
            }
        }

        return $next($request);
    }
}
