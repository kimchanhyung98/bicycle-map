import React, {Component} from 'react';
import { NaverMap, Marker } from "react-naver-maps";

class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            navermaps: window.naver.maps
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        if (!this.props.disabled) {
            this.props.handleSetMarker(e.coord.y, e.coord.x);
        }
    }

    componentDidMount() {
    /*
        $.ajax({
            url: '/storage/bAxtlNW6hCQ7LlRxG1inoBHO8qB95p2lNi3bFbsc.xml',
            dataType: 'xml',
            success: (res) => {
                console.log('asd');
                console.log(res);
                this.mapRef.instance.data(res);
            }
        });
        axios.get().then(res => {
            console.log('테스트');
            console.log(this.mapRef.instance.data);
            // this.state.navermaps.Data.addGpx(res.data)
            // this.mapRef.instance.data.addGpx(res.data);
            this.mapRef.instance.data('asdasd ');
        }).catch(err => {
            console.log(err);
        })
        */
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
