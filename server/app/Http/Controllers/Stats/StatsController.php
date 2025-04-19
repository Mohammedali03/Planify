<?php

namespace App\Http\Controllers\Stats;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class StatsController extends Controller
{
   public function streak(){
      $user = auth()->user();
      $streak = $user->streak;
      return response()->json([
         'streak' => $streak
      ]);
   }

   public function max_streak(){
      $user = auth()->user();
      $max_streak = $user->max_streak;
      return response()->json([
         'max_streak' => $max_streak
      ]);

   }

   public function last_visit(){
      $user = auth()->user();
      $last_visit = $user->last_visit_at;
      return response()->json([
         'last_visit' => $last_visit
      ]);
   }
}
