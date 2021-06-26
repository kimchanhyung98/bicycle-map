<?php

namespace Database\Factories;

use App\Models\Ride;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class RideFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Ride::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => User::all()->random()->id,
            // 'file_id' => null,
            'name' => $this->faker->realText(20),
            'description' => $this->faker->realText(),
            'started_at' => $started_at = $this->faker->dateTime(),
            'ended_at' => $this->faker->dateTimeBetween($started_at, '2 days'),

            'address' => $this->faker->address,
            'address_detail' => $this->faker->realText(20),
            'locality' => $this->faker->metropolitanCity,
            'sublocality1' => $this->faker->borough,
            'sublocality2' => $this->faker->streetName(),
            'latitude' => $this->faker->latitude($min = 33.1, $max = 38.45),
            'longitude' => $this->faker->longitude($min = 125.06, $max = 131.87),

            'difficulty' => $this->faker->randomElement(array('beginner', 'intermediate', 'advanced')),
            'capacity' => $this->faker->numberBetween(3, 50),
            'distance' => $this->faker->numberBetween(0, 5000),
            'altitude' => $this->faker->randomElement(array('flat', 'uphill', 'mountain')),
            'altitude_detail' => $this->faker->numberBetween(0, 5000),
        ];
    }
}
