<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Ride;
use App\Models\User;
use Faker\Generator as Faker;

$factory->define(Ride::class, function (Faker $faker) {
    $user = User::all()->random();

    return [
        'user_id' => $user->id,
        // 'file_id' => $file->id,
        'name' => $faker->realText(20),
        'description' => $faker->realText(),
        'started_at' => $started_at = $faker->dateTime(),
        'ended_at' => $faker->dateTimeBetween($started_at, '2 days'),
        'address' => $faker->address,
        'address_detail' => $faker->realText(20),
        'difficulty' => $faker->randomElement(array('beginner', 'intermediate', 'advanced')),
        'capacity' => $faker->numberBetween(3, 100),
        'distance' => $faker->numberBetween(0, 300),
        'altitude' => $faker->randomElement(array('flat', 'uphill', 'mountain')),
        'altitude_detail' => $faker->randomNumber(4),
    ];
});
