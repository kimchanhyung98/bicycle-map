<?php

namespace App\Http\Controllers;

use App\Models\Ride;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RideController extends Controller
{
    /**
     * 라이드 리스트
     *
     * @return JsonResponse
     */
    public function index()
    {
        return response()->json([
            'rides' => Ride::orderByDesc('started_at')->paginate(10),
        ]);
    }

    /**
     * 라이드 저장
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'file_id' => 'nullable|numeric',

            'name' => 'required|max:255',
            'description' => 'nullable|max:10000',
            'started_at' => 'required|date|after:today',
            'ended_at' => 'nullable|date|after:started_at',

            'address' => 'required|max:255',
            'address_detail' => 'nullable|max:255',
            'locality' => 'nullable|max:255',
            'sublocality1' => 'nullable|max:255',
            'sublocality2' => 'nullable|max:255',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',

            'difficulty' => 'required|in:beginner,intermediate,advanced',
            'capacity' => 'required|numeric',
            'distance' => 'nullable|numeric',
            'altitude' => 'required|in:flat,uphill,mountain',
            'altitude_detail' => 'nullable|numeric',
        ]);
        $validatedData['user_id'] = $request->user()->id;
        $ride = Ride::create($validatedData);
        logger($ride);

        return response()->json([
            'ride_id' => $ride->id,
            'message' => '개설되었습니다.',
        ]);
    }

    /**
     * 라이드 상세
     *
     * @param Ride $ride
     * @return JsonResponse
     */
    public function show(Ride $ride)
    {
        return response()->json([
            'ride' => $ride->load('user', 'participants'),
            'participant_count' => $ride->participants()->count(),

            // TODO : 추후 댓글 기능 추가
            // 'comments' => $ride->comments,
        ]);
    }

    /**
     * 라이드 수정
     *
     * @param Ride $ride
     * @return JsonResponse
     */
    public function edit(Ride $ride)
    {
        return response()->json([
            'ride' => $ride,
        ]);
    }

    /**
     * 라이드 업데이트
     *
     * @param Request $request
     * @param Ride $ride
     * @return JsonResponse
     */
    public function update(Request $request, Ride $ride)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'description' => 'nullable|max:10000',
            'started_at' => 'required|date|after:today',
            'ended_at' => 'nullable|date|after:started_at',

            'address' => 'required|max:255',
            'address_detail' => 'nullable|max:255',
            'locality' => 'nullable|max:255',
            'sublocality1' => 'nullable|max:255',
            'sublocality2' => 'nullable|max:255',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',

            'difficulty' => 'required|in:beginner,intermediate,advanced',
            'capacity' => 'required|numeric',
            'distance' => 'nullable|numeric',
            'altitude' => 'required|in:flat,uphill,mountain',
            'altitude_detail' => 'nullable|numeric',
        ]);

        logger($validatedData);
        $ride->update($validatedData);
        logger($ride);

        return response()->json([
            'ride_id' => $ride->id,
            'message' => '수정되었습니다.',
        ]);
    }

    /**
     * 라이드 삭제
     *
     * @param Ride $ride
     * @return JsonResponse
     * @throws \Exception
     */
    public function destroy(Ride $ride)
    {
        $ride->delete();

        return response()->json([
            'message' => '삭제되었습니다.',
        ]);
    }
}
