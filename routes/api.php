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

Route::middleware('auth:sanctum')->group(function () {
    Route::group(['prefix' => 'status', 'as' => 'status.'], function () {
        // 유저 상태
        Route::get('user', 'StatusController@user')->name('user');

        // 라이드 참가 상태
        Route::get('participation', 'StatusController@participation')->name('participation');
    });

    // 마이 페이지
    Route::group(['prefix' => 'account', 'as' => 'account.'], function () {
        // 회원 정보 업데이트
        Route::put('/', 'AccountController@update')->name('update');
        // 회원 탈퇴
        Route::delete('/', 'AccountController@destroy')->name('destroy');

        // 개설 내역
        Route::get('manage', 'AccountController@manage')->name('manage');
        // 참가 내역
        Route::get('attend', 'AccountController@attend')->name('attend');
    });

    // 업로드
    Route::group(['prefix' => 'upload', 'as' => 'upload.'], function () {
        // GPX 파일 업로드
        Route::post('gpx', 'FileController@gpx')->name('gpx');

        // 썸네일 업로드
        Route::post('thumbnail', 'FileController@thumbnail')->name('thumbnail');
    });

    // 네이버 지도 리버스 지오코드
    Route::get('reverse-geocode', 'MapController@reverse_geocode');
});

Route::group(['prefix' => 'ride', 'as' => 'ride.'], function () {
    // 라이드 리스트
    Route::get('/', 'RideController@index')->name('index');

    // 라이드 상세
    Route::get('{ride}', 'RideController@show')->name('show');

    Route::middleware('auth:sanctum')->group(function () {
        // 라이드 저장
        Route::post('store', 'RideController@store')->name('store');
        // 라이드 수정
        Route::get('edit/{ride}', 'RideController@edit')->name('edit');
        // 라이드 업데이트
        Route::put('{ride}', 'RideController@update')->name('update');
        // 라이드 삭제
        Route::delete('{ride}', 'RideController@destroy')->name('destroy');

        // 라이드 참가
        Route::post('attend', 'ParticipantController@store')->name('attend');
        // 라이드 참가 취소
        Route::post('cancel', 'ParticipantController@destroy')->name('cancel');
    });
});
