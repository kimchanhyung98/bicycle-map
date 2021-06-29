<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * 댓글 작성
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'ride_id' => 'required|numeric',
            'parent_id' => 'numeric',
            'content' => 'required'
        ]);
        $validatedData['user_id'] = $request->user()->id;
        $comment = Comment::create($validatedData);

        return response()->json([
            'comment' => $comment->load('user:id,name'),
            'message' => '작성되었습니다',
        ]);
    }

    /**
     * 댓글 삭제
     *
     * @param Request $request
     * @param Comment $comment
     * @return JsonResponse
     */
    public function destroy(Request $request, Comment $comment)
    {
        if($comment->user_id == $request->user()->id) {
            $comment->delete();
            return response()->json([
                'message' => '삭제되었습니다',
            ]);
        } else {
            return response()->json([
                'error' => true,
            ]);
        }
    }
}
