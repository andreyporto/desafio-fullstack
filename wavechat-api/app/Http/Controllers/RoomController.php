<?php

namespace App\Http\Controllers;

use App\Http\Requests\Rooms\StoreRoomRequest;
use App\Http\Resources\Rooms\RoomDetailResource;
use App\Http\Resources\Rooms\RoomResource;
use App\Models\Room;
use App\Services\RoomService;
use Illuminate\Http\JsonResponse;

class RoomController extends Controller
{
    public function __construct(private RoomService $roomService) {}

    public function myRooms(): JsonResponse
    {
        $rooms = $this->roomService->myRooms();

        return RoomResource::collection($rooms)
            ->response()
            ->setStatusCode(JsonResponse::HTTP_OK);
    }

    public function index(): JsonResponse
    {
        $rooms = $this->roomService->index();

        return RoomResource::collection($rooms)
            ->response()
            ->setStatusCode(JsonResponse::HTTP_OK);
    }

    public function store(StoreRoomRequest $request): JsonResponse
    {
        $room = $this->roomService->create($request->validated());

        return new RoomResource($room)
            ->response()
            ->setStatusCode(JsonResponse::HTTP_CREATED);
    }

    public function show(Room $room): JsonResponse
    {
        $room = $this->roomService->show($room);

        return new RoomDetailResource($room)
            ->response()
            ->setStatusCode(JsonResponse::HTTP_OK);
    }

    public function join(Room $room): JsonResponse
    {
        $this->roomService->join($room);

        return response()->json(
            [
                'message' => 'Entrou na sala com sucesso',
            ],
            JsonResponse::HTTP_OK,
        );
    }

    public function leave(Room $room): JsonResponse
    {
        $this->roomService->leave($room);

        return response()->json([], JsonResponse::HTTP_NO_CONTENT);
    }
}
