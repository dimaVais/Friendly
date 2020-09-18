import React, { Component } from 'react'

export class Hero extends Component {



    render() {
        return (
            <div className="hero-container">
                <img className="hero-img" src={require('../assets/img/hero.jpg')} alt="hero"/>
                <img className="hero-logo" src={require('../assets/img/logo.png')} alt="logo"/>
            </div>
        )
    }
}
