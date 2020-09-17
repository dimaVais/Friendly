import React, { Component } from 'react'

export class Hero extends Component {



    render() {
        return (
            <div>
                <img className="hero-img" src={require('../assets/img/hero.jpg')} alt="hero"/>
            </div>
        )
    }
}
