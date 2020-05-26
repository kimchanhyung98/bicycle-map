@extends('layouts.app')

@section('script')
    <script type="text/javascript" src="{{ asset('js/jquery-1.9.1.js') }}"></script>
    <script type="text/javascript"
            src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId={{ config('ncloud.id') }}"></script>
    <script type="text/javascript" src="{{ asset('js/map.js') }}"></script>
@endsection

@section('style')
@endsection

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <b>{{ $post->title }}</b>
                        {{ $post->user->name }}
                    </div>

                    <div class="card-body">
                        @isset($post->file)
                            <input type="hidden" id="gpx_url" value="{{ $gpx_url }}">
                            <div id="map" style="width:100%;height:700px;"></div>

                            <div class="col-md-10 mt-3 mb-4">
                                <a href="{{ route('post.download', $post->id) }}">
                                    다운로드 : {{ $post->file->name }}
                                </a>
                            </div>
                            <pre>{{ $post->content }}</pre>
                        @else
                            <pre>{{ $post->content }}</pre>
                        @endisset
                    </div>

                    <div class="card-footer">
                        @forelse($comments as $comment)
                            <div class="form-group row">
                                <div class="col-md-4 text-md-right">{{ $comment->user->name }} :</div>
                                <div class="col-md-6">{{ $comment->content }}</div>
                            </div>
                        @empty
                            <div class="form-group row justify-content-center">작성된 댓글이 없습니다.</div>
                        @endforelse

                        <form method="POST" action="{{ route('post.comment.store') }}">
                            <div class="form-group row">
                                @csrf

                                <label for="title" class="col-md-4 col-form-label text-md-right">댓글 작성</label>

                                <div class="col-md-6">
                                    <input id="content" type="text" class="form-control" name="content">
                                    @error('content')
                                        <span class="" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>

                                <div class="col-md-1">
                                    <input type="submit">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
@endsection
