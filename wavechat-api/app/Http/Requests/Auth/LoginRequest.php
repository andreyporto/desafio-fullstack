<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'email' => 'required|email',
            'password' => 'required',
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => 'O campo Email é obrigatório.',
            'email.email' => 'Email inválido.',

            'password.required' => 'O campo Senha é obrigatória.',
        ];
    }
}
