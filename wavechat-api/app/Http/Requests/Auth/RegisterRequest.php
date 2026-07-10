<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'O campo Nome é obrigatório.',
            'name.string' => 'O campo Nome deve ser uma string.',
            'name.max' => 'O campo Nome deve ter no máximo 255 caracteres.',

            'email.required' => 'O campo Email é obrigatório.',
            'email.string' => 'O campo Email deve ser uma string.',
            'email.email' => 'Email inválido.',
            'email.max' => 'O campo Email deve ter no máximo 255 caracteres.',
            'email.unique' => 'Email já cadastrado.',

            'password.required' => 'O campo Senha é obrigatório.',
            'password.string' => 'O campo Senha deve ser uma string.',
            'password.min' => 'O campo Senha deve ter pelo menos 8 caracteres.',
        ];
    }
}
