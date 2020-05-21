$(function () {
    /* 네이버 지도 옵션 */
    var center_lat = $('#center_lat').val();
    var center_lng = $('#center_lng').val();

    var map = new naver.maps.Map('map', {
        // center: new naver.maps.LatLng(center_lat, center_lng),

        scaleControl: false,
        logoControl: false,
        mapDataControl: false,
        zoomControl: true,
        zoom: 13, //지도의 초기 줌 레벨
        minZoom: 6,

        mapTypeControl: true,
        mapTypeControlOptions: {
            style: naver.maps.MapTypeControlStyle.DROPDOWN
        }
    });

    /* 마커 */
    /*
    var marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(37.5150345, 126.8841088),
        map: map
    });
    */

    /* PATH 설정 */
    // var HOME_PATH = window.HOME_PATH || '.';

    /* 자전거 레이어 표시 */
    var bicycleLayer = new naver.maps.BicycleLayer();
    var btn = $('#bicycle');

    naver.maps.Event.addListener(map, 'bicycleLayer_changed', function (bicycleLayer) {
        if (bicycleLayer) {
            btn.addClass('control-on');
        } else {
            btn.removeClass('control-on');
        }
    });

    btn.on("click", function (e) {
        e.preventDefault();

        if (bicycleLayer.getMap()) {
            bicycleLayer.setMap(null);
        } else {
            bicycleLayer.setMap(map);
        }
    });

    var gpx_url = $('#gpx_url').val();

    naver.maps.Event.once(map, 'init_stylemap', function () {
        /* GPX 파일 설정 */
        $.ajax({
            url: gpx_url,
            dataType: 'xml',
            success: startDataLayer
        });

        bicycleLayer.setMap(map);
    });

    /* GPX 데이터 레이어 표시 */
    function startDataLayer(xmlDoc) {
        map.data.addGpx(xmlDoc);
    }
});
