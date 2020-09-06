<?php

namespace App\Http\Controllers;

use App\Models\Ride;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AccountController extends Controller
{
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
}
