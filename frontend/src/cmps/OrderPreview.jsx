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

       

    if (!order) return <h3 style={{display: 'none'}}>loading...</h3>
    // <img className="order-loading" src={require('../assets/img/loading.gif')} />
    return (
        <div className={`order-preview ${orderClass()}`}>
            {
                isShop && <div>
                    <Link to={`/profile/${order.buyer._id}`}>  <p><span>From:</span> {order.buyer.fullName} </p></Link>
                    
                    <p><span>I want to Adopt:</span> {order.pet.name} </p>
                </div>

            }

            {!isShop &&
                <div>
                    <p><span>To:</span> {order.shop.name} </p>
                    <p> {order.shop.type} </p>
                    <p><span>Who am I adopting?</span> {order.pet.name} </p>
                    {/* <img src={order.shop.imgUrl} alt="shop image" />
                    <span>{order.shop.rate}</span> */}
                </div>
            }


            <div className="order-actions-btns-box">
                {isShop && <button className="accept-order-btn order-btn" onClick={() => { onSave(order, 'accepted') }}>Accept</button>}
                {isShop && <button className="pending-order-btn order-btn" onClick={() => { onSave(order, 'pending') }}>Pending</button>}
                {isShop && <button className="reject-order-btn order-btn" onClick={() => { onSave(order, 'denied') }}>Reject</button>}
                <button className="remove-order-btn order-btn" onClick={() => { onRemove(order._id) }}>Remove</button>
            </div>
        </div>
    )
}