<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use App\Mail\InactivityReminder;
use Carbon\Carbon;

class SendInactivityEmail extends Command
{
    protected $signature = 'users:check-inactivity';
    protected $description = 'Send email to users who haven’t logged in for 24 hours';

    public function handle()
    {
        $users = User::where('last_visit_at', '<', Carbon::now()->subHours(24))
            ->get();
        // $users = User::all();

        foreach ($users as $user) {
            Mail::to($user->email)->send(new InactivityReminder($user));
        }

        $this->info('Inactivity emails sent!');
    }
}

