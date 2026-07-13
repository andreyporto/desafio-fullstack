<?php

namespace App\Services;

use App\Events\MessageSent;
use App\Exceptions\MessageCreationException;
use App\Exceptions\NotMemberException;
use App\Models\Message;
use App\Models\Room;
use Illuminate\Support\Facades\Auth;

class MessageService
{
    public function index(Room $room): mixed
    {
        if (! $room->isMember(Auth::user())) {
            throw new NotMemberException;
        }

        return $room->messages()->with('user:id,name')->latest()->paginate(30);
    }

    public function store(Room $room, array $data): Message
    {
        if (! $room->isMember(Auth::user())) {
            throw new NotMemberException;
        }

        try {
            $message = $room->messages()->create([
                'user_id' => Auth::id(),
                'body' => $data['body'],
            ]);

            $message->load('user:id,name');

            broadcast(new MessageSent($message));

            return $message;
        } catch (\Exception $e) {
            throw new MessageCreationException;
        }
    }
}
