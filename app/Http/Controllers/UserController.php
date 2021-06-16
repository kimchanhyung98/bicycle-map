<?php

namespace App\Http\Controllers;

use App\Models\Participant;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * 유저 상태
     *
     * @param Request $request
     * @return mixed
     */
    public function index(Request $request)
    {
        return $request->user();
    }

    /**
     * 라이드 참가 상태
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function participation(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|numeric',
            'ride_id' => 'required|numeric',
        ]);

        $participant = Participant::where([
            'user_id' => $validatedData['user_id'],
            'ride_id' => $validatedData['ride_id'],
        ])->first();

        return response()->json([
            'is_attend' => $participant ? true : false,
        ]);
    }
}
