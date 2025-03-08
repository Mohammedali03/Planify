<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'name', 'background_id', 'sound_id', 'goal_minutes', 'status'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function background()
    {
        return $this->belongsTo(Background::class);
    }

    public function sound()
    {
        return $this->belongsTo(Sound::class);
    }

    public function sessions()
    {
        return $this->hasMany(RoomSession::class);
    }
}

