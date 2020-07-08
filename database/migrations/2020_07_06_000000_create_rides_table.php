<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRidesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rides', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('file_id')->constrained();

            $table->string('name');
            $table->string('description');
            $table->dateTime('started_at');
            $table->dateTime('ended_at')->nullable();
            $table->string('address');
            $table->string('address_detail')->nullable();
            $table->string('difficulty');
            $table->unsignedInteger('capacity');
            $table->unsignedInteger('distance')->nullable();
            $table->unsignedInteger('altitude')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('rides');
    }
}
