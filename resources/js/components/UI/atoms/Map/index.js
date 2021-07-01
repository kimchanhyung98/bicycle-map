import React, {memo, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import {RenderAfterNavermapsLoaded, NaverMap, Marker} from "react-naver-maps";

const NAVER_API_KEY = env.NCLOUD_CLIENT_ID;

const Map = memo(({
    mapOptions,
    markers
}) => {
    const {id, width, height, center, zoom, gpx} = mapOptions;
    const mapRef = useRef(null);

    useEffect(() => {
        function startDataLayer(xmlDoc) {
            mapRef.current.instance.data.addGpx(xmlDoc);
        }

        if (gpx && mapRef.current) {
            window.naver.maps.Event.once(mapRef.current.instance, 'init_stylemap', function () {
                $.ajax({
                    url: gpx.path,
                    dataType: 'xml',
                    success: (res) => {
                        startDataLayer(res);
                    }
                });
            });
        }
    }, [gpx, mapRef.current]);

    return (
        <RenderAfterNavermapsLoaded ncpClientId={NAVER_API_KEY}
                                    error={<p>오류</p>}
                                    loading={<p>Loading</p>}>
            <NaverMap {...mapOptions}
                      id={id || 'map'}
                      style={{
                          width: width || '100%',
                          height: height || '300px'
                      }}
                      defaultCenter={center}
                      center={center}
                      zoom={zoom || 12}
                      naverRef={ref => {
                          mapRef.current = ref;
                      }}>

                {(markers && window.naver) &&
                    markers.map(({lat, lng}) => {
                        const latlng = new window.naver.maps.LatLng(lat, lng);
                        return (
                            <Marker key={latlng}
                                    position={latlng}/>
                        );
                    })
                }
            </NaverMap>
        </RenderAfterNavermapsLoaded>
    );
});

Map.propTypes = {
    mapOptions: PropTypes.object,
    markers: PropTypes.array
};

export default Map;
