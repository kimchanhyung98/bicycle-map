<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Post;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @param Post $post
     * @return Renderable
     */
    public function index(Post $post)
    {
        return view('post.index', [
            'post' => $post,
            'gpx_url' => str_replace('public/', '/storage/', $post->file->path),
        ]);
    }

    /**
     * Show the application dashboard.
     *
     * @return Renderable
     */
    public function create()
    {
        return view('post.create');
    }

    /**
     * @param Request $request
     * @return RedirectResponse
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => ['required', 'max:255'],
            'content' => ['required'],
            'gpx' => ['required', 'file', 'mimes:gpx,xml'],
        ]);

        $name = $validatedData['gpx']->getClientOriginalName();
        $path = $validatedData['gpx']->store('public');
        // $path = $validatedData['gpx']->storeAs('public', uniqid().'.gpx');

        $file = File::create([
            'user_id' => Auth::id(),
            'name' => $name,
            'path' => $path,
        ]);

        $post = Post::create([
            'user_id' => Auth::id(),
            'file_id' => $file->id,
            'title' => $validatedData['title'],
            'content' => $validatedData['content'],
        ]);

        return redirect(route('post.index', $post->id));
    }
}
