<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'HomeController@index')->name('home');

Auth::routes([
    'verify' => true
]);

Route::group(['prefix' => 'post', 'as' => 'post.'], function () {
    Route::middleware(['auth'])->group(function () {
        Route::get('create', 'PostController@create')->name('create');
        Route::post('store', 'PostController@store')->name('store');
    });

    Route::get('{post}', 'PostController@index')->name('index');
    Route::get('{post}/download', 'PostController@download')->name('download');
});
