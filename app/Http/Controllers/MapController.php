<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MapController extends Controller
{
    /**
     * @param Request $request
     * @return bool|string
     */
    public function reverse_geocode(Request $request)
    {
        logger('qweqwe');
        $client_id = "pcpokmfv1u";
        $client_secret = "9WKW5m86YsqxdvrvC3G21IBYz4MLtkBaD9cBeJ1l";
        logger($request);
        $args = ['coords' => $request->lnglat, 'output' => 'json', 'orders' => 'addr'];
        $url = "https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?" . http_build_query($args); // json
        $is_post = false;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, $is_post);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $headers = array();
        $headers[] = "X-NCP-APIGW-API-KEY-ID: " . $client_id;
        $headers[] = "X-NCP-APIGW-API-KEY: " . $client_secret;
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        $response = curl_exec($ch);
        $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        if ($status_code == 200) {
            return $response;
        } else {
            return "Error 내용:" . $response;
        }
    }
}
