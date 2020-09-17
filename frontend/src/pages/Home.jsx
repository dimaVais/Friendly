import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CategoryList } from '../cmps/CategoryList'
import { Hero } from '../cmps/Hero'
import { PetList } from '../cmps/PetList'
import { loadPets } from '../store/actions/petActions.js'
import { PetApp } from './PetApp'

class _Home extends Component {

    state = {

        pets: [],
        //     pets: [
        //     {
        //         _id: 'p160',
        //         name: 'Bobby',
        //         type: 'Dog',
        //         imgUrl: '',
        //         summary: 'Energetic and happy dog'
        //     },
        //     {
        //         _id: 'p161',
        //         name: 'Johnny',
        //         type: 'Cat',
        //         imgUrl: '',
        //         summary: 'Will kill you in your sleep'
        //     },
        //     {
        //         _id: 'p162',
        //         name: 'Charlie',
        //         type: 'Dog',
        //         imgUrl: '',
        //         summary: 'You will fall in love'
        //     },
        //     {
        //         _id: 'p163',
        //         name: 'Popi',
        //         type: 'Horse',
        //         imgUrl: '',
        //         summary: 'Showing the meaning of haste'
        //     },
        // ],
        categories: ['Dogs', 'Cats', 'Farm', 'Other']
    }

    componentDidMount() {
        this.loadPets()
    }

    loadPets = () => {
        this.props.loadPets()
    }



    render() {

        return (
            <div>
                <Hero />
                <hr />
                <CategoryList />
                <hr />
                <PetApp pets={this.props.pets} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        pets: state.petReducer.pets,
        // user: state.userReducer.loggedInUser
    }
}
const mapDispatchToProps = {
    loadPets
}

export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)