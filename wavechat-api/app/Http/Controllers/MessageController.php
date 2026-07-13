<?php

namespace App\Http\Controllers;

use App\Http\Requests\Messages\SendMessageRequest;
use App\Http\Resources\Messages\MessageResource;
use App\Models\Room;
use App\Services\MessageService;
use Illuminate\Http\JsonResponse;

class MessageController extends Controller
{
    public function __construct(private MessageService $messageService) {}

    public function index(Room $room): JsonResponse
    {
        $messages = $this->messageService->index($room);

        return MessageResource::collection($messages)
            ->response()
            ->setStatusCode(JsonResponse::HTTP_OK);
    }

    public function store(SendMessageRequest $request, Room $room): JsonResponse
    {
        $message = $this->messageService->store($room, $request->validated());

        return new MessageResource($message)
            ->response()
            ->setStatusCode(JsonResponse::HTTP_CREATED);
    }
}
