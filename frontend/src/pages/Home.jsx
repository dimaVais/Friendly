import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CategoryList } from '../cmps/CategoryList'
import { Hero } from '../cmps/Hero'
import { PetList } from '../cmps/PetList'
import { loadPets } from '../store/actions/petActions.js'
import { PetApp } from './PetApp'
import {FilterSearch} from '../cmps/FilterSearch'

class _Home extends Component {

    state = {
        pets: [],
        categories: ['Dogs', 'Cats', 'Farm', 'Other']
    }

    componentDidMount() {
        this.loadPets()
        document.querySelector('.main-nav').style.backgroundColor = 'transparent';
        document.querySelector('.main-nav').style.position = 'fixed';

        
    }
    componentWillUnmount(){
        document.querySelector('.main-nav').style.backgroundColor = 'white';
        document.querySelector('.main-nav').style.position = 'relative';
    }    

    loadPets = () => {
        this.props.loadPets()
    }

    render() {
        const {user} = this.props
        return (
            <div className="main-container">
                {/* <div className="hero-background "></div> */}
                <Hero />
                
                <CategoryList />
                <PetApp pets={this.props.pets} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        pets: state.petReducer.pets,
        user: state.userReducer.loggedInUser
    }
}
const mapDispatchToProps = {
    loadPets
}

export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)