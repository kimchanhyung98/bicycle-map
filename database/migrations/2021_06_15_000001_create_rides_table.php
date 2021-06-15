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
            $table->foreignId('file_id')->nullable()->constrained();
            $table->string('name')->comment('제목');
            $table->text('description')->comment('설명');
            $table->dateTime('started_at')->comment('시작 시각');
            $table->dateTime('ended_at')->nullable()->comment('종료 시각');
            $table->string('address')->comment('주소');
            $table->string('address_detail')->nullable()->comment('상세주소');
            $table->string('locality')->nullable()->comment('주소 (시도)');
            $table->string('sublocality1')->nullable()->comment('주소 (구군)');
            $table->string('sublocality2')->nullable()->comment('주소 (동)');
            $table->float('latitude', 10, 7)->nullable()->comment('위도');
            $table->float('longitude', 10, 7)->nullable()->comment('경도');
            $table->string('difficulty')->comment('난이도');
            $table->unsignedInteger('capacity')->comment('정원');
            $table->unsignedInteger('distance')->nullable()->comment('거리 (km)');
            $table->string('altitude')->nullable()->comment('고도');
            $table->unsignedInteger('altitude_detail')->nullable()->comment('고도 (m)');
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
