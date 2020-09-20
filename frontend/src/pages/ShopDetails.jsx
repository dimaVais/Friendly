
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PetList } from '../cmps/PetList';
import { OrderList } from '../cmps/OrderList';
import { getShopById } from '../store/actions/shopActions.js';
import { savePet, loadPets } from '../store/actions/petActions.js'
import { GoogleMap } from '../cmps/GoogleMap';

class _ShopDetails extends Component {

    state = {
        shop: {},
        shopPets: []
    }

    async componentDidMount() {
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

    render() {
        const shop = this.state.shop;
        return (
            <section>
                {(!shop.owner || !shop.location || !shop.reviews) ? <h1>LOADING Shop....</h1> :
                    <React.Fragment>
                        <h1>Profile Page For {shop.name}</h1>
                        <div className="flex column">
                            <div className="data-container flex space-around">
                                <div className="shop-section">
                                    <h2><span> Name: </span>{shop.name}</h2>
                                    <h3>{shop.title}</h3>
                                    <p><span>We are: </span>{shop.type}</p>
                                    <p><span>Owner Full Name: </span>{shop.owner.fullName}</p>
                                    <img src={require(`../assets/img/user.jpg`)} />
                                    <p><span>About Us: </span>{shop.desc}</p>
                                </div>
                                <div className="shop-section">
                                    <h2><span>Our Location: </span>{shop.location.name}</h2>
                                    <div>
                                        <GoogleMap lat={shop.location.lat} lng={shop.location.lng} name={shop.location.name} />
                                    </div>
                                </div>
                                <div  className="shop-section">
                                    <h1>Adoption Requests:</h1>
                                    <OrderList isShop={true} orderFilterName={"shop._id"} filterById={this.state.shop._id}/>
                                </div>
                            </div>
                            <div className="shop-section">
                                <h3>Reviews for {shop.name}:</h3>
                                {(!shop.reviews) ? <h1>LOADING Reviews....</h1> :
                                    <ul>
                                        {shop.reviews.map(review => {
                                            return <li>
                                                <p><span>From: </span>{review.by.fullName}</p>
                                                <p><span>Rate: </span>{review.rate}</p>
                                                <p>{review.txt}</p>
                                            </li>
                                        }

                                        )}
                                    </ul>}
                            </div>
                        </div>
                        <div className="shop-section" >
                            <h2>Our Pet For Adoption:</h2>
                            <PetList pets={this.state.shopPets} onRemove={this.onRemove} />
                        </div>
                    </React.Fragment>}
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        currShop: state.shopReducer.currShop,
        pets: state.petReducer.pets
    }
}

const mapDispatchToProps = {
    getShopById,
    loadPets,
    savePet
}

export const ShopDetails = connect(mapStateToProps, mapDispatchToProps)(_ShopDetails);