import React, { Component } from 'react';
import { connect } from 'react-redux';
import { OrderList } from '../cmps/OrderList.jsx';
import { UserData } from '../cmps/UserData.jsx';
import userService from '../services/userService.js';
import { loadOrders } from '../store/actions/orderActions.js'


export class _userProfile extends Component {


    state = {
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
        const { user } = this.state;
        const loggedInUser = this.props.loggedInUser;
        if (!user) return <h3>Loading...</h3>
        return (
            <div className="flex column align-center user-profile "> 
                <UserData user={user} display="grid"/>
                <hr/>
                { user._id === loggedInUser._id &&
                    <div className="user-profile-adoptions flex column">
                        <h2>My Adoption Requests</h2>
                        <OrderList isShop={false} orderFilterName={"buyer._id"} filterById={user._id} />
                    </div>}
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