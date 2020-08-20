import React from "react";
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";

export const Map = (props) => {
  const NAVER_API_KEY = 'pcpokmfv1u';

  return (
    <RenderAfterNavermapsLoaded
      ncpClientId={NAVER_API_KEY} // 자신의 네이버 계정에서 발급받은 Client ID
      error={<p>Maps Load Error</p>}
      loading={<p>Maps Loading...</p>}
    >
      <NaverMap
        mapDivId={"map"} // default: react-naver-map
        style={{
          width: 800, // 네이버지도 가로 길이
          height: 800 // 네이버지도 세로 길이
        }}
        defaultCenter={{ lat: 37.554722, lng: 126.970833 }} // 지도 초기 위치
        zoom={props.zoom}
      >
      </NaverMap>
    </RenderAfterNavermapsLoaded>
  );

export default Map;
