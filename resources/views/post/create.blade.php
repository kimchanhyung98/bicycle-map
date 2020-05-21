@extends('layouts.app')

@section('script')
    <script type="text/javascript" src="{{ asset('js/jquery-1.9.1.js') }}"></script>
@endsection

@section('style')
@endsection

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <form method="POST" action="{{ route('post.store') }}" enctype="multipart/form-data">
                        @csrf

                        <div class="card-header">
                            Create
                        </div>

                        <div class="card-body">
                            <div class="form-group row">
                                <label for="title" class="col-md-4 col-form-label text-md-right">제목</label>

                                <div class="col-md-6">
                                    <input id="title" type="text" class="form-control" name="title" required="required"
                                           autofocus="">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="gpx" class="col-md-4 col-form-label text-md-right">gpx 파일</label>

                                <div class="col-md-6">
                                    <input id="gpx" type="file" class="form-control-file" name="gpx" autofocus="">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="content" class="col-md-4 col-form-label text-md-right">내용</label>

                                <div class="col-md-6">
                                <textarea id="content" class="form-control-plaintext" name="content"
                                          autofocus=""></textarea>
                                </div>
                            </div>
                        </div>

                        <div class="card-footer">
                            <input type="submit">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
