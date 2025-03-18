<?php

namespace App\Http\Controllers\Room;

use App\Http\Controllers\Controller;
use App\Models\Timer;
use Illuminate\Http\Request;

class TimerController extends Controller
{

    public function start(Request $request){

        $find = auth()->user()->timers()->where('status', 'paused')->first();
        if($find){
            // $time_spent = $find->duration - $find->time_left;
            $find->update([
                'status'=>'running',
            ]);

            return response()->json([
                'message'=>'timer resumed successfully',
                'timeLeft'=>$find->time_left,
                'timeSpent'=>$find->time_spent
            ],201);
        }
        $validated = $request->validate([
            'duration'=>'required'
        ]);
        
        auth()->user()->timers()->create([
            
            'duration'=>$validated['duration'],
            'time_left'=>$validated['duration'],
        ]);

        return response()->json([
            'message'=>'timer created and started successfully',
        ],201);

    }


    public function pause( $pause){

        $timer =auth()->user()->timers()->where('status','running')->first();
        if(!$timer){
            return response()->json([
                'message'=>'no running timer found'
            ],404);
        }
        $time_spent = $timer->duration - $pause;
        $timer->update([
            'status'=>'paused',
            'time_left'=>$pause,
            'time_spent'=>$time_spent
        ]);
        return response()->json([
            'message'=>'timer paused successfully',
            'timeLeft'=>$timer->time_left,
            'timeSpent'=>$timer->time_spent
        ],201);
        

    }

    public function end ($end = null){
        $timer = auth()->user()->timers()->where('status','!=','ended')->first();

        if(!$timer){
            return response()->json([
                'message'=>'no running timer found'
            ],404);
        }

            if (!$end){
                 $timer->update([
                    'status'=>'ended',
                    'time_left'=>0,
                    'time_spent'=>$timer->duration
                 ]);
                return response()->json([
                  'message'=>'gongratulation on finishing the countdown'
                 ],201);
        }

        $timer->update([
            'status'=>'ended',
            'time_left'=> $end,
            'time_spent'=>$timer->duration - $end
        ]);

        return response()->json([
            'message'=>'next time you will do better'
        ],201);

    }

    public function delete(){
        $timer = auth()->user()->timers()->where('status','!=','ended')->first();
        if(!$timer){
            return response()->json([
                'message'=>'no running timer found'
            ],404);
        }
        $timer->delete();
        return response()->json([
            'message'=>'timer deleted successfully'
        ],201);
    }
}
