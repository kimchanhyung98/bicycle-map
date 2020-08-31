import React, {Component} from 'react';
import { NaverMap, Marker } from "react-naver-maps";

class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            navermaps: window.naver.maps,
            location: {
                latitude: '37.554722',
                longitude: '126.970833'
            }
        }

        this.handleClick = this.handleClick.bind(this);
        this.startDataLayer = this.startDataLayer.bind(this)
    }

    handleClick(e) {
        if (!this.props.disabled) {
            this.props.handleSetMarker(e.coord.y, e.coord.x);
        }
    }

    startDataLayer(xmlDoc) {
        this.mapRef.instance.data.addGpx(xmlDoc);
    }

    componentDidMount() {
        let self = this;

        if (this.props.gpx) {
            window.naver.maps.Event.once(this.mapRef.instance, 'init_stylemap', function () {
                $.ajax({
                    url: self.props.gpx.path,
                    dataType: 'xml',
                    success: (res) => {
                        self.startDataLayer(res);
                    }
                });
            });
        }
    }

    render() {
        return (
            <NaverMap
                id={ this.props.id || 'map' }
                style={{
                    width: this.props.width || '100%',
                    height: this.props.height || '300px'
                }}
                defaultCenter={ this.props.center || this.state.location }
                center={ this.props.center || this.state.location }
                zoom={ this.props.zoom || 12 }
                onClick={this.handleClick}
                naverRef={ref => {
                    this.mapRef = ref;
                }}>
                { this.props.markers &&
                    this.props.markers.map((marker, index) => {
                        return (
                            <Marker
                                key={`marker${index}`}
                                position={marker} />
                        )
                    })
                }
            </NaverMap>
        );
    }
};

export default Map;
