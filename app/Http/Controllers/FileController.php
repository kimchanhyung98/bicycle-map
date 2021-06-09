<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FileController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function gpx(Request $request)
    {
        $request->validate([
            'file' => 'nullable|file|max:5120',
        ]);

        $upload = $request->file('file');
        $url = $upload->store('public');
        $path = str_replace('public', '/storage', $url);

        $file = File::create([
            'user_id' => $request->user()->id,
            'name' => $upload->getClientOriginalName(),
            'path' => $path,
            'extension' => $upload->getClientOriginalExtension(),
            'size' => $upload->getSize(),
        ]);

        return response()->json([
            'file' => $file,
            'message' => '업로드되었습니다.',
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function thumbnail(Request $request)
    {
        $request->validate([
            'file' => 'nullable|file|max:5120',
        ]);

        $upload = $request->file('file');
        $url = $upload->store('public');
        $path = str_replace('public', '/storage', $url);

        $file = File::create([
            'user_id' => $request->user()->id,
            'name' => $upload->getClientOriginalName(),
            'path' => $path,
            'extension' => $upload->getClientOriginalExtension(),
            'size' => $upload->getSize(),
        ]);

        return response()->json([
            'file' => $file,
            'message' => '업로드되었습니다.',
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'file' => 'nullable|file|max:5120',
        ]);

        $upload = $request->file('file');
        $url = $upload->store('public');
        $path = str_replace('public', '/storage', $url);

        $file = File::create([
            'user_id' => $request->user()->id,
            'name' => $upload->getClientOriginalName(),
            'path' => $path,
            'extension' => $upload->getClientOriginalExtension(),
            'size' => $upload->getSize(),
        ]);

        return response()->json([
            'file' => $file,
            'message' => '업로드되었습니다.',
        ]);
    }
}
