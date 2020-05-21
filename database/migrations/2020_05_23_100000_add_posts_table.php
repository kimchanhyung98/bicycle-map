<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id')->after('id')->comment('유저 번호');
            $table->foreign('user_id')->references('id')->on('users');

            $table->unsignedBigInteger('file_id')->nullable()->after('user_id')->comment('파일 번호');
            $table->foreign('file_id')->references('id')->on('files');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->dropForeign('user_id');
            $table->dropColumn('user_id');

            $table->dropForeign('file_id');
            $table->dropColumn('file_id');
        });
    }
}
