<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Image extends Model
{
    use HasApiTokens, HasFactory;

    protected $fillable = [ 'name', 'image_path','section'];

    public function favorites(){
        return $this->morphMany(Favorite::class,'favoritable');
    }
    
}

