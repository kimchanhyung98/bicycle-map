import React, {Component} from 'react';
import { NaverMap, Marker } from "react-naver-maps";

class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            navermaps: window.naver.maps
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
                mapDivId={'map'} // default: react-naver-map
                style={{
                  width: this.props.width,
                  height: this.props.height
                }}
                defaultCenter={this.props.center}
                center={this.props.center}
                zoom={ this.props.zoom }
                onClick={this.handleClick}
                naverRef={ref => {
                    this.mapRef = ref;
                }}>
                { this.props.markers.map((marker, index) => {
                    return (
                        <Marker
                            key={`marker${index}`}
                            position={marker} />
                    )
                })}
            </NaverMap>
        );
    }
};

export default Map;
