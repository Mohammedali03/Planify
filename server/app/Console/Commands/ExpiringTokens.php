<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use App\Mail\InactivityReminder;
use Carbon\Carbon;
use Laravel\Sanctum\PersonalAccessToken;

class ExpiringTokens extends Command
{
    protected $signature = 'users:check-expiring-tokens';
    protected $description = 'Check if the token is expiring';

    public function handle()
    {
        $tokens = PersonalAccessToken::where('expires_at', '<', Carbon::now())
            ->get();
        // $users = User::all();

        foreach ($tokens as $token) {
            $token->delete();
        }

        $this->info('Expiring tokens deleted!');
    }
}

