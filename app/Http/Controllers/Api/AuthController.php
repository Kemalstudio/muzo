<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
        ]);

        $token = $user->createToken('api-token')->plainTextToken;

        return $this->apiResponse(['user' => $user, 'token' => $token], 'Registered', 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return $this->apiResponse(null, 'Invalid credentials', 401);
        }

        $token = $user->createToken('api-token')->plainTextToken;

        return $this->apiResponse(['user' => $user, 'token' => $token], 'Logged in');
    }

    public function logout(Request $request)
    {
        $request->user()?->currentAccessToken()?->delete();

        return $this->apiResponse(null, 'Logged out');
    }

    public function me(Request $request)
    {
        return $this->apiResponse($request->user(), 'Authenticated');
    }
}
