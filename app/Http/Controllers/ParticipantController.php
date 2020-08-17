<?php

namespace App\Http\Controllers;

use App\Models\Participant;
use App\Models\Ride;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ParticipantController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        Participant::where([
             //'user_id' => $request->user()->id,
            'user_id' => $request->user_id,
            'ride_id' => $request->ride_id,
        ])->firstOrCreate();

        return response()->json([
            'message' => '참가 신청되었습니다.',
        ]);
    }
}
