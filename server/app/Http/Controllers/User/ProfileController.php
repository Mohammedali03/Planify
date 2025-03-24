<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function Profile_Picture(Request $request){
        $request->validate([
            'profilePicture'=>'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        $user=auth()->user();
        $profile_Picture=$request->file('profilePicture')->store('profile-pictures','public');
        $user->profile_picture = $profile_Picture;
        $user->save();
        return response()->json(['message'=>'Profile Picture Updated Successfully'],201);

    }

    public function pic(){
        $user=auth()->user();
        $profile_picture=$user->profile_picture_url;
        return response()->json(['profile_picture'=>$profile_picture]);
        // return response()->json(['profile_picture'=>$user->profile_picture]);
    }
}
