<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class MessageController extends Controller
{
    public function sendMessage(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'receiver_id' => 'required|exists:users,id',
                'message' => 'required|string|max:1000'
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $message = Message::create([
                'sender_id' => Auth::id(),
                'receiver_id' => $request->receiver_id,
                'message' => $request->message
            ]);

            // Load the relationships before broadcasting
            $message->load(['sender', 'receiver']);

            broadcast(new \App\Events\MessageSent($message))->toOthers();

            return response()->json([
                'status' => 'Message sent successfully',
                'message' => $message
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to send message',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function getMessages($userId)
    {
        try {
            $validator = Validator::make(['userId' => $userId], [
                'userId' => 'required|exists:users,id'
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $messages = Message::where(function($query) use ($userId) {
                $query->where('sender_id', Auth::id())
                      ->where('receiver_id', $userId);
            })->orWhere(function($query) use ($userId) {
                $query->where('sender_id', $userId)
                      ->where('receiver_id', Auth::id());
            })->with(['sender', 'receiver'])
              ->orderBy('created_at', 'asc')
              ->get();

            return response()->json($messages);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch messages',
                'message' => $e->getMessage()
            ], 500);
        }
    }
} 