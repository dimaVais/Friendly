import React from 'react'
import { Input } from '@material-ui/core';

export class Geolocation extends React.Component {

    state = {
        lat: '',
        lng: ''
    }

    componentDidUpdate(prevState){
        if(prevState !== this.state){
            this._input.focus();
            this._input1.focus();
        }
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
        if (data[0]) {
            await this.setState({
                lat: data[0].location.lat,
                lng: data[0].location.lng
            })
        }
    }

    render() {
        const latLng = this.state;
        if (!latLng) return <h1>LOADING...</h1>
        return (
            <div className="flex column align-center">
                <Input type="text" name="locName" placeholder="Your Shop Adress"
                    onChange={(event) => {
                        this.setLocToFind(event);
                        this.props.signupHandleChange(event)
                    }}></Input>
                <Input ref={
                    (el) => this._input = el
                } type="text" name="lat" placeholder="Your Shop lat"
                    value={this.state.lat} onFocus={(event) => { this.props.signupHandleChange(event) }}></Input>
                <Input ref={
                    (el) => this._input1 = el
                } type="text" name="lng" placeholder="Your Shop lng"
                    value={this.state.lng} onFocus={(event) => { this.props.signupHandleChange(event) }}></Input>
            </div>
        )
    }
}