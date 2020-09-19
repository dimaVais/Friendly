import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { LoginModal } from './LoginModal'
import { connect } from 'react-redux';
import { loadShops } from '../store/actions/shopActions'


export class _NavBar extends Component {

    state = {
        showModal: false,
        shopId: ''
    }

    onNavBarClick = () => {
        this.setState({ showModal: !this.state.showModal });
    }

    componentDidUpdate = async (prevProps) => {
        console.log('prevProps', prevProps);
        if (this.props.user && prevProps.user._id !== this.props.user._id) {
         await this.props.loadShops()
        const shops = this.props.shops
        if (this.props.user) {
         const { user } = this.props
        const userId = user._id
        const userShop = shops.find(shop => shop.owner._id === userId)
        if (userShop) this.setState({shopId: userShop._id}) 
         }  
        } 
    }



    render() {
        const { user } = this.props
        // const shopId = this.getShopId()
        
        return (
            <div>
                <NavLink to="/">Logo</NavLink>
                <NavLink to="/pet">Gallery</NavLink>
                <NavLink to="/about">About Us</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
                {user && user.isOwner && this.state.shopId && <NavLink to={`/shop/${this.state.shopId}`}>My Shop </NavLink>}
                {user && !user.isOwner && !user.isGuest && <NavLink to={`/profile/${user._id}`}>My Profle</NavLink>}
                <button onClick={() => { this.onNavBarClick() }}>Login</button>
                {this.state.showModal && <LoginModal onNavBarClick={this.onNavBarClick} />}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.loggedInUser,
        shops: state.shopReducer.shops

    };
};

const mapDispatchToProps = {
    loadShops
}


export const NavBar = connect(mapStateToProps, mapDispatchToProps)(_NavBar)
