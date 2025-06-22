<?php
namespace App\Http\Middleware;

use Illuminate\Http\Middleware\HandleCors as Middleware;

class HandleCors extends Middleware
{
    protected $headers = [
        'Access-Control-Allow-Origin' => 'http://localhost:5173', // Change this to match your frontend
        'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers' => 'Content-Type, Authorization',// , X-XSRF-TOKEN
        'Access-Control-Allow-Credentials' => 'true',
    ];
}