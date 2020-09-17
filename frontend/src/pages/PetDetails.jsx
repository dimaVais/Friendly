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
            <section className="pet-details">
                <div>
                    <h2 className="pet-details-heading">{pet.name}</h2>
                    {/* like icon */}
                    {/* <span>⭐⭐⭐</span> */}
                </div>
                <h4> {pet.summary}</h4>
                <div className="pet-details-img-box">
                    {
                        (pet.imgUrls) ?
                            pet.imgUrls.map((imgUrl, index) => {
                                return <img className={`pet-details-img-${index}`} src={imgUrl} />
                            })
                            : ''
                    }
                </div>
                <hr/>
                <p><span>Age: </span>
                    {`${parseFloat((Date.now() - new Date(pet.bDate)) / (1000 * 60 * 60 * 24 * 30 * 12)).toFixed(1)}`}
                </p>
                <p><span>Size:</span> {pet.size}</p>
                <p><span>Gender:</span> {pet.gender}</p>
                <p><span>Breed:</span> {pet.breed}</p>
                <hr/>
                {/* <span> About {pet.name}</span> */}
                <ul className="tags-list">
                    {
                        (pet.tags) ?
                            pet.tags.map(tag => {
                                return <li> {tag} </li>
                            })
                            : ''
                    }
                </ul>
                <div>
                    <ul>
                        {
                            (pet.reacts) ?
                                pet.reacts.map(react => {
                                    var icon;
                                    if (react.type === 'love') icon = '❤️';
                                    else if ((react.type === 'pet')) icon = '🐶';
                                    return <li>{`${icon} ${react.count}`}</li>
                                })
                                : ''
                        }
                    </ul>
                </div>

                <p><span>Description:</span> {'\n' + pet.description}</p>
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