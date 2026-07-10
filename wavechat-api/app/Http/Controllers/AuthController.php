<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\Auth\LoginResource;
use App\Http\Resources\Auth\RegisterResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Exception;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(LoginRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $user = User::where('email', $validated['email'])->first();

        if (! $user || ! Hash::check($validated['password'], $user->password)) {
            return response()->json([
                'message' => 'Email ou senha inválidos',
            ], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        $data = (object) [
            'access_token' => $token,
            'user' => $user,
        ];

        return new LoginResource($data)
            ->response()
            ->setStatusCode(JsonResponse::HTTP_OK);
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        $validated = $request->validated();

        try {
            $user = User::create($validated);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'message' => 'Erro ao registrar usuário, tente novamente',
            ], JsonResponse::HTTP_UNPROCESSABLE_ENTITY);
        }

        return new RegisterResource($user)
            ->response()
            ->setStatusCode(JsonResponse::HTTP_CREATED);
    }


    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json([], JsonResponse::HTTP_NO_CONTENT);
    }
}
