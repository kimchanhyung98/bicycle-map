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
                                <a href="{{ $post->file->path }}">
                                    다운로드 : {{ $post->file->name }}
                                </a>
                            </div>
                            <pre>{{ $post->content }}</pre>
                        @else
                            <pre>{{ $post->content }}</pre>
                        @endisset
                    </div>

                    <div class="card-footer">
                        comment
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
