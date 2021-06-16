<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\MapController;
use App\Http\Controllers\ParticipantController;
use App\Http\Controllers\RideController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::group(['prefix' => 'user', 'as' => 'user.'], function () {
        // 유저 상태
        Route::get('/', [UserController::class, 'index']);

        // 라이드 참가 상태
        Route::get('participation', [UserController::class, 'participation'])->name('participation');
    });

    // 마이 페이지
    Route::group(['prefix' => 'account', 'as' => 'account.'], function () {
        // 회원 정보 업데이트
        Route::put('/', [AccountController::class, 'update'])->name('update');
        // 회원 탈퇴
        Route::delete('/', [AccountController::class, 'destroy'])->name('destroy');

        // 개설 내역
        Route::get('manage', [AccountController::class, 'manage'])->name('manage');
        // 참가 내역
        Route::get('attend', [AccountController::class, 'attend'])->name('attend');
    });

    // 업로드
    Route::group(['prefix' => 'upload', 'as' => 'upload.'], function () {
        // GPX 파일 업로드
        Route::post('gpx', [FileController::class, 'gpx'])->name('gpx');

        // 썸네일 업로드
        Route::post('thumbnail', [FileController::class, 'thumbnail'])->name('thumbnail');
    });

    // 네이버 지도 리버스 지오코드
    Route::get('reverse-geocode', [MapController::class, 'reverse_geocode']);
});

Route::group(['prefix' => 'ride', 'as' => 'ride.'], function () {
    // 라이드 리스트
    Route::get('/', [RideController::class, 'index'])->name('index');

    // 라이드 상세
    Route::get('{ride}', [RideController::class, 'show'])->name('show');

    Route::middleware('auth:sanctum')->group(function () {
        // 라이드 저장
        Route::post('store', [RideController::class, 'store'])->name('store');
        // 라이드 수정
        Route::get('edit/{ride}', [RideController::class, 'edit'])->name('edit');
        // 라이드 업데이트
        Route::put('{ride}', [RideController::class, 'update'])->name('update');
        // 라이드 삭제
        Route::delete('{ride}', [RideController::class, 'destroy'])->name('destroy');

        // 라이드 참가
        Route::post('attend', [ParticipantController::class, 'store'])->name('attend');
        // 라이드 참가 취소
        Route::post('cancel', [ParticipantController::class, 'destroy'])->name('cancel');
    });
});
