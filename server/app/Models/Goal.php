<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Goal extends Model
{
    use HasApiTokens, Notifiable;

    protected $guarded = [];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
