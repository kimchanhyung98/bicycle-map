<?php

namespace App\Http\Controllers;

use App\Models\Ride;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

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
            'name' => 'required|max:255',
            'description' => 'nullable|max:10000',
            'started_at' => 'required|date|before:today',
            'ended_at' => 'nullable|date|before:started_at',

            'address' => 'required|max:255',
            'address_detail' => 'nullable|max:255',
            'locality' => 'nullable|max:255',
            'sublocality1' => 'nullable|max:255',
            'sublocality2' => 'nullable|max:255',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',

            'difficulty' => 'required',
            'capacity' => 'required|numeric',
            'distance' => 'nullable|numeric',
            'altitude' => 'required',
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
            'ride' => $ride->load('user'),
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
            'started_at' => 'required|date|before:today',
            'ended_at' => 'nullable|date|before:started_at',

            'address' => 'required|max:255',
            'address_detail' => 'nullable|max:255',
            'locality' => 'nullable|max:255',
            'sublocality1' => 'nullable|max:255',
            'sublocality2' => 'nullable|max:255',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',

            'difficulty' => 'required', // 미정
            'capacity' => 'required|numeric',
            'distance' => 'nullable|numeric',
            'altitude' => 'required', // 미정
            'altitude_detail' => 'nullable|numeric',
        ]);

        logger($validatedData);
        $ride->update($validatedData); // 작업중

        return response()->json([
            'ride_id' => $ride->id,
            'message' => '수정되었습니다.',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }
}
