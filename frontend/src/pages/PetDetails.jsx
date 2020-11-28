import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


import { toggleChat } from '../store/actions/chatActions.js';
import { shopService } from '../services/shopService.js';
import userService from '../services/userService.js';
import { loadPets, savePet, removePet } from '../store/actions/petActions.js';
import { saveOrder } from '../store/actions/orderActions.js';


import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons'
import { faVenusMars } from '@fortawesome/free-solid-svg-icons'
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { TextField } from '@material-ui/core';
import { animateScroll as scroll } from "react-scroll";
import { WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share'
import { AdoptionMsgModal } from '../cmps/AdoptionMsgModal.jsx';


class _PetDetails extends Component {

    state = {
        pet: {},
        isOwnerOfPet: false,
        adoptButton: 'Adopt',
        currComment: '',
        AdoptionModalMsg: false
    }

    async componentDidMount() {
        this.getComponentData();
        scroll.scrollToTop();
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
        this.setState({ AdoptionModalMsg: !this.state.AdoptionModalMsg })
        setTimeout(() => {
            this.setState({ AdoptionModalMsg: !this.state.AdoptionModalMsg })
          }, 1000);
        this.setState({ adoptButton: 'Request Sent' })
    }

    onRemovePet = (petId) => {
        console.log('petId', petId);
        // this.props.removePet(petId)
    }

     onToggleChat = async() => {
        const shop = await shopService.getById(this.state.pet.shop._id);
        await this.props.toggleChat({'userId':shop.owner._id})
    }

    onUpdateReaction = (reaction) => {
        const pet = this.state.pet;
        pet.reacts.map(react => {
            if (react.type === reaction) react.count++
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
            },
        }

        pet.comments.unshift(comment);
        await this.props.savePet(pet);
        this.getComponentData();
        this.setState({ cuurComment: '' })
    }

    getTimeToString = () => {
        var time = new Date();
        var dd = String(time.getDate()).padStart(2, '0');
        var mm = String(time.getMonth() + 1).padStart(2, '0');
        var yyyy = time.getFullYear();

        time = mm + '/' + dd + '/' + yyyy;
        return time
    }

    getUserId = async _ => {
        console.log(this.state.pet);
        const shop = await shopService.getById(this.state.pet.shop._id);
        const ownerId = await shop.owner._id;
        this.setState({ ownerId })
    }

    render() {
        const pet = this.state.pet;
        const loggedInUser = this.props.loggedInUser

        if (!pet) return <h1>Loading...</h1>
        return (
            <section className="pet-details-main-container">
                <div className="pet-details-box">
                    <div className="pet-details-header">
                        <h2 className="pet-details-heading">{pet.name}</h2>
                        <div className="share-box">
                            {/* <h4 className="share-heading">Share {pet.name} With Your Friends</h4> */}
                            <FacebookShareButton
                                url={"http://www.camperstribe.com"}
                                quote={"See this cute pet I saw on Friendly"}
                                hashtag="#Friendly">
                                <FacebookIcon size={30} />
                            </FacebookShareButton>
                            <WhatsappShareButton
                                url={"http://www.camperstribe.com"}
                                quote={"See this cute pet I saw on Friendly"}>
                                <WhatsappIcon size={30} />
                            </WhatsappShareButton>
                            <TwitterShareButton
                                url={"http://www.camperstribe.com"}
                                quote={"See this cute pet I saw on Friendly"}>
                                <TwitterIcon size={30} />
                            </TwitterShareButton>

                        </div>
                    </div>
                    {pet.isAdopted && <div class="ribbon-details ribbon-top"><span>Adopted</span></div>}
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
                                            return <li className="react-count"><FontAwesomeIcon onClick={() => { this.onUpdateReaction('love') }}
                                                className="heart-icon" icon={faHeart} /> {`${react.count}`}</li>
                                        }
                                        // else if ((react.type === 'feed')) return <li><FontAwesomeIcon onClick={() => { this.onUpdateReaction('feed') }}
                                        //     className="bone-icon" icon={faBone} /> ({`${react.count}`})</li>
                                        // else if ((react.type === 'pet')) return <li><FontAwesomeIcon onClick={() => { this.onUpdateReaction('pet') }}
                                        //     className="hand-sparkles-icon" icon={faHandSparkles} /> ({`${react.count}`})</li>
                                    })
                                    : ''
                            }
                        </ul>
                    </div>
                    <div className="shop-and-pet-info">


                        <div className="pet-info">
                            <div className="pet-info-up">
                                <div className="age info-box">
                                    <FontAwesomeIcon className="age-icon info-icon" icon={faCalendarAlt} />

                                    <p><span>Age: </span>
                                        {`${parseFloat((Date.now() - new Date(pet.bDate)) / (1000 * 60 * 60 * 24 * 30 * 12)).toFixed(1)}`}
                                    </p>
                                </div>
                                <div className="size info-box">
                                    <FontAwesomeIcon className="size-icon info-icon" icon={faExpandArrowsAlt} />
                                    <p><span>Size:</span> {pet.size}</p>
                                </div>
                            </div>
                            <div className="pet-info-down ">
                                <FontAwesomeIcon className="gender-icon info-icon" icon={faVenusMars} />
                                <div className="gender info-box">

                                    <p><span>Gender:</span> {pet.gender}</p>
                                </div>
                                <div className="breed info-box">
                                    <FontAwesomeIcon className="breed-icon info-icon" icon={faAlignLeft} />
                                    <p><span>Breed:</span> {pet.breed}</p>
                                </div>
                            </div>
                            {/* <h4> {pet.summary}</h4> */}
                        </div>



                        <div className="shop-details">
                            <div className="shop-details-up">
                                {pet.shop && <img className="shop-img" src={`${pet.shop.imgUrl}`} alt="" />}
                                {pet.shop && <Link to={`/shop/${pet.shop._id}`}><p>{pet.shop.fullName}</p></Link>}
                            </div>
                            <div className="shop-details-bottom">
                                <div className="shop-rate-box">
                                    <FontAwesomeIcon className="star-icon" icon={faStar} />
                                    {pet.shop && <p className="shop-rate-rating">{pet.shop.rate.rating}  </p>}
                                    {pet.shop && <p className="shop-rate-count">({pet.shop.rate.count})  </p>}
                                </div>
                                {pet.shop && !this.state.isOwnerOfPet && <button onClick={this.onToggleChat}>Message {pet.shop.fullName}</button>}
                            </div>
                        </div>
                    </div>
                    <div className="tags-and-adopt-btn-box">

                        <div className="tags-list-box">
                            <ul className="tags-list">
                                {
                                    (pet.tags) ?
                                        pet.tags.map(tag => {
                                            return <li> {tag} </li>
                                        })
                                        : ''
                                }
                            </ul>
                        </div>

                        <button  onClick={this.onAdopt} className={`adoption-btn ${pet.isAdopted ? 'adopted' : 'adopt'}`}>{pet.isAdopted ? 'Already Adopted' : 'Adopt'} </button>
                        {this.state.AdoptionModalMsg && <AdoptionMsgModal />}

                    </div>
                    <hr />
                    <div className="description-box">
                        <p>{pet.description}</p>
                    </div>
                    <hr />
                    <div className="comments-box">
                        <div className="comment-input-box">
                            <TextField autocomplete="off" name="txt" fullWidth="true" value={this.state.currComment} placeholder="Add Comment Here" onChange={this.handleCommentInput} />

                            <button className="add-comment-btn" onClick={this.onComment}>Add</button>
                        </div>
                        <ul className="comment-list">
                            {
                                (pet.comments) ?
                                    pet.comments.map(comment => {
                                        return <li className="single-comment-box">
                                            <div className="flex comment-box">
                                                {(comment.by.imgUrl) ? <img src={comment.by.imgUrl} alt="" /> : ""}

                                                {(comment.by.id === 'guest') ? <img src={"https://images.macrumors.com/t/x_zUFqghBUNBxVUZN_dYoKF3D9g=/1600x0/article-new/2019/04/guest-user-250x250.jpg"} alt="" /> : ""}

                                                <p><span>{comment.by.fullName}: </span> </p>
                                                <p><span>{comment.createdAt}</span> </p>
                                                <p>{comment.txt} </p>
                                            </div>
                                        </li>
                                    })
                                    : ''
                            }
                        </ul>
                    </div>
                </div>
                {/* <div className="actions-box">
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
                                <button onClick={this.onAdopt} className="adopt-btn">{this.state.adoptButton}</button>
                            </div>

                    }


                </div> */}
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
    removePet,
    toggleChat

}


export const PetDetails = connect(mapStateToProps, mapDispatchToProps)(_PetDetails)