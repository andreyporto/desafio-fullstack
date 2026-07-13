<?php

namespace App\Http\Requests\Messages;

use Illuminate\Foundation\Http\FormRequest;

class SendMessageRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'body' => 'required|string|max:2000',
        ];
    }

    public function messages(): array
    {
        return [
            'body.required' => 'O campo Mensagem é obrigatório.',
            'body.string' => 'O campo Mensagem deve ser uma string.',
            'body.max' => 'O campo Mensagem deve ter no máximo 2000 caracteres.',
        ];
    }
}
