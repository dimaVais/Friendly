import React, { Component } from 'react'

export class Hero extends Component {



    render() {
        return (
            <div>
                <img style={{width: '500px', height: '300px'}} src={require('../assets/img/hero.jpg')} alt="hero"/>
            </div>
        )
    }
}
