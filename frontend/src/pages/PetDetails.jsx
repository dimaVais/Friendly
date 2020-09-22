import React, { Component } from 'react';
import { connect } from 'react-redux';

import { shopService } from '../services/shopService.js';
import { loadPets, savePet, removePet } from '../store/actions/petActions.js';
import { saveOrder } from '../store/actions/orderActions.js';
import { Chat } from '../cmps/Chat.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faBone } from '@fortawesome/free-solid-svg-icons'
import { faHandSparkles } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';



class _PetDetails extends Component {

    state = {
        pet: {},
        isChatOn: false,
        isOwnerOfPet: false,
        currComment: ''
    }

    async componentDidMount() {
        this.getComponentData();
    }

    async getComponentData() {
        await this.getCurrPet();
        await this.getUserId();
        await this.isOwnerOfPet();
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
            this.setState({ isOwnerOfPet: loggedInUser._id === shop.owner._id })
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
        this.props.saveOrder(order)
    }

    onRemovePet = (petId) => {
        console.log('petId', petId);
        // this.props.removePet(petId)
    }


    onToggleChat = () => {
        this.setState({ isChatOn: !this.state.isChatOn })
        console.log(this.state.isChatOn);
    }

    onUpdateReaction = (reaction) => {
        const pet = this.state.pet;
        pet.reacts.map(react => {
            if (react.type === reaction) react.count++
            console.log('reaction clicked', reaction);
            return react
        })
        this.props.savePet(pet)
        this.getCurrPet()
    }

    handleCommentInput = ({ target }) => {
        const value = target.value;
        this.setState({ currComment: value })
    }

    onComment = async () => {
        const pet = this.state.pet;
        const user = this.props.loggedInUser
        const comment = {
            id: `c${100 + pet.comments.length + 1}`,
            txt: this.state.currComment,
            by: {
                id: user._id,
                fullName: user.fullName,
                imgUrl: user.imgUrl
            }
        }

        pet.comments.push(comment);
        await this.props.savePet(pet);
        this.getComponentData();
        this.setState({ cuurComment: '' })
    }

    getUserId = async _ => {
        console.log(this.state.pet);
        const shop = await shopService.getById(this.state.pet.shop._id);
        const ownerId = await shop.owner._id;
        this.setState({ ownerId })
    }

    render() {
        const pet = this.state.pet;

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
                    <div>
                        <ul className="reactions-list">
                            {
                                (pet.reacts) ?
                                    pet.reacts.map(react => {
                                        if (react.type === 'love') {
                                            return <li><FontAwesomeIcon onClick={() => { this.onUpdateReaction('love') }}
                                                className="heart-icon" icon={faHeart} /> ({`${react.count}`})</li>
                                        }
                                        else if ((react.type === 'feed')) return <li><FontAwesomeIcon onClick={() => { this.onUpdateReaction('feed') }}
                                            className="bone-icon" icon={faBone} /> ({`${react.count}`})</li>
                                        else if ((react.type === 'pet')) return <li><FontAwesomeIcon onClick={() => { this.onUpdateReaction('pet') }}
                                            className="hand-sparkles-icon" icon={faHandSparkles} /> ({`${react.count}`})</li>
                                    })
                                    : ''
                            }
                        </ul>
                    </div>
                    <div className="shop_details">
                        {pet.shop && <Link to={`/shop/${pet.shop._id}`}><p><span>{pet.shop.fullName}</span></p></Link>}
                        <button onClick={this.onToggleChat}>Chat</button>
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
                    <div>
                        <h2>{this.state.pet.name}'s comments:</h2>
                        <div>
                            <label htmlFor="">
                                <textarea name="txt" rows="5" cols="50" value={this.state.currComment}
                                    placeholder="Add Comment Here" onChange={this.handleCommentInput}></textarea>
                            </label>
                            <button onClick={this.onComment}>Add</button>
                        </div>
                        <ul className="comment-list">
                            {
                                (pet.comments) ?
                                    pet.comments.map(comment => {
                                        return <li >
                                            <div className="flex column comment-box">
                                                <div className="flex" >
                                                    {(comment.by.imgUrl) ? <img src={comment.by.imgUrl} alt="" /> : ""}
                                                    <p><span>{comment.by.fullName}:</span> </p>
                                                </div>
                                                <p>{comment.txt} </p>
                                            </div>
                                        </li>
                                    })
                                    : ''
                            }
                        </ul>
                    </div>
                </div>
                <div className="actions-box">
                    {
                        this.state.isOwnerOfPet ?
                            <div className="actions-box-edit">
                                <Link to={`/edit/${pet._id}`}><button onClick={this.onGoToEdit} className="edit-btn">Edit Pet</button></Link>
                                <button onClick={() => { this.onRemovePet(pet._id) }} className="remove-btn">Delete Pet</button>
                            </div>
                            :
                            <div className="actions-box-adopt">
                                <h3>Reasons To Adopt</h3>
                                <p>You save a life. </p>
                                <p>You adopt a pet, and find a friend.</p>
                                <p>You help stop cruelty in mass breeding facilities.</p>
                                <button onClick={this.onAdopt} className="adopt-btn">Adopt</button>
                            </div>

                    }


                </div>
                {this.state.isChatOn && <Chat onClose={this.onToggleChat} recipientId={this.state.ownerId} />}
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
    saveOrder,
    removePet

}


export const PetDetails = connect(mapStateToProps, mapDispatchToProps)(_PetDetails)