<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();

            $table->string('name')->comment('파일명');
            $table->string('path')->comment('파일 경로');
            $table->string('extension')->comment('파일 확장자');
            $table->unsignedInteger('size')->default(0)->comment('파일 크기');
            $table->unsignedInteger('download')->default(0)->comment('다운로드 횟수');
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
        Schema::dropIfExists('files');
    }
}
