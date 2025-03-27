<?php

namespace App\Http\Controllers\Room;

use App\Http\Controllers\Controller;
use App\Models\Image;
use Illuminate\Http\Request;

class ImageController extends Controller
{
   public function images(){
    $images = Image::all()->map(function($image){
        return [
            'id' => $image->id,
            'image' =>  asset('storage/' . $image->image_path),
            'description' => $image->description,
            'created_at' => $image->created_at
        ];
    });
    return response()->json($images);
   }
}
