import React, {memo, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {RenderAfterNavermapsLoaded, NaverMap, Marker} from "react-naver-maps";

const NAVER_API_KEY = env.NCLOUD_CLIENT_ID;

const MapContent = memo(({
    mapOptions,
    markers
}) => {
    const [gpxDoc, setGpxDoc] = useState(null);
    const {id, width, height, center, zoom, gpx} = mapOptions;
    const mapRef = useRef(null);

    useEffect(() => {
        if (gpx && mapRef.current) {
            window.naver.maps.Event.once(mapRef.current.instance, 'init_stylemap', function () {
                $.ajax({
                    url: gpx.path,
                    dataType: 'xml',
                    success: (res) => {
                        setGpxDoc(res);
                    }
                });
            });
        }

        return () => {
            setGpxDoc(null);
        };
    }, [gpx, mapRef.current]);

    useEffect(() => {
        if (mapRef.current && gpxDoc) {
            mapRef.current.instance.data.addGpx(gpxDoc);
        }
    }, [gpxDoc]);

    return (
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
            {markers && markers.map(({lat, lng}) => {
                const latlng = new window.naver.maps.LatLng(lat, lng);
                return (
                    <Marker key={latlng}
                            position={latlng}/>
                );
            })}
        </NaverMap>
    );
});

const Map = ({
    mapOptions,
    ...props
}) => {
    const [markers, setMarkers] = useState(props.markers || []);

    useEffect(() => {
        setMarkers(props.markers);

        return () => {
            setMarkers([]);
        };
    }, [props.markers]);

    return (
        <RenderAfterNavermapsLoaded ncpClientId={NAVER_API_KEY}
                                    error={<p>오류</p>}
                                    loading={<p>Loading</p>}>
            <MapContent mapOptions={mapOptions}
                        markers={markers}/>
        </RenderAfterNavermapsLoaded>
    );
};

Map.propTypes = {
    mapOptions: PropTypes.object,
    markers: PropTypes.array
};

export default Map;
