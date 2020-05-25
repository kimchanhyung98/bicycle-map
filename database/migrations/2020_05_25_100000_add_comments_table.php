<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('comments', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id')->after('id')->comment('유저 번호');
            $table->foreign('user_id')->references('id')->on('users');

            $table->unsignedBigInteger('post_id')->after('user_id')->comment('게시글 번호');
            $table->foreign('post_id')->references('id')->on('posts');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('comments', function (Blueprint $table) {
            $table->dropForeign('user_id');
            $table->dropColumn('user_id');

            $table->dropForeign('post_id');
            $table->dropColumn('post_id');
        });
    }
}
