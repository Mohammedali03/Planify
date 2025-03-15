<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

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

    // A user can have multiple study rooms
    public function rooms()
    {
        return $this->hasMany(Room::class);
    }

  public function goals(){
    return $this->hasMany(Goal::class);
  }

    // A user can have multiple sounds
    public function sounds()
    {
        return $this->hasMany(Sound::class);
    }

    // A user can have multiple study sessions
    public function roomSessions()
    {
        return $this->hasMany(RoomSession::class);
    }
}

