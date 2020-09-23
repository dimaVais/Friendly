import React from 'react'
import { OutlinedInput } from '@material-ui/core';

export class Geolocation extends React.Component {

    state = {
        lat: 0,
        lng: 0
    }

    setLocToFind = async (ev) => {
        const loc = ev.target.value;
        console.log('find:', loc);
        const res = await this.findLocation(loc, this.getLatLng);
    }

    findLocation = async (loc, cb) => {
        const geocoder = require('google-geocoder');
        const geo = geocoder({
            key: 'AIzaSyDGql0MyVMEQeH89LQj0TtpM66SoLpkAhw'
        });
        geo.find(loc, cb);
    }

    getLatLng = async (err, res) => {
        const data = await res;
        if (data && data.length > 0) {
            await this.setState({
                lat: data[0].location.lat,
                lng: data[0].location.lng
            })
           const latLang = {
                lat:this.state.lat,
                lng:this.state.lng
            }
            this.props.getGeolocation(latLang);
        }
    }

    render() {
        const latLng = this.state;
        if (!latLng) return <h1>LOADING...</h1>
        return (
            <div className="flex column align-center">
                <OutlinedInput type="text" name="locName" placeholder="Your Shop Location"
                    onChange={(event) => {
                        this.setLocToFind(event);
                        this.props.signupHandleChange(event)
                    }}/>
            </div>
        )
    }
}