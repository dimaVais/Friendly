import React, { Component } from 'react';
import { connect } from 'react-redux';
import { OrderList } from '../cmps/OrderList.jsx';
import userService from '../services/userService.js';
import { loadOrders } from '../store/actions/orderActions.js'


export class _userProfile extends Component {


    state ={
        user: null
    }

    async componentDidMount() {
        const userId = this.props.match.params.id
        const user = await userService.getById(userId)
        this.setState({ user: { ...user } });

    }

    getUserOrders = () => {

       const orders = this.props.loadOrders(this.state.user._id, 'buyer._id')
    }

    render() {

        const { user } = this.state
        if (!user) return <h3>Loading...</h3>
        return (
            <div>
                <h1>{user.fullName}</h1>
                <img src={user.imgUrl} alt=""/>
                <h3>My Adoption Requests</h3>
                <OrderList isShop={false} orderFilterName={"buyer._id"} filterById={user._id}/>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        loggedInUser: state.userReducer.loggedInUser,
    }
}

const mapDispatchToProps = {
    loadOrders

}


export const userProfile = connect(mapStateToProps, mapDispatchToProps)(_userProfile)