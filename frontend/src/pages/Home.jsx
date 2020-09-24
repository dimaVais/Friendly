import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CategoryList } from '../cmps/CategoryList'
import { Hero } from '../cmps/Hero'
import { PetList } from '../cmps/PetList'
import { loadPets } from '../store/actions/petActions.js'
import { PetApp } from './PetApp'
import {PetFilter} from '../cmps/PetFilter'

class _Home extends Component {

    state = {
        pets: [],
        categories: ['Dogs', 'Cats', 'Farm', 'Other']
    }

    componentDidMount() {
        this.loadPets()       
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
                <PetFilter parent="home"/>
                <br/>
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