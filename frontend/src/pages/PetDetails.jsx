import React, { Component } from 'react';
import { connect } from 'react-redux';
import { shopService } from '../services/shopService.js';
import { loadPets, savePet } from '../store/actions/petActions.js';
import { saveOrder } from '../store/actions/orderActions.js';
import { Chat } from '../cmps/Chat.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faBone } from '@fortawesome/free-solid-svg-icons'
import { faHandSparkles } from '@fortawesome/free-solid-svg-icons'



class _PetDetails extends Component {

    state = {
        pet: {},
        isChatOn: false
    }

     componentDidMount() {
         this.getCurrPet()

    }

    getCurrPet = async () => {
        await this.props.loadPets();
        const petId = this.props.match.params.id
        const petToShow = this.props.pets.find(pet => pet._id === petId)
        this.setState({ pet: { ...petToShow } });
    } 

    isOwnerOfPet = async () => {
        const { loggedInUser } = this.props
        const pet = this.state.pet
        if (loggedInUser && pet.shop) {
            const shopId = pet.shop._id
            const shop = await shopService.getById(shopId)
            return loggedInUser._id === shop.owner._id
        }
    }

    onAdopt = async () => {
        const { loggedInUser } = this.props
        if (loggedInUser.isGuest) return

        const pet = this.state.pet
        const shopId = pet.shop._id
        const shop = await shopService.getById(shopId)
        const order = {
            msg: "Hi, I saw your lovely pet and really wish to adopt it!",
            buyer: {
                _id: loggedInUser._id,
                fullName: loggedInUser.fullName,
                imgUrl: loggedInUser.imgUrl
            },
            shop: {
                _id: shop._id,
                name: shop.name,
                type: shop.type,
                imgUrl: shop.imgUrl
            },
            pet: {
                _id: pet._id,
                name: pet.name,
            },
            status: "Pending",
        }
        console.log('order', order);
        this.props.saveOrder(order)
    }

    onToggleChat = () => {
        this.setState({ isChatOn: !this.state.isChatOn })
        console.log(this.state.isChatOn);
    }

    onUpdateReaction = (reaction) => {
        const pet = this.state.pet;
        pet.reacts.map(react => {
            if (react.type === reaction) react.count++
            console.log('reaction clicked' , reaction);
            return react
        })
        this.props.savePet(pet)
        this.getCurrPet()
    }
    
    render() {
        const pet = this.state.pet;
        let { loggedInUser } = this.props
        if (!pet) return <h1>Loading...</h1>
        return (
            <section className="pet-details-main-container">
                <div className="pet-details-box">
                    <div>
                        <h2 className="pet-details-heading">{pet.name}</h2>
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
                    <hr />
                    <div>
                        <ul>
                            {
                                (pet.reacts) ?
                                    pet.reacts.map(react => {
                                        if (react.type === 'love') {
                                            return <li><FontAwesomeIcon onClick={()=>{this.onUpdateReaction('love')}} className="heart-icon" icon={faHeart} /> ({`${react.count}`})</li>
                                        }
                                        else if ((react.type === 'feed')) return <li><FontAwesomeIcon onClick={()=>{this.onUpdateReaction('feed')}} className="bone-icon" icon={faBone} /> ({`${react.count}`})</li>
                                        else if ((react.type === 'pet')) return <li><FontAwesomeIcon onClick={()=>{this.onUpdateReaction('pet')}} className="hand-sparkles-icon" icon={faHandSparkles} /> ({`${react.count}`})</li>
                                    })
                                    : ''
                            }
                        </ul>
                    </div>
                    <div className="shop_details">
                    {pet.shop && <p><span>{pet.shop.fullName}</span><button onClick={this.onToggleChat} >Chat</button></p>}
                    </div>
                    <p><span>Age: </span>
                        {`${parseFloat((Date.now() - new Date(pet.bDate)) / (1000 * 60 * 60 * 24 * 30 * 12)).toFixed(1)}`}
                    </p>
                    <p><span>Size:</span> {pet.size}</p>
                    <p><span>Gender:</span> {pet.gender}</p>
                    <p><span>Breed:</span> {pet.breed}</p>
                    <hr />
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


                    <p><span>Description:</span> {'\n' + pet.description}</p>
                </div>
                <div className="actions-box">
                    <h3>Reasons To Adopt</h3>
                    <p>You save a life. </p>
                    <p>You adopt a pet, and find a friend.</p>
                    <p>You help stop cruelty in mass breeding facilities.</p>
                    <button onClick={this.onAdopt} className="adopt-btn">Adopt</button>
                </div>
                {this.state.isChatOn  && <Chat onClose={this.onToggleChat} shopOwnerId={pet.shop._id} />}
            </section>
        )
    }
}


const mapStateToProps = state => {
    return {
        pets: state.petReducer.pets,
        loggedInUser: state.userReducer.loggedInUser,
    }
}

const mapDispatchToProps = {
    loadPets,
    savePet,
    saveOrder

}


export const PetDetails = connect(mapStateToProps, mapDispatchToProps)(_PetDetails)