<?php
namespace App\Http\Controllers\Room;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use App\Models\Image;
use App\Models\Video;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function index(){
        $fav = auth()->user()->favorites()->with('favoritable')->get();
        return response()->json($fav);
    }

    public function store($id,$section){
        if ($section == 'image'){
            $image = Image::findOrFail($id);
            if(!$image){
                return response()->json(['error'=>'Image not found'],404);
            }
            auth()->user()->favorites()->create([
                'favoritable_type'=>Image::class,
                'favoritable_id'=>$image->id
            ]);
            return response()->json(['message'=>'Image added to favorites'],201);

        }elseif ($section == 'video'){ {
            $video = Video::findOrFail($id);
            if(!$video){
                return response()->json(['error'=>'Video not found'],404);
            }
            auth()->user()->favorites()->create([
                'favoritable_type'=>Video::class,
                'favoritable_id'=>$video->id
            ]);
            return response()->json(['message'=>'Video added to favorites'],201);
        }

    }else{
        return response()->json(['error'=>'Section not found'],404);
    }
}
    public function delete($id){
        $fav = Favorite::find($id);
        if(!$fav){
            return response()->json(['error'=>'Favorite not found'],404);
        }
        $fav->delete();
        return response()->json(['message'=>'Favorite removed'],200);
    }



}
