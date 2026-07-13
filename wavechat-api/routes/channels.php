<?php

use App\Models\Room;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('room.{roomId}', function ($user, $roomId) {
    $room = Room::find($roomId);

    if (! $room || ! $room->isMember($user)) {
        return false;
    }

    return ['id' => $user->id, 'name' => $user->name];
});

Broadcast::channel('room-notifications.{roomId}', function ($user, $roomId) {
    $room = Room::find($roomId);

    if (! $room || ! $room->isMember($user)) {
        return false;
    }

    return true;
});
