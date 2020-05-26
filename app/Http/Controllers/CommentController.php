<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    /**
     * @param Request $request
     * @return RedirectResponse
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'post_id' => ['required', 'numeric'],
            'content' => ['required'],
        ]);

        Comment::create([
            'user_id' => Auth::id(),
            'post_id' => $validatedData['post_id'],
            'content' => $validatedData['content'],
        ]);

        return redirect(route('post.index', $validatedData['post_id']));
    }
}
