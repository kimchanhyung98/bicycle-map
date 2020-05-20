@extends('layouts.app')

@section('script')
    <script type="text/javascript" src="{{ asset('js/jquery-1.9.1.js') }}"></script>
    <script type="text/javascript" src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId={{ config('ncloud.id') }}"></script>
    <script type="text/javascript" src="{{ asset('js/map.js') }}"></script>
@endsection

@section('style')
@endsection

@section('content')
    <div id="map" style="width:100%;height:700px;"></div>
@endsection
