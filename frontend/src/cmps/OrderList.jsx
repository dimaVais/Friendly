import React, { Component } from 'react';
import { connect } from 'react-redux';
import { OrderPreview } from './OrderPreview'
import { withRouter } from 'react-router-dom'
import {
    loadOrders,
    saveOrder,
    removeOrder,
    setFilter
} from '../store/actions/orderActions';
import { savePet } from '../store/actions/petActions';



class _OrderList extends Component {

    state = {
        msgDivClass: 'hidden'
    }

    componentDidMount() {
        this.props.loadOrders(this.props.filterById, this.props.orderFilterName);
    }

    changePetAdoptionStatus = async (order) => {
        const pet = this.props.pets.find(pet => pet._id === order.pet._id)
        pet.isAdopted = true
        this.props.savePet(pet)
        this.props.history.push('/pet')
    }

    onSave = async (order, status) => {
        const isAcceptedStat = this.props.orders.find(orderCheck => {
            return (orderCheck.status === 'accepted' && orderCheck.pet._id === order.pet._id)
        })

        if (isAcceptedStat && status === 'accepted') {
            this.setState({ msgDivClass: '' })
            setTimeout(() => { this.setState({ msgDivClass: 'hidden' }) }, 1500);
        } else {
            order.status = status;
            await this.props.saveOrder(order);
            this.props.loadOrders(this.props.filterById, this.props.orderFilterName);
            if (status === 'accepted') {
                console.log('is it?');
                this.changePetAdoptionStatus(order)
            }
        }
    }

    onRemove = (id) => {
        this.props.removeOrder(id);
    }

    render() {
        const orders = this.props.orders;
        const inModal = (this.props.inModal)? true : false;
        return (!orders) ? <h1>LOADING...</h1> :
            (
                <div className="order-list flex column" >
                    {/* <h3>Adoption Requests</h3> */}
                    <div className={`doubleAccept ${this.state.msgDivClass}`}>Only one approval please.</div>
                    {orders.map(order =>
                        <OrderPreview isShop={this.props.isShop} order={order} loggedInUser={this.props.loggedInUser}
                        inModal={inModal}  onRemove={this.onRemove} onSave={this.onSave} />)}
                </div>
            )
    }
}

const mapStateToProps = state => {
    return {
        pets: state.petReducer.pets,
        orders: state.orderReducer.orders,
        loggedInUser: state.userReducer.loggedInUser,
    }
}

const mapDispatchToProps = {
    loadOrders,
    saveOrder,
    removeOrder,
    setFilter,
    savePet
}

export const OrderList = withRouter(connect(mapStateToProps, mapDispatchToProps)(_OrderList))
