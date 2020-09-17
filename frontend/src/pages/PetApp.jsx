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
        if (!pets) return <h1>Loading...</h1>
        return (
            <div>
                <PetFilter />

                <PetList pets={pets} onRemove={this.onRemove} onEdit={this.onEdit} user={user} />
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

