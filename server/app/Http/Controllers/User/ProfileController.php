<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Dotenv\Exception\ValidationException;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

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

    public function profile(Request $request){
        $user = auth()->user();
       $validated = $request->validate([
            'firstName'=>'required|string|max:255',
            'lastName'=>'required|string|max:255',     
       ]);
       if ($request->email){
       $validated=[
           ...$validated , 'email'=>'required|email|unique:users'
        ];
        if($validated['email'] !== auth()->user()->email){
            $user->email=$request->email;
       }
       }
       $name = $validated['firstName'] . ' ' . $validated['lastName'];
       $user->name = $name;
       $user->save();
    return response()->json(['message'=>'Credentials Updated Successfully'],201);


    }

    public function deleteProfilePicture()
    {
        $user = auth()->user();
        
        if (!$user->profile_picture) {
            return response()->json(['message' => 'No profile picture found'], 404);
        }
        
        if (Storage::disk('public')->exists($user->profile_picture)) {
            Storage::disk('public')->delete($user->profile_picture);
        }
        
       
        $user->profile_picture = null;
        $user->save();
        
        return response()->json(['message' => 'Profile picture deleted successfully'], 200);
    }

    // public function update_email(Request $request){
    //     $request->validate([
    //         'email'=>'required|email|unique:users'
    //     ]);

    //     $user=auth()->user();
    //     $user->email=$request->email;
    //     $user->save();
    //     return response()->json(['message'=>'Email Updated Successfully'],201);
    // }

    // public function update_password(Request $request){
    //     $request->validate([
    //         'password'=>'required|string|min:8'
    //     ]);

    //     $user=auth()->user();
    //     $user->password=bcrypt($request->password);
    //     $user->save();
    //     return response()->json(['message'=>'Password Updated Successfully'],201);
    // }
    public function update_password(Request $request)
    {
        $input = [
            'current_password' => $request->currentPassword,
            'new_password' => $request->newPassword,
            'new_password_confirmation' => $request->newPasswordConfirmation,
        ];
        $validated =  validator($input,[
            'current_password' => 'required',
            'new_password' => 'required|min:8|confirmed'])->validate();

            $user = auth()->user();
            if (!Hash::check($validated['current_password'], $user->password)) {
                return response()->json(['message' => 'Current password is incorrect.'], 422);
            }
            $user->update([
                'password' => Hash::make($validated['new_password']),
            ]);
            // $user->tokens()->delete(); // Force logout all devices

            return response()->json(['message' => 'Password updated successfully'], 200);
    }
    public function updateLastActiveAt()
    {
        $user = auth()->user();
        $user->last_active_at = now();
        $user->save();
        return response()->json(['message' => 'Last active at updated successfully'], 200);
    }
}
