<?php

namespace App\Services;

use App\Exceptions\InvalidCredentialsException;
use App\Exceptions\UserRegistrationException;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    public function login(array $data): array
    {
        $user = User::where('email', $data['email'])->first();

        if (! $user || ! Hash::check($data['password'], $user->password)) {
            throw new InvalidCredentialsException;
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'access_token' => $token,
            'user' => $user,
        ];
    }

    public function register(array $data): User
    {
        try {
            return User::create($data);
        } catch (\Exception $e) {
            throw new UserRegistrationException;
        }
    }
}
