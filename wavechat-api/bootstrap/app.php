<?php

use App\Exceptions\AlreadyMemberException;
use App\Exceptions\InvalidCredentialsException;
use App\Exceptions\JoinRoomException;
use App\Exceptions\LeaveRoomException;
use App\Exceptions\MessageCreationException;
use App\Exceptions\NotMemberException;
use App\Exceptions\RoomCreationException;
use App\Exceptions\UserRegistrationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*'),
        );

        $exceptions->render(function (ValidationException $e) {
            return response()->json(
                ['errors' => $e->errors()],
                JsonResponse::HTTP_UNPROCESSABLE_ENTITY,
            );
        });

        $exceptions->render(function (
            ThrottleRequestsException $e,
            Request $request,
        ) {
            if ($request->is('api/*')) {
                return response()->json(
                    [
                        'message' => 'Limite de tentativas excedido. Tente novamente mais tarde.',
                    ],
                    JsonResponse::HTTP_TOO_MANY_REQUESTS,
                );
            }
        });

        $exceptions->render(function (InvalidCredentialsException $e) {
            return response()->json(
                ['message' => $e->getMessage()],
                JsonResponse::HTTP_UNAUTHORIZED,
            );
        });

        $exceptions->render(function (UserRegistrationException $e) {
            return response()->json(
                ['message' => $e->getMessage()],
                JsonResponse::HTTP_UNPROCESSABLE_ENTITY,
            );
        });

        $exceptions->render(function (RoomCreationException $e) {
            return response()->json(
                ['message' => $e->getMessage()],
                JsonResponse::HTTP_UNPROCESSABLE_ENTITY,
            );
        });

        $exceptions->render(function (AlreadyMemberException $e) {
            return response()->json(
                ['message' => $e->getMessage()],
                JsonResponse::HTTP_CONFLICT,
            );
        });

        $exceptions->render(function (JoinRoomException $e) {
            return response()->json(
                ['message' => $e->getMessage()],
                JsonResponse::HTTP_UNPROCESSABLE_ENTITY,
            );
        });

        $exceptions->render(function (LeaveRoomException $e) {
            return response()->json(
                ['message' => $e->getMessage()],
                JsonResponse::HTTP_UNPROCESSABLE_ENTITY,
            );
        });

        $exceptions->render(function (NotMemberException $e) {
            return response()->json(
                ['message' => $e->getMessage()],
                JsonResponse::HTTP_FORBIDDEN,
            );
        });

        $exceptions->render(function (MessageCreationException $e) {
            return response()->json(
                ['message' => $e->getMessage()],
                JsonResponse::HTTP_UNPROCESSABLE_ENTITY,
            );
        });
    })
    ->create();
