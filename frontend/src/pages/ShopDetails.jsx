
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PetList } from '../cmps/PetList';
import { OrderList } from '../cmps/OrderList';
import { OrderListModal } from '../cmps/OrderListModal';
import { getShopById, saveShop } from '../store/actions/shopActions.js';
import { savePet, loadPets } from '../store/actions/petActions.js'
import { GoogleMap } from '../cmps/GoogleMap';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleUp, faEnvelope, faFemale, faMale, faMobileAlt, faStar } from '@fortawesome/free-solid-svg-icons'
import { animateScroll as scroll } from "react-scroll";
import userService from '../services/userService.js';
import { shopService } from '../services/shopService.js';


class _ShopDetails extends Component {

    state = {
        shop: {},
        shopPets: [],
        shopOwner: '',
        isOpenReviews: false,
        isOpenOrders: false,
        currReview: {
            txt: '',
            rate: ''
        }
    }

    async componentDidMount() {
        await this.loadShopData();
        scroll.scrollToTop();
    }

    loadShopData = async () => {
        const shopId = this.props.match.params.id;
        await this.props.loadPets();
        await this.props.getShopById(shopId);
        this.setState({ shop: { ...this.props.currShop } });
        const owner = await userService.getById(this.props.currShop.owner._id);
        console.log('owner from DB', owner);

        await this.setState({ shopOwner: { ...owner } });
        const shopPets = this.props.pets.filter(pet => {
            if (pet.shop) return pet.shop._id === this.state.shop._id

        })
        await this.setState({
            shopPets: [...shopPets]
        })
    }

    onRemove = (id) => {
        this.props.removePet(id)
    }

    onEdit = () => {
        console.log('edit');
    }

    handleInput = ({ target }) => {
        const field = target.name;
        const value = target.value;
        this.setState(prevState => {
            return {
                ...prevState,
                currReview: {
                    ...prevState.currReview,
                    [field]: value
                }
            }
        })
    }

    onAddReview = async (ev) => {
        ev.preventDefault();
        const shop = { ...this.state.shop };
        const review = { ...this.state.currReview };
        review.id = `r${100 + shop.reviews.length + 1}`
        const user = this.props.loggedInUser;
        review.by = {
            _id: user._id,
            fullName: user.fullName,
            imgUrl: user.imgUrl
        }
        shop.reviews.unshift(review);
        await this.props.saveShop(shop);
        this.loadShopData();
    }

    onToggleOrderModal = () => {
        this.setState(
            {
                ...this.state,
                isOpenOrders: !this.state.isOpenOrders
            }
        )
    }

    onToggleReviewModal = () => {
        this.setState(
            {
                ...this.state,
                isOpenReviews: !this.state.isOpenReviews
            }
        )
    }


    drawStars = (rate) => {
        var stars = '';
        for (var i = 0; i < rate; i++) {
            stars = stars + '⭐'
        }
        return stars;
    }

