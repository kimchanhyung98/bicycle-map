import React, {memo, useCallback, useEffect} from "react";
import PropTypes from "prop-types";
import {RenderAfterNavermapsLoaded, NaverMap, Marker} from "react-naver-maps";

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
    const {id, width, height, center, zoom} = mapOptions;
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
                          width: width || '100%',
                          height: height || '300px'
                      }}
                      defaultCenter={center || location}
                      center={center || location}
                      zoom={zoom || 12}
                      naverRef={ref => {
                          mapRef = ref;
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
