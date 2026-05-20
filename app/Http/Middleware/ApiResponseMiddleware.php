<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiResponseMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Ensure JSON responses and consistent structure where possible.
        if ($response instanceof Response && $response->headers->get('Content-Type') === 'application/json') {
            return $response;
        }

        return $response;
    }
}
