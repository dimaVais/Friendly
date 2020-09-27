import React, { Component } from 'react';
import { connect } from 'react-redux';
import { OrderList } from '../cmps/OrderList.jsx';
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

        const { user } = this.state
        if (!user) return <h3>Loading...</h3>
        return (
            <div className="user-profile-box flex column">
                <h1>{user.fullName}</h1>
                <div className="user-data-box">
                    <img src={user.imgUrl} alt="" />
                    <div className="user-profile-details flex column">
                        {user.phone && <p><span>Phone: </span>{user.phone}</p>}
                        {user.email && <p><span>Email: </span>{user.email}</p>}
                        {user.birthDate && <p><span>Age: </span>
                            {parseInt((Date.now() - new Date(user.birthDate)) / (1000 * 60 * 60 * 24 * 30 * 12))}</p>}
                        {user.familyStatus && <p><span>Family Status: </span>{user.familyStatus}</p>}
                        {user.numberOfKds && <p><span>Number of Kids: </span>{user.numberOfKds}</p>}
                        {user.residence && <p><span>Recidence Type: </span>{user.residence}</p>}
                        {user.petCondition && <p><span>Pet Designated Living conditions: </span>{user.petCondition}</p>}
                        {user.currrenPets && <p><span>Current Pets at home: </span>{user.currrenPets}</p>}
                        {user.prevExperince && <p><span>Previouse experince with animals: </span>{user.prevExperince}</p>}
                    </div>
                </div>
                <div className="user-profile-adoptions flex column">
                    <h2>My Adoption Requests</h2>
                    <OrderList isShop={false} orderFilterName={"buyer._id"} filterById={user._id} />
                </div>
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