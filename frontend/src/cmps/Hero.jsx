import React, { Component } from 'react'
import {PetFilter} from './PetFilter'
export class Hero extends Component {

    state={
        pic:1,
        pics:[1,2,3]
    }

    onToggle=_=>{
        let pic=(this.state.pic===this.state.pics.length)?1:this.state.pic+1;
        this.setState({pic})
    }

    render() {
        return (
            <div className="hero-container">
                <img className="hero-logo" src={require(`../assets/img/logo-with-title.png`)} alt="logo"/>
                <img className="hero-img" src={require(`../assets/img/hero-img${this.state.pic}.jpg`)} alt="hero"/>
                <button onClick={this.onToggle}>O</button>
                <PetFilter parent="hero"/>
            </div>
        )
    }
}
