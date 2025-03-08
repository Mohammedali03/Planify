<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\RoomSession;
use Illuminate\Http\Request;

class RoomController extends Controller
{

    public function index()
    {
        $rooms = Room::where('user_id', auth()->id())->get();
        return response()->json($rooms);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            // 'background_id' => 'nullable|exists:backgrounds,id',
            // 'sound_id' => 'nullable|exists:sounds,id',
            'goal_minutes' => 'required|integer|min:1',
        ]);
    
        $room = Room::create([
            'user_id' => auth()->id(),
            ...$validated
        ]);
    
        return response()->json($room, 201);
    }


    public function startSession(Room $room)
{
    if ($room->user_id !== auth()->id()) {
        return response()->json(['error' => 'Unauthorized'], 403);
    }

    $room->update(['status' => 'running']);

    $session = RoomSession::create([
        'user_id' => auth()->id(),
        'room_id' => $room->id,
        'started_at' => now(),
    ]);

    return response()->json($session);
}


public function pauseSession(Room $room)
{
    $session = RoomSession::where('room_id', $room->id)
                          ->whereNull('ended_at')
                          ->latest()
                          ->first();

    if (!$session) {
        return response()->json(['error' => 'No active session'], 400);
    }

    $session->update([
        'duration' => now()->diffInSeconds($session->started_at),
        'ended_at' => now(),
    ]);

    $room->update(['status' => 'paused']);

    return response()->json(['message' => 'Session paused']);
}

public function endSession(Room $room)
{
    $room->update(['status' => 'ended']);
    return response()->json(['message' => 'Session ended']);
}
    
}
