<?php

namespace App\Http\Controllers\Room;

use App\Http\Controllers\Controller;

use App\Models\Goal;
use Illuminate\Http\Request;

class GoalsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        $goals = $user->goals;
        return response()->json($goals);
    }
    /**
     * Store a newly created resource in storage.
     */
    // public function store(Request $request)
    // {
    //     $validated = $request->validate([
    //         'description' => 'required|string',
    //         'start_date' => 'date',
    //     ]);
    //     $goal = auth()->user()->goals()->create($validated);
    //     return response()->json([
    //         "message" => "Goal created successfully",
    //         "goal" => $goal
    //     ], 201);
       
    // }

    public function store(Request $request)
{
    // Convert camelCase keys to snake_case before validation
    $input = [
        'description' => $request->input('description'),
        'start_date' => $request->input('startDate'), // Convert here
    ];
    
    $validated = validator($input, [
        'description' => 'required|string',
        'start_date' => 'date',
    ])->validate();
    
    $goal = auth()->user()->goals()->create($validated);
    
    return response()->json([
        "message" => "Goal created successfully",
        "goal" => ["id"=>$goal->id,"description"=>$goal->description,"startDate"=>$goal->start_date]
    ], 201);
}

    /**
     * Display the specified resource.
     */
    public function show(goal $goal )
    {
        // $goal_show = Goal::find($goal)->where("user_id", auth()->id());
    //    $goal->where("user_id", auth()->id());
        $user = auth()->user();
        if(!$goal){
            return response()->json(["message" => "Goal not found"], 404);
        }
        if($goal->user_id !== $user->id){
            return response()->json(["message" => "Goal not found"], 404);
        }
        return response()->json($goal);
        
    }

    /**
     * Show the form for editing the specified resource.
     */
  

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, goal $goal)
    {
        // $goal_update = Goal::find($goal)->where("user_id", auth()->id())->first();
        if(!$goal){
            return response()->json(["message" => "Goal not found"], 404);
        }
        $user = auth()->user();
        if($goal->user_id !== $user->id){
            return response()->json(["message" => "Goal not found"], 404);
        }
        $input = [
            'description' => $request->input('description'),
            'start_date' => $request->input('startDate'), // Convert here
        ];
        $validated = validator($input, [
            'description' => 'required|string',
            'start_date' => 'date'
            
        ])->validate();
        $goal->update($validated);
        return response()->json([
            "message" => "Goal updated successfully",
            "goal" => ["id"=>$goal->id,"description"=>$goal->description,"startDate"=>$goal->start_date]
        ], 201);
       
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(goal $goal)
    {
       
        // $goal_delete = Goal::find($goal)->where("user_id", auth()->id())->first();
        if(!$goal){
            return response()->json(["message" => "Goal not found"], 404);
        }
        $user = auth()->user();
        if($goal->user_id !== $user->id){
            return response()->json(["message" => "Goal not found"], 404);
        }
        $goal->delete();
        return response()->json(["message" => "Goal deleted successfully"], 200);

    }

    public function complete(goal $goal){

        // $goal_complete = Goal::find($goal)->where("user_id",auth()->id())->first();
        $user = auth()->user();
        if(!$goal){
            return response()->json(["message"=>"goal not found"],404);
        }
        if($goal->user_id !== $user->id){
            return response()->json(["message" => "Goal not found"], 404);
        }
        $goal->update(["status"=>!$goal->status]);
        if($goal->status){
            return response()->json(["message"=>"goal completed successfully"],200);
        }else{
            return response()->json(["message"=>"the goal is not completed yet take your time finishing it"],200);
        }

    }
}
