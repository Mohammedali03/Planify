<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Favorite extends Model
{
    use HasApiTokens,Notifiable;

    // protected $fillable = ['user_id'];
    protected $guarded = [];

    public function favoritable(){
        return $this->morphTo();
    }
}
