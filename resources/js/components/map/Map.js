import React, {Component} from 'react';
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";

class Map extends Component {
    constructor(props) {
        super(props);

        console.log(this.props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        if (!this.props.disabled) {
            console.log(e.coord.y);
            this.props.handleSetMarker(e.coord.y, e.coord.x);
        }
    }

    render() {
        const NAVER_API_KEY = env.CLIENT_ID;

        return (
            <RenderAfterNavermapsLoaded
                ncpClientId={NAVER_API_KEY}
                error={<p>Maps Load Error</p>}
                loading={<p>Maps Loading...</p>}>
                <NaverMap
                    mapDivId={'map'} // default: react-naver-map
                    style={{
                      width: this.props.width,
                      height: this.props.height
                    }}
                    defaultCenter={this.props.center}
                    center={this.props.center}
                    zoom={ this.props.zoom }
                    onClick={this.handleClick}>

                    { this.props.markers.map((marker, index) => {
                        return (
                            <Marker
                                key={`marker${index}`}
                                position={marker} />
                        )
                    })}
                </NaverMap>
            </RenderAfterNavermapsLoaded>
        );
    }
};

export default Map;
