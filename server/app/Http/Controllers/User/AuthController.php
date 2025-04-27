<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Mail\SignupMail;
use Illuminate\Http\Request;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Handle user registration
     */
    public function register(Request $request)
    {
      $validated  = $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8'
        ]);
        $name = $validated['firstName'] . ' ' . $validated['lastName'];
        $user = User::create([
            'name' => $name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        $user->sendEmailVerificationNotification();
        Mail::to($user->email)->send(new SignupMail($user->name));

        return response()->json([
            // 'token' => $user->createToken('auth_token')->plainTextToken,
            'user' => ['name'=>$user["name"],
            'email_verified' => $user->hasVerifiedEmail(),]
        ], 201);
    }

    /**
     * Handle user login
     */
    // public function login(Request $request)
    // {
    //     $request->validate([
    //         'email' => 'required|email',
    //         'password' => 'required',
    //     ]);

    //     $user = User::where('email', $request->email)->first();

    //     if (!$user || !Hash::check($request->password, $user->password)) {
    //         throw ValidationException::withMessages([
    //             'email' => ['Invalid credentials.'],
    //         ]);
    //     }

    //     $token=$user->createToken('auth_token', ['*'], now()->addMinutes(2))->plainTextToken;
    //     return response()->json([
    //         // 'token' => $user->createToken('auth_token')->plainTextToken,
    //         'token' => $token,
    //         'user' => $user,
    //     ]);
    // }


    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Invalid credentials.'],
            ]);
        }

        // ===  Streak Logic ===
        $today = Carbon::now()->startOfDay();
        // $tomorrow = Carbon::now()->startOfDay()->addDays(3);
        // $lastVisit = $user->last_visit_at ? Carbon::parse($user->last_visit_at)->startOfDay() : null;
        $lastVisit = Carbon::parse($user->last_visit_at) ;
$ress = $lastVisit->diffInDays($today);
$test ="false";
        if (!$lastVisit || $lastVisit->lt($today)) {
            // First login today
            if ($ress ==1) {
                // Consecutive day
                $user->streak += 1;
                $test ="true";
            } else {
                // Missed a day or first time
                $user->streak = 1;
            }

            $user->last_visit_at = now()->startOfDay();

            // Optional: track max streak
            if ($user->streak > ($user->max_streak ?? 0)) {
                $user->max_streak = $user->streak;
            }

            $user->save();
        }

    // ===  Create Token ===
    $token = $user->createToken('auth_token', ['*'], now()->addHours(24))->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => ["userId" => $user->id, "userEmail" => $user->email, "verified" =>$user->email_verified_at? 1:0]
        ]);
    }

    /**
     * Get authenticated user details
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    /**
     * Logout user (delete token)
     */
    public function logout(Request $request)
    {
        $request->user()->status='inactive';
        $request->user()->save();
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out']);
    }
}
