import React, {memo, useCallback, useEffect} from "react";
import {RenderAfterNavermapsLoaded, NaverMap, Marker} from "react-naver-maps";

const {env, $} = window;
const NAVER_API_KEY = env.NCLOUD_CLIENT_ID;
const location = {
    latitude: '37.554722',
    longitude: '126.970833'
};

const Map = memo(({
    mapOptions,
    markers,
    ...props
}) => {
    const {id, style, center, zoom} = mapOptions;
    const {gpx} = props;
    let mapRef;

    const startDataLayer = useCallback((xmlDoc) => {
        mapRef.instance.data.addGpx(xmlDoc);
    }, []);

    useEffect(() => {
        if (gpx) {
            window.naver.maps.Event.once(mapRef.instance, 'init_stylemap', () => {
                $.ajax({
                    url: gpx.path,
                    dataType: 'xml',
                    success: (res) => {
                        startDataLayer(res);
                    }
                });
            });
        }
    }, []);

    return (
        <RenderAfterNavermapsLoaded ncpClientId={NAVER_API_KEY}
                                    error={<p>오류</p>}
                                    loading={<p>Loading</p>}>
            <NaverMap {...mapOptions}
                      id={id || 'map'}
                      style={{
                          width: style.width || '100%',
                          height: style.height || '300px'
                      }}
                      defaultCenter={center || location}
                      center={center || location}
                      zoom={zoom || 12}
                      naverRef={ref => {
                          mapRef = ref;
                      }}>

                {markers &&
                    markers.map((marker) => {
                        return (
                            <Marker key={marker}
                                    position={marker}/>
                        );
                    })
                }
            </NaverMap>
        </RenderAfterNavermapsLoaded>
    );
});

export default Map;
