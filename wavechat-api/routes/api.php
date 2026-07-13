<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\RoomController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')
    ->controller(AuthController::class)
    ->group(function () {
        Route::post('/login', 'login')->middleware('throttle:5,1');
        Route::post('/register', 'register');
        Route::post('/logout', 'logout')->middleware('auth:sanctum');
    });

Route::middleware('auth:sanctum')->group(function () {
    Route::get('user/rooms', [RoomController::class, 'myRooms']);

    Route::prefix('rooms')
        ->controller(RoomController::class)
        ->group(function () {
            Route::get('/', 'index');
            Route::post('/', 'store');
            Route::get('/{room}', 'show');
            Route::post('/{room}/join', 'join');
            Route::post('/{room}/leave', 'leave');
        });

    Route::prefix('rooms/{room}/messages')
        ->controller(MessageController::class)
        ->group(function () {
            Route::get('/', 'index');
            Route::post('/', 'store');
        });
});
