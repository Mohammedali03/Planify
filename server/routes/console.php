<?php

use Illuminate\Foundation\Console\ClosureCommand;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use App\Console\Commands\SendInactivityEmail;
use App\Console\Commands\ExpiringTokens;

Artisan::command('inspire', function () {
    /** @var ClosureCommand $this */
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');



// Schedule::command(SendInactivityEmail::class)->dailyAt('10:00');
Schedule::command(SendInactivityEmail::class)->everyMinute();
Schedule::command(ExpiringTokens::class)->everyMinute();


