import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PetFilter } from '../cmps/PetFilter'
import { PetList } from '../cmps/PetList'
import { loadPets } from '../store/actions/petActions'

class _PetApp extends Component {

    state = {
        pets: [],
        filterBy: null,
        sortBy: null
    }

    componentDidMount() {
        this.loadPets()
    }

    loadPets = () => {
        this.props.loadPets()
    }

    onRemove = () => {
        console.log('delete');
    }

    onEdit = () => {
        console.log('edit');
    }

    render() {
        const { pets, user } = this.props;
        const pet={
            name:"Bobi",
            summary: "Energetic and happy dog",
            imgUrls:["../assets/img/cow.jpg"],
            bDate: 12321312,
            gender: "Male",
            breed: "Golden retreiver",
            size: "Small",
            isInRisk: true,
            shop: {
                fullName: "Freedom Farm",
                imgUrl: "../assets/img/user.jpg",
                rate: 4
              },
              reacts:[{
                type:"love",
                count:4
              },
              {
                type:"food",
                count:10
              }
            ]
        }
        if (!pets) return <h1>Loading...</h1>
        return (
            <div>
                {/* <Filter /> */}

                <PetList  />
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
    loadPets,
    // removePet,
}


export const PetApp = connect(mapStateToProps, mapDispatchToProps)(_PetApp)

