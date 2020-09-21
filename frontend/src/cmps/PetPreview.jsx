import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMars } from '@fortawesome/free-solid-svg-icons'
import { faVenus } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import React, { Component } from 'react';
import { connect } from 'react-redux';


class _PetPreview extends Component {


    state = {
        pet: {}
    }

    async componentDidMount() {
        this.setState({ pet: { ...this.props.pet } })
    }



    isMale = () => {
        return (this.props.pet.gender === 'Male') ? true : false
    }

    render() {
        const { pet } = this.props
        if (!pet) return <h1>loading...</h1>
        return (
            <NavLink to={`/details/${pet._id}`}>
                <div className="pet-preview">
                    <img src={(pet.imgUrls) ? pet.imgUrls[0] : ''} alt="pet" />
                    <div className="card-description">
                        <div className="card-description-header">
                            <h2 className="pet-name">{pet.name}</h2>
                            {this.isMale() && <FontAwesomeIcon className="pet-gender-male-icon" icon={faMars} />}
                            {!this.isMale() && <FontAwesomeIcon className="pet-gender-female-icon" icon={faVenus} />}
                        </div>
                        <h4>{pet.summary}</h4>
                    </div>
                    <div className="shop-container">
                        {pet.shop && <Link to={`/shop/${pet.shop._id}`}>{pet.shop.fullName}</Link>}
                        {/* {pet.shop && <h4>{pet.shop.fullName}</h4>} */}
                        <div className="shop-rate-box">
                            <FontAwesomeIcon className="star-icon" icon={faStar} />
                            {pet.shop && <p className="shop-rate-rating">{pet.shop.rate.rating}  </p>}
                            {pet.shop && <p className="shop-rate-count">({pet.shop.rate.count})  </p>}
                        </div>
                    </div>

                    {/* <section className="pet-reacts">
                    <ul> 
                    { pet.reactions && pet.reactions.map(reaction ,index => {
                        <li key={index}>
                            <img src={`../assets/img/${reaction.type}`} alt=""/>
                            <span>{reaction.count}</span>
                         </li>
                    })}
                    </ul>
                </section> */}
                    {/* {displayEditButtons()} */}

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


}


export const PetPreview = connect(mapStateToProps, mapDispatchToProps)(_PetPreview)

