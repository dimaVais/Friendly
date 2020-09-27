import React, { Component } from 'react'
import { PetFilter } from './PetFilter'
import { FilterSearch } from './FilterSearch'
import { CategoryList } from './CategoryList'
import { Parallax, Background } from 'react-parallax';
export class Hero extends Component {



    render() {
        return (
            <Parallax
            bgImage={require('../assets/img/hero1.jpg')}
            bgImageAlt="the cat"
            strength={800}
            style={{width:"100%"}}
        >
            
            {/* <div style={{ height: '600px' }} /> */}
        
            <div className="hero-container full">
                <div className="hero-content">
                    <h1 className="hero-heading-up"><span className="span">Friendly.</span> Adopt a <span className="span">pet</span> </h1>
                    <h1 className="hero-heading">Discover your next best friend</h1>
                    <FilterSearch parent='hero' />
                    <section className="category-container">
                        <CategoryList />
                    </section>
                </div>
            </div>
            </Parallax>
        )
    }
}