    render() {
        const shop = this.state.shop;
        const owner = this.state.shopOwner;
        const isOrderModal = (this.state.isOpenOrders) ? "" : "hidden";
        const isUserOwner = (Object.keys(this.state.shop).length > 0
            && this.props.loggedInUser._id === this.props.currShop.owner._id)
        // console.log('chats in shop ccc', this.props.loggedInUser.chats);

        return (
            <section>
                {(!shop.owner || !shop.location || !shop.reviews) ? <h1>Loading...</h1> :

                    <div className="shop-details-main-box">
                        <div className="shop-details-header">
                            <h2 className="shop-details-heading">{shop.name}</h2>
                            <div className="shop-rate-box">
                                <FontAwesomeIcon className="star-icon" icon={faStar} />
                                {shop && <p className="shop-rate-rating">{shop.rate.rating}  </p>}
                                {shop && <p className="shop-rate-count">({shop.rate.count})  </p>}

                            </div>
                        </div>

                        <div className="shop-details-img-box">
                            {
                                (shop.imgUrls) ?
                                    shop.imgUrls.map((imgUrl, index) => {
                                        return <img className={`shop-details-img-${index}`} src={imgUrl} />
                                    })
                                    : ''
                            }
                        </div>
                        <div className="top-screen-box">
                            <div className="shop-details-section">
                                <div className="shop-owner-details">
                                <img className="shop-owner-img" src={shop.owner.imgUrl} />
                                <div className="contact-box">
                                    {owner.gender && <FontAwesomeIcon className="contact-icon"
                                        icon={(owner.gender === 'Male') ? faMale : faFemale} />}
                                    <p>{shop.owner.fullName}</p>
                                </div>

                                <div className="contact-box">
                                    <FontAwesomeIcon className="contact-icon" icon={faMobileAlt} />
                                    <p>{shop.owner.contact.phone}</p>
                                </div>

                                <div className="contact-box">
                                    <FontAwesomeIcon className="contact-icon" icon={faEnvelope} />
                                    <p>{shop.owner.contact.email}</p>
                                </div>
                                </div>


                                {this.state.shop.owner._id === this.props.loggedInUser._id && 
                             <div className={`order-list-box`}>
                                 {/* <div className="red-circle"></div> */}
                                <button className="order-modal-button" onClick={this.onToggleOrderModal}>Adoption Requests</button>
                                    <OrderListModal isOpen={isOrderModal} isShop={true} orderFilterName={"shop._id"}
                                        filterById={this.state.shop._id} onToggleOrderModal={this.onToggleOrderModal} />
                            </div>}

                            </div>
                            < div className="shop-description">
                                    <p>{shop.desc}</p>
                                </div>
                            </div>
                        <div className="bottom-screen-box">

                            <div className="reviews-box">
                                <h3>What they say about us</h3>
                                <button className="open-reviews-btn" onClick={this.onToggleReviewModal}>
                                    {(!this.state.isOpenReviews) ? 'Tell Us What You Think' : `Close`}
                                </button>
                                <div className={(this.state.isOpenReviews) ? `review-modal` : `hidden`}>
                                    <form className="review-form">
                                        <div className="flex column">
                                            <TextField
                                                id="standard-textarea"
                                                label="Your Review"
                                                placeholder="Write your review"
                                                multiline
                                                name="txt"
                                                onChange={this.handleInput}
                                            />
                                            <FormControl>
                                                <InputLabel htmlFor="rate">Your rate</InputLabel>
                                                <Select
                                                    native
                                                    onChange={this.handleInput}
                                                    inputProps={{
                                                        name: "rate",
                                                    }}>
                                                    <option aria-label="None" value="" />
                                                    <option value="5">5</option>
                                                    <option value="4">4</option>
                                                    <option value="3">3</option>
                                                    <option value="2">2</option>
                                                    <option value="1">1</option>
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <button className="add-review-btn" onClick={this.onAddReview}>Publish</button>
                                    </form>
                                </div>
                                {(!shop.reviews) ? <h1>Loading Reviews...</h1> :
                                    <ul className="reviews-list">
                                        {shop.reviews.map(review => {
                                            return <li className="review">
                                                <p className="review-text">{review.txt}</p>
                                                <p><span>Rate: </span>{this.drawStars(review.rate)}</p>
                                                <p><span>From: </span>{review.by.fullName}</p>
                                            </li>
                                        }

                                        )}
                                    </ul>}
                            </div>
                            <div className="shop-location-box">

                                <div className="map-container">
                                    <GoogleMap lat={shop.location.lat} lng={shop.location.lng} name={shop.location.name} />
                                </div>
                                <FontAwesomeIcon className="arrow-icon" icon={faAngleDoubleUp} />
                                <div className="shop-location-name">
                                    <h2>We are located at {shop.location.name}</h2>
                                </div>

                            </div>

                        </div>
                        <div className="pets-box" >
                            <h2 className="our-pets-heading">Our Pets</h2>
                            <PetList pets={this.state.shopPets} onRemove={this.onRemove} />
                        </div>
                    </div>

                }
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        currShop: state.shopReducer.currShop,
        pets: state.petReducer.pets,
        loggedInUser: state.userReducer.loggedInUser,
        currChat: state.chatReducer.currChat
    }
}

const mapDispatchToProps = {
    getShopById,
    saveShop,
    loadPets,
    savePet
}

export const ShopDetails = connect(mapStateToProps, mapDispatchToProps)(_ShopDetails);