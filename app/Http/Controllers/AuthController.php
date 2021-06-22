<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
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
     * 로그인
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'email|required',
            'password' => 'string|required'
        ]);

        try {
            if (!Auth::attempt($credentials)) {
                return response()->json([
                    'message' => 'Invalid login details'
                ], 401);
            }

            $user = User::where('email', $credentials['email'])->firstOrFail();
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
            ]);
        } catch (\Exception $error) {
            return response()->json([
                'message' => 'Error'
            ], 500);
        }
    }

    /**
     * 로그아웃
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        // Auth::guard('web')->logout();

        return response()->json([
            'message' => 'logout'
        ], 204);
    }

    /**
     * 회원가입
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:20',
            'email' => 'required|string|email|max:100|unique:users',
            'phone' => 'required|digits_between:10,11',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'phone' => $validatedData['phone'],
            'password' => Hash::make($validatedData['password']),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }
}
