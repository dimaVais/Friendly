import React from 'react'
import { GoogleApiWrapper, Map, Marker, InfoWindow } from 'google-maps-react';


class _GoogleMap extends React.Component {

    state = {
        lat: 32.0853,
        lng: 34.7818,
        zoom: 16,
        loc: 'Info Window'
    }

    componentDidMount() {
        this.setState(
            {
                lat: this.props.lat,
                lng: this.props.lng,
                zoom: 14,
                loc: this.props.name
            }
        )
    }

    onMarkerClick = (props, marker, event) => {
    }

    onMapClicked = (mapProps, map, ev) => {
        this.setState({ lat: ev.latLng.lat(), lng: ev.latLng.lng() })
    }

    onMapPassLoc = () => {
        this.state({ lat: this.props.lat, lng: this.props.lng })
    }

    render() {
        return (
            <Map className="map" initialCenter={this.state} center={this.state} onClick={this.onMapClicked}
                google={this.props.google} zoom={this.state.zoom} className="map" >

                <Marker position={this.state}
                    name={'Current location'} />

                <InfoWindow position={this.state} visible={true}  >
                    <div>
                        <h4>{this.state.loc}</h4>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export const GoogleMap = GoogleApiWrapper({
    apiKey: ('AIzaSyA7wFxeGayDFtxLfft53sDr7sMu9cj7Vio')
})(_GoogleMap)