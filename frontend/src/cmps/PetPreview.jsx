import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMars } from '@fortawesome/free-solid-svg-icons'
import { faVenus } from '@fortawesome/free-solid-svg-icons'
import React, { Component } from 'react';
import { connect } from 'react-redux';


class _PetPreview extends Component {


    state = {
        pet: this.props.pet
    }

    // displayEditButtons = () => {
    //     // if (!props.loggedinUser.isAdmin) return <div></div>

    //     return (
    //         <div className="btn-panel">
    //             {/* <button className="btn btn-delete" onClick={() => { this.props.onRemove(pet._id) }}>Delete</button> */}
    //             {/* <Link to={`edit/${pet._id}`} className="btn btn-edit"> */}
    //                 Edit
    //                 </Link>
    //         </div>
    //     )
    // }

    isMale = () => {
        return (this.state.pet.gender === 'Male') ? true : false
    }

    render() {
        const { pet } = this.state

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
                        {pet.shop && <h4>{pet.shop.fullName}</h4>}
                        {pet.shop && <p className="shop-rate">{pet.shop.rate}  </p>}

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

