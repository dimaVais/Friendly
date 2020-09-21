
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PetList } from '../cmps/PetList';
import { OrderList } from '../cmps/OrderList';
import { getShopById, saveShop } from '../store/actions/shopActions.js';
import { savePet, loadPets } from '../store/actions/petActions.js'
import { GoogleMap } from '../cmps/GoogleMap';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';

class _ShopDetails extends Component {

    state = {
        shop: {},
        shopPets: [],
        isOpenReviews: false,
        currReview: {
            txt: '',
            rate: ''
        }
    }

    componentDidMount() {
        this.loadShopData();
    }

    loadShopData = async () => {
        const shopId = this.props.match.params.id;
        await this.props.loadPets();
        await this.props.getShopById(shopId);
        this.setState({ shop: { ...this.props.currShop } });
        const shopPets = this.props.pets.filter(pet => {
            if (pet.shop) return pet.shop._id === this.state.shop._id

        })
        this.setState({
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

    onAddReview = async () => {
        const shop = { ...this.state.shop };
        const review = { ...this.state.currReview };
        review.id = `r${100 + shop.reviews.length + 1}`
        const user = this.props.loggedInUser;
        review.by = {
            _id: user._id,
            fullName: user.fullName,
            imgUrl: user.imgUrl
        }
        console.log('review', review);
        shop.reviews.push(review);
        await this.props.saveShop(shop);
        this.loadShopData();
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
        return (
            <section className="below-nav">
                {(!shop.owner || !shop.location || !shop.reviews) ? <h1>LOADING Shop....</h1> :


                    <div className="shop-details-main-box">
                        <div className="top-screen-box">
                            <div className="shop-details-section">
                                <h2>{shop.name}</h2>
                                <h3>{shop.title}</h3>
                                <p><span>Owner Name </span>{shop.owner.fullName}</p>
                                <img className="shop-owner-img" src={shop.owner.imgUrl} />
                                <p><span>Short Description: </span>{shop.desc}</p>

                            </div>
                            <div className="shop-location-box">
                                <h2><span>We are located in </span>{shop.location.name}</h2>
                                <div className="map-container">
                                    <GoogleMap lat={shop.location.lat} lng={shop.location.lng} name={shop.location.name} />
                                </div>
                            </div>
                            <div className="order-list-box">
                                <OrderList isShop={true} orderFilterName={"shop._id"} filterById={this.state.shop._id} />
                            </div>
                        </div>
                        <div className="flex">
                            <div className="reviews-box">
                                <h3>What they say about us</h3>
                                <button onClick={this.onToggleReviewModal}>
                                    {(!this.state.isOpenReviews) ? 'Tell Us What You Think' : `Close review form`}
                                </button>
                                <div className={(this.state.isOpenReviews) ? `review-modal` : `hidden`}>
                                    <form className="review-form">
                                        <div className="flex column">
                                            <TextField
                                                id="standard-textarea"
                                                label="Shelter/Owner Review:"
                                                placeholder="write your review:"
                                                multiline
                                                name="txt"
                                                onChange={this.handleInput}
                                            />
                                            <FormControl>
                                                <InputLabel htmlFor="rate">Please add your rate:</InputLabel>
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
                                        <button onClick={this.onAddReview}>Publish</button>
                                    </form>
                                </div>
                                {(!shop.reviews) ? <h1>LOADING Reviews....</h1> :
                                    <ul>
                                        {shop.reviews.map(review => {
                                            return <li className="review">
                                                <p><span>From: </span>{review.by.fullName}</p>
                                                <p><span>Rate: </span>{this.drawStars(review.rate)}</p>
                                                <p>{review.txt}</p>
                                            </li>
                                        }

                                        )}
                                    </ul>}
                            </div>

                        </div>
                        <div className="pets-box" >
                            <h2>Our Pets</h2>
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
    }
}

const mapDispatchToProps = {
    getShopById,
    saveShop,
    loadPets,
    savePet
}

export const ShopDetails = connect(mapStateToProps, mapDispatchToProps)(_ShopDetails);