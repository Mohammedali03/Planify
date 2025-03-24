<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Validated;
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

    // public function pic(){
    //     $user=auth()->user();
    //     $profile_picture=$user->profile_picture_url;
    //     return response()->json(['profile_picture'=>$profile_picture]);
    //     // return response()->json(['profile_picture'=>$user->profile_picture]);
    // }

        public function credentials(Request $request){
       $validated = $request->validate([
            'firstName'=>'required|string|max:255',
            'lastName'=>'required|string|max:255',
       ]);

       $user = auth()->user();
       $name = $validated['firstName'] . ' ' . $validated['lastName'];

       $user->name = $name;
       $user->save();
         return response()->json(['message'=>'Credentials Updated Successfully'],201);


        }
    public function update_email(Request $request){
        $request->validate([
            'email'=>'required|email|unique:users'
        ]);

        $user=auth()->user();
        $user->email=$request->email;
        $user->save();
        return response()->json(['message'=>'Email Updated Successfully'],201);
    }

    public function update_password(Request $request){
        $request->validate([
            'password'=>'required|string|min:8'
        ]);

        $user=auth()->user();
        $user->password=bcrypt($request->password);
        $user->save();
        return response()->json(['message'=>'Password Updated Successfully'],201);
    }
}
