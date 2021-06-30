<?php

namespace App\Http\Controllers;

use App\Models\Ride;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AccountController extends Controller
{
    /**
     * 회원 정보 업데이트
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function update(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|string|email|max:255',
            'phone' => 'nullable|digits_between:10,11',
            'password' => 'nullable|string|min:8|confirmed'
        ]);

        $user = $request->user()->update([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'phone' => $validatedData['phone'],
            'password' => Hash::make($validatedData['password']),
        ]);

        return response()->json([
            'user' => $user,
            'message' => '수정되었습니다.',
        ]);
    }

    /**
     * 회원 탈퇴
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function destroy(Request $request)
    {
        $user = $request->user()->delete();

        return response()->json([
            'user' => $user,
            'message' => '탈퇴되었습니다.',
        ]);
    }

    /**
     * 마이 페이지, 참가 내역
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function attend(Request $request)
    {
        return response()->json([
            'rides' => Ride::whereIn('id', $request->user()->participants()->pluck('ride_id'))->paginate(10),
        ]);
    }

    /**
     * 마이 페이지, 개설 내역
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function manage(Request $request)
    {
        return response()->json([
            'rides' => Ride::where('user_id', $request->user()->id)->paginate(10),
        ]);
    }

    /**
     * 마이 페이지, 참가자 명단
     *
     * @param Ride $ride
     * @return JsonResponse
     */
    public function entry(Ride $ride)
    {
        return response()->json([
            'ride_name' => $ride->name,
            'entry' => $ride->participants->load('user:id,name'),
        ]);
    }
}
