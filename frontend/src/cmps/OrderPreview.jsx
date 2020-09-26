import React, { Component } from 'react'
import { Link } from 'react-router-dom';



export function OrderPreview({ order, onSave, onRemove, isShop }) {

    function orderClass() {
        let orderClass;
        if (order.status === 'accepted') orderClass = 'accepted';
        else if (order.status === 'denied') orderClass = 'denied';
        else orderClass = 'pending';
        return orderClass;
    }



    if (!order) return <h3 style={{ display: 'none' }}>loading...</h3>
    // <img className="order-loading" src={require('../assets/img/loading.gif')} />
    return (
        <div className={`order-preview ${orderClass()}`}>
            {
                isShop && <div className="order-preview-details">
                    <Link to={`/profile/${order.buyer._id}`}>  <p>{order.buyer.fullName} <span>Wants to Adopt</span> {order.pet.name} </p></Link>
                    {/* <p><span>Wants to Adopt</span> {order.pet.name} </p> */}
                </div>

            }

            {!isShop &&
                <div>
                    <Link to={`/shop/${order.shop._id}`}>
                        {<p> <span>Request to adopt </span> {order.pet.name}
                            <span> from:</span> {order.shop.name} {order.shop.type} </p>}
                    </Link>
                </div>
            }

            <div className="order-actions-btns-box">
                {isShop && <button className="accept-order-btn order-btn" onClick={() => { onSave(order, 'accepted') }}>Accept</button>}
                {isShop && <button className="pending-order-btn order-btn" onClick={() => { onSave(order, 'pending') }}>Pending</button>}
                {isShop && <button className="reject-order-btn order-btn" onClick={() => { onSave(order, 'denied') }}>Reject</button>}
                <button className="remove-order-btn order-btn" onClick={() => { onRemove(order._id) }}>Remove</button>
            </div>
        </div >
    )
}