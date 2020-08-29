<?php

namespace App\Http\Controllers;

use App\Models\Participant;
use App\Models\Ride;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ParticipantController extends Controller
{
    /**
     * 라이드 참가
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $participant = Participant::firstOrCreate([
            'user_id' => $request->user()->id,
            'ride_id' => $request->ride_id,
        ]);
        logger($participant);

        return response()->json([
            'message' => $participant->wasRecentlyCreated ? '참가 신청되었습니다.' : '이미 참가 신청한 라이드입니다.',
        ]);
    }

    /**
     * 라이드 참가 취소
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function destroy(Request $request)
    {
        $participant = Participant::where([
            'user_id' => $request->user()->id,
            'ride_id' => $request->ride_id,
        ])->delete();
        logger($participant);

        return response()->json([
            'message' => '참가 취소되었습니다.',
        ]);
    }
}
