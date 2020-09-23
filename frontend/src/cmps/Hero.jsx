import React, { Component } from 'react'
import { PetFilter } from './PetFilter'
import {FilterSearch} from './FilterSearch'
export class Hero extends Component {

   

    render() {
        return (
            <div className="hero-container full">
                <div className="hero-content">
                    <h1 className="hero-heading-up"><span className="span">Friendly.</span> Adopt a <span className="span">pet</span> </h1>
                    <h1 className="hero-heading">Discover your next best friend</h1>
                    <FilterSearch />
                </div>
            </div>
        )
    }
}
