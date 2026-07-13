<?php

namespace Database\Seeders;

use App\Models\Room;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $admin = User::factory()->create([
            "name" => "Admin",
            "email" => "admin@admin.com",
        ]);

        Room::factory(30)
            ->create(["created_by" => $admin->id])
            ->each(function (Room $room) use ($admin) {
                $room->users()->attach($admin->id, ["joined_at" => now()]);
            });
    }
}
