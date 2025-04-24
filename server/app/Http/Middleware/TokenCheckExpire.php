<?php

// namespace App\Http\Middleware;

// use Closure;
// use Illuminate\Http\Request;
// use Symfony\Component\HttpFoundation\Response;
// use Laravel\Sanctum\PersonalAccessToken;

// class TokenCheckExpire
// {
//     /**
//      * Handle an incoming request.
//      *
//      * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
//      */
//     public function handle(Request $request, Closure $next): Response
//     {
//         $token = $request->header('Authorization');
        
//         if (!$token) {
//             return response()->json(['message' => 'Authorization token is required'], 401);
//         }

        

//         $token = substr($token, 7); // Remove 'Bearer ' prefix
        
//         // Find the token in the database - Sanctum stores the token as a hash
//         $tokens = PersonalAccessToken::all();
        
//        foreach ($tokens as $token) {

//         if ($token->expires_at < now()) {
//             $token->delete();
//             return response()->json(['message' => 'Token has expired. Please login again.'], 401);
//         }
//     }
//         return $next($request);
//     }
// }



namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Laravel\Sanctum\PersonalAccessToken;
use Carbon\Carbon;

class TokenCheckExpire
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $authHeader = $request->header('Authorization');

        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return response()->json(['message' => 'Authorization token is required'], 401);
        }

        $accessToken = substr($authHeader, 7); // Remove 'Bearer ' prefix

        $token = PersonalAccessToken::findToken($accessToken); // this handles hashing

        if (!$token) {
            return response()->json(['message' => 'Invalid token.'], 401);
        }

        // Optional: if you've added an expires_at column
        if (!is_null($token->expires_at) && $token->expires_at < now()) {
            $token->delete(); // Clean up expired token
            return response()->json(['message' => 'Token has expired. Please login again.'], 401);
        }

        return $next($request);
    }
}
