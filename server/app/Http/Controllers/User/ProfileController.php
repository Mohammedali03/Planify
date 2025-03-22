<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function Profile_Pic(Request $request){
        $request->validate([
            'profilePic'=>'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        $user=auth()->user();
        $profile_Pic=$request->file('profilePic')->store('profile-pictures','public');
        $user->profile_pic = $profile_Pic;
        $user->save();
        return response()->json(['message'=>'Profile Picture Updated Successfully'],201);

    }
}
