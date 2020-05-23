@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">Dashboard</div>

                    <div class="card-body">
                        <a href="{{ route('post.create') }}">Create</a>
                    </div>

                    <div class="card-body">
                        @forelse($posts as $post)
                            <div class="col-md-10">
                                <a href="{{ route('post.index', $post->id) }}">{{ $post->title }}</a>
                            </div>
                        @empty
                            게시글이 없습니다.
                        @endforelse
                    </div>

                    <div class="card-footer">
                        <a href="https://github.com/kimchanhyung98/bicycle-map">Github</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
