import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faMars } from '@fortawesome/free-solid-svg-icons'
import { faVenus } from '@fortawesome/free-solid-svg-icons'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadPets, savePet } from '../store/actions/petActions';


class _PetPreview extends Component {

    state={
        pet:{},
        isLiked:false
    }

    async componentDidMount() {
       await this.setState({ pet: { ...this.props.pet } })
    }


    onUpdateReaction = async (ev, reaction) => {
        ev.preventDefault()
        const pet = this.state.pet;
        const updatedReacts=pet.reacts.map(react => {
            if (react.type === reaction){

                react.count+=this.state.isLiked?-1:+1;
                this.setState({...this.state,isLiked:!this.state.isLiked})
            }
            return react
        })
        await this.setState({...pet,reacts:[...updatedReacts]})
        const petToSave = await JSON.parse(JSON.stringify(this.state.pet));
        await this.props.savePet(petToSave);
    }

    render() {
        const {pet} = (Object.keys(this.state.pet).length === 0)? this.props : this.state;
        if (!pet || !pet.reacts) return <h1>loading...</h1>
        return (
            <NavLink to={`/details/${pet._id}`}>
                <div className="pet-preview">
                    <img src={(pet.imgUrls) ? pet.imgUrls[0] : ''} alt="pet" />
                    <div className="card-description">
                        <div className="card-description-header">
                            <h2 className="pet-name">{pet.name}</h2>
                            {(pet.gender === 'Male') && <FontAwesomeIcon className="pet-gender-male-icon" icon={faMars} />}
                            {(pet.gender !== 'Male') && <FontAwesomeIcon className="pet-gender-female-icon" icon={faVenus} />}
                        </div>
                        <h4>{pet.summary}</h4>
                    </div>
                    <div className="shop-container">
                        {pet.shop && <Link to={`/shop/${pet.shop._id}`}>{pet.shop.fullName}</Link>}
                        {/* {pet.shop && <h4>{pet.shop.fullName}</h4>} */}
                        <div className="pet-rate-box">
                            <span>{pet.reacts[0].type === 'love' ? <FontAwesomeIcon onClick={(ev) => { this.onUpdateReaction(ev, 'love') }} className="love-icon" icon={faHeart} /> : ''} </span>
                            {pet.reacts[0].type === 'love' ? <span className="love-count">{pet.reacts[0].count}</span> : ''}


                            {/* <FontAwesomeIcon className="star-icon" icon={faStar} />
                            {pet.shop && <p className="shop-rate-rating">{pet.shop.rate.rating}  </p>}
                            {pet.shop && <p className="shop-rate-count">({pet.shop.rate.count})  </p>} */}
                        </div>
                    </div>


                </div>
            </ NavLink>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = {
    savePet,
    loadPets

}


export const PetPreview = connect(mapStateToProps, mapDispatchToProps)(_PetPreview)

