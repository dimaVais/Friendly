
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PetList } from '../cmps/PetList';
import { getShopById } from '../store/actions/shopActions.js';
import { savePet, loadPets } from '../store/actions/petActions.js'

class _ShopDetails extends Component {

    state = {
        shop: {},
        shopPets: []
    }

    async componentDidMount() {
        const shopId = this.props.match.params.id;
        await this.props.loadPets();
        await this.props.getShopById(shopId);
        const shopPets = this.props.pets.filter(pet => { return pet.shop._id === this.state.shop._id })
        await this.setState({
            shop: this.props.getShopById(shopId),
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
        const shop = this.state.currShop;
        return (
            <section>
                {(!shop) ? <h1>LOADING....</h1> :
                    <React.Fragment>
                        <div>
                            <h2><span> Name: </span>{shop.name}</h2>
                            <h3>{shop.title}</h3>
                            <p><span>Owner Full Name: </span>{shop.owner.fullName}</p>
                            <img src={shop.owner.imgUrl} />
                            <p><span>Short Description: </span>{shop.desc}</p>
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