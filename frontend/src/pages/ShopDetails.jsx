
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PetList } from '../cmps/PetList';
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
        console.log(this.props.currShop);
        await this.setState({ shop: { ...this.props.currShop } });
        //    const shopPets = this.props.pets.filter(pet => { return pet.shop._id === this.state.shop._id })
        //     await this.setState({
        //         shopPets: [...shopPets]
        //     }) 
    }

    onRemove = (id) => {
        this.props.removePet(id)
    }

    onEdit = () => {
        console.log('edit');
    }

    render() {
        const shop = this.state.shop;
        console.log('ppp', shop);
        console.log('ppp', shop.owner);
        return (
            <section>
                {(!shop.owner || !shop.location || !shop.reviews) ? <h1>LOADING Shop....</h1> :
                    <React.Fragment>
                        <div className='data-container flex space-around'>
                            <div>
                                <h2><span> Name: </span>{shop.name}</h2>
                                <h3>{shop.title}</h3>
                                <p><span>Owner Full Name: </span>{shop.owner.fullName}</p>
                                <img src={require(`../assets/img/user.jpg`)} />
                                <p><span>Short Description: </span>{shop.desc}</p>
                            </div>
                            <div>
                                <h2><span>Our Location: </span>{shop.location.name}</h2>
                                <GoogleMap lat={shop.location.lat} lng={shop.location.lng} name={shop.location.name} />
                            </div>
                        </div>

                        <div>
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