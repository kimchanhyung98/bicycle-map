<?php

use Illuminate\Database\Seeder;

class RideSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $rides = factory(App\Models\Ride::class, 20)->create();
    }
}
