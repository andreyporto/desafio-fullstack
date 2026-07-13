<?php

namespace App\Services;

use App\Exceptions\AlreadyMemberException;
use App\Exceptions\JoinRoomException;
use App\Exceptions\LeaveRoomException;
use App\Exceptions\RoomCreationException;
use App\Models\Room;
use Illuminate\Support\Facades\Auth;

class RoomService
{
    public function myRooms()
    {
        return Auth::user()->rooms()->withCount('users')->latest()->get();
    }

    public function index()
    {
        return Room::withCount('users')->latest()->paginate(15);
    }

    public function create(array $data): Room
    {
        try {
            $room = Room::create([
                'name' => $data['name'],
                'description' => $data['description'] ?? null,
                'created_by' => Auth::id(),
            ]);

            $room->users()->attach(Auth::id(), ['joined_at' => now()]);

            return $room->loadCount('users');
        } catch (\Exception $e) {
            throw new RoomCreationException;
        }
    }

    public function show(Room $room): Room
    {
        $room->load('users', 'users:id,name,email');
        $room->loadCount('users');

        return $room;
    }

    public function join(Room $room): void
    {
        if ($room->isMember(Auth::user())) {
            throw new AlreadyMemberException;
        }

        try {
            $room->users()->attach(Auth::id(), ['joined_at' => now()]);
        } catch (\Exception $e) {
            throw new JoinRoomException;
        }
    }

    public function leave(Room $room): void
    {
        try {
            $room->users()->detach(Auth::id());
        } catch (\Exception $e) {
            throw new LeaveRoomException;
        }
    }
}
