import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Hero } from '../cmps/Hero'
import { loadPets } from '../store/actions/petActions.js'
import { About } from '../cmps/About'

class _Home extends Component {

    state = {
        pets: [],
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
            <div>

                <Hero />
                <About />
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