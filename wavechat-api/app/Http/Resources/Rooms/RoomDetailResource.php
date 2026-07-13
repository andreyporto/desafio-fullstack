<?php

namespace App\Http\Resources\Rooms;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoomDetailResource extends JsonResource
{
    public static $wrap = null;

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'created_by' => $this->created_by,
            'members_count' => $this->whenCounted('users'),
            'members' => $this->users->map(
                fn ($user) => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ],
            ),
            'created_at' => $this->created_at->toIso8601String(),
        ];
    }
}
