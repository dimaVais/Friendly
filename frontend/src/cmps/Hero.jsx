import React, { Component } from 'react'
import { FilterSearch } from './FilterSearch'

// import {PetFilter} from './PetFilter'

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
            <div className="hero-container full">
                <div className="hero-content">
                <h1 className="hero-heading-up"><span className="span">Friendly.</span> Adopt a <span className="span">pet</span> </h1>
                <h1 className="hero-heading">Discover your next four legs friend</h1>
                <FilterSearch/>
                {/* <PetFilter parent="hero"/> */}
                </div>
                
                {/* <img className="hero-img " src={require(`../assets/img/hero1.jpg`)} alt="hero"/> */}
                {/* <img className="hero-logo " src={require(`../assets/img/logo-with-title.png`)} alt="logo"/> */}
                {/* <button onClick={this.onToggle}>O</button> */} 
            </div>
        )
    }
}
