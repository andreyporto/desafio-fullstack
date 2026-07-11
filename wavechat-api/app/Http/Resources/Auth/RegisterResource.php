<?php

namespace App\Http\Resources\Auth;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RegisterResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "message" => "Usuário registrado com sucesso",
            "user" => [
                "id" => $this->id,
                "name" => $this->name,
                "email" => $this->email,
            ],
        ];
    }
}
