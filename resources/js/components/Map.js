import React from "react";
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";

export const Map = (props) => {
    const NAVER_API_KEY = 'pcpokmfv1u';

    return (
        <RenderAfterNavermapsLoaded
            ncpClientId={NAVER_API_KEY}
            error={<p>Maps Load Error</p>}
            loading={<p>Maps Loading...</p>}>
            <NaverMap
                mapDivId={"map"} // default: react-naver-map
                style={{
                  width: props.width,
                  height: props.height
                }}
                defaultCenter={{ lat: props.lat, lng: props.lng }} // 지도 초기 위치
                zoom={10}>
            </NaverMap>
        </RenderAfterNavermapsLoaded>
    );
};

export default Map;
