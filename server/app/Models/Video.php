<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Video extends Model
{
    use HasApiTokens,Notifiable;

    protected $fillable = ['name', 'video_path','section'];

    public function favorites(){
        return $this->morphMany(Favorite::class,'favoritable');
    }
}
