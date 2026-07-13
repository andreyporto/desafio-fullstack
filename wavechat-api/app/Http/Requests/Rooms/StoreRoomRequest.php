<?php

namespace App\Http\Requests\Rooms;

use Illuminate\Foundation\Http\FormRequest;

class StoreRoomRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'O campo Nome é obrigatório.',
            'name.string' => 'O campo Nome deve ser uma string.',
            'name.max' => 'O campo Nome deve ter no máximo 255 caracteres.',

            'description.string' => 'O campo Descrição deve ser uma string.',
            'description.max' => 'O campo Descrição deve ter no máximo 1000 caracteres.',
        ];
    }
}
