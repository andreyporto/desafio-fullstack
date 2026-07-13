<?php

namespace Database\Factories;

use App\Models\Room;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Room>
 */
class RoomFactory extends Factory
{
    protected $model = Room::class;

    public function definition(): array
    {
        return [
            "name" => fake()->unique()->words(3, true),
            "description" => fake()->sentence(),
            "created_by" => User::factory(),
        ];
    }
}
