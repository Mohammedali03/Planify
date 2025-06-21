<?php

use App\Http\Middleware\HandleCors;
use App\Http\Middleware\TokenCheckExpire;
use App\Http\Middleware\UpdateLastVisit;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Enable global middleware
        $middleware->use([
            HandleCors::class,
            UpdateLastVisit::class,
           // TokenCheckExpire::class, // Removed from global middleware
         
        ]);
        
        $middleware->alias([
            'token.check' => TokenCheckExpire::class
        ]);

        // Define API middleware group
        $middleware->group('api', [
            EnsureFrontendRequestsAreStateful::class,
            'throttle:api',
            SubstituteBindings::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })
    ->create();

// Configure rate limiting


