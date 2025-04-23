<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\BroadcastMessage;

class RealTimeNotification extends Notification implements ShouldQueue
{
    public function via($notifiable)
    {
        return ['database', 'broadcast'];
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'message' => '📢 Real-time notification!',
            'type' => 'alert',
        ]);
    }

    public function toDatabase($notifiable)
    {
        return [
            'message' => '📢 Real-time notification!',
            'type' => 'alert',
        ];
    }
}
