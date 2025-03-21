<?php

namespace App\Http\Controllers\Room;

use App\Http\Controllers\Controller;
use App\Models\Sound;
use Illuminate\Http\Request;

class SoundController extends Controller
{
    public function index(){

        $sounds = Sound::all();
        return response()->json([
            'sounds'=>$sounds
        ]);
    }

    public function show(Sound $sound){
        
    }
}
