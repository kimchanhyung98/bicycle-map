<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MapController extends Controller
{
    /**
     * 네이버 지도 리버스 지오코드
     *
     * @param Request $request
     * @return bool|string
     */
    public function reverse_geocode(Request $request)
    {
        $args = [
            'coords' => $request->lnglat,
            'output' => 'json',
            'orders' => 'addr'
        ];
        $url = 'https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?' . http_build_query($args);

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $headers = array();
        $headers[] = 'X-NCP-APIGW-API-KEY-ID: ' . config('map.client_id');
        $headers[] = 'X-NCP-APIGW-API-KEY: ' . config('map.client_secret');
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $response = curl_exec($ch);
        $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($status_code == 200) {
            return $response;
        } else {
            return 'Error :' . $response;
        }
    }
}
