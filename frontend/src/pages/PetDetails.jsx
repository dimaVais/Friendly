import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadPets } from '../store/actions/petActions.js'


class _PetDetails extends Component {

    state = {
        pet: {}
    }


    async componentDidMount() {
        await this.props.loadPets();
        const petId = this.props.match.params.id
        const petToShow = this.props.pets.find(pet => pet._id === petId)
        this.setState({ pet: { ...petToShow } });
    }

    render() {
        const pet = this.state.pet;
        return (
            <section>
                <h1>PetDetails</h1>
                <div>
                    <div>
                        <div><h2><span>Name:</span>{pet.name}</h2>
                            <span>⭐</span>
                        </div>
                        <p> {pet.summary}</p>
                        <img src={pet.imgUrls} />
                        <div></div>
                        <p><span>Age:</span>
                            {`${parseFloat((Date.now() - new Date(pet.bDate)) / (1000 * 60 * 60 * 24 * 30 * 12)).toFixed(2)}`}
                        </p>
                        <p><span>Size:</span> {pet.size}</p>
                        <p><span>Gender:</span> {pet.gender}</p>
                        <p><span>Breed:</span> {pet.breed}</p>
                        {console.log('mmm', pet.tags)}
                        <span> Tags:</span>
                        <ul>
                            {
                                (pet.tags) ?
                                    pet.tags.map(tag => {
                                        return <li>{tag}</li>
                                    })
                                    : ''
                            }
                        </ul>
                        <div>
                            <ul>
                                {/* {
                                    (pet.reacts) ?
                                        pet.reacts.map(react => {
                                            if(react)
                                            return <li>{tag}</li>
                                        })
                                        : ''
                                } */}
                            </ul>
                        </div>
                    </div>

                    <p><span>Description:</span> {'\n' + pet.description}</p>
                </div>
                <div></div>
                <div></div>
            </section>
        )
    }
}


const mapStateToProps = state => {
    return {
        pets: state.petReducer.pets
    }
}

const mapDispatchToProps = {
    loadPets
}


export const PetDetails = connect(mapStateToProps, mapDispatchToProps)(_PetDetails)