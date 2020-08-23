<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', 'Auth\AuthController@login');
Route::get('user', 'Auth\AuthController@user')->middleware('auth:sanctum');

Route::group(['prefix' => 'ride', 'as' => 'ride.'], function () {
    // 라이드 리스트
    Route::get('/', 'RideController@index')->name('index');

    // 라이드 상세
    Route::get('{ride}', 'RideController@show')->name('show');

    Route::middleware('auth:sanctum')->group(function () {
        // 라이드 수정
        Route::get('edit/{ride}', 'RideController@edit')->name('edit');

        // 라이드 저장
        Route::post('store', 'RideController@store')->name('store');
        // 라이드 업데이트
        Route::put('{ride}', 'RideController@update')->name('update');

        // 라이드 참가
        Route::post('attend', 'ParticipantController@store')->name('attend');
        // 라이드 참가 취소
        Route::post('cancel', 'ParticipantController@destroy')->name('cancel');
    });
});

Route::get('geocode/reverse', 'Api\MapController@reverse_geocode');
