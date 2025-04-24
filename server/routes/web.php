<?php

use App\Mail\InactivityReminder;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test-email', function () {
    Mail::to('test@example.com')->send(new InactivityReminder(User::first()));
});
