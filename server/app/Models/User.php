<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Notifications\CustomVerifyEmail;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $appends = ['profile_picture_url'];

    public function sendEmailVerificationNotification()
{
    $this->notify(new \App\Notifications\VerifyApiEmail);
}
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // Define relationships


  public function goals(){
    return $this->hasMany(Goal::class);
  }

  public function timers(){
    return $this->hasMany(Timer::class);
  }

    public function favorites(){
        return $this->hasMany(Favorite::class);
    }

    public function getProfilePictureUrlAttribute()
{
    return $this->profile_picture 
        ? asset('storage/' . $this->profile_picture) 
        : asset('default-avatar.png'); // Default if no image
}

    
}

