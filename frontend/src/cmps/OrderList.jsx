import React, { Component } from 'react';
import { connect } from 'react-redux';
import { OrderPreview } from './OrderPreview'
import {
    loadOrders,
    saveOrder,
    removeOrder,
    setFilter
} from '../store/actions/orderActions';

class _OrderList extends Component {

    state = {
        msgDivClass: 'hidden'
    }

    componentDidMount() {
        this.props.loadOrders(this.props.filterById, this.props.orderFilterName);
    }

    onSave = async (order, status) => {
        const isAcceptedStat = this.props.orders.find(order => { return order.status === 'accepted' })
        if (isAcceptedStat && status === 'accepted') {
            this.setState({ msgDivClass: '' })
            setTimeout(() => { this.setState({ msgDivClass: 'hidden' }) }, 1500);
        } else {
            order.status = status;
            await this.props.saveOrder(order);
            this.props.loadOrders(this.props.filterById ,  this.props.orderFilterName);
        }
    }

    onRemove = (id) => {
        this.props.removeOrder(id);
    }

    render() {
        const orders = this.props.orders;
        return (!orders) ? <h1>LOADING...</h1> :
            (
                <div className="order-list" >
                    
                    <div className={`doubleAccept ${this.state.msgDivClass}`}>Only one approval please.</div>
                    {orders.map(order => <OrderPreview isShop={this.props.isShop} order={order} onRemove={this.onRemove} onSave={this.onSave} />)}
                </div>
            )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orderReducer.orders
    }
}

const mapDispatchToProps = {
    loadOrders,
    saveOrder,
    removeOrder,
    setFilter
}

export const OrderList = connect(mapStateToProps, mapDispatchToProps)(_OrderList)