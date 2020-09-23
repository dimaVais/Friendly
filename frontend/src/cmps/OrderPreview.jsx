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

    if (!order) return <img className="order-loading" src={require('../assets/img/loading.gif')} />
    return (
        <div className={`order-preview ${orderClass()}`}>
            {
                isShop && <div>
                    <Link to={`/profile/${order.buyer._id}`}>  <p><span>From:</span> {order.buyer.fullName} </p></Link>
                    {/* <div>
                        <p><span>Adoption Request:</span> {order.msg} </p>
                    </div> */}
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


            <div>
                {isShop && <button className="accept-order-btn" onClick={() => { onSave(order, 'accepted') }}>✔</button>}
                {isShop && <button className="reject-order-btn" onClick={() => { onSave(order, 'denied') }}>✖</button>}
                {isShop && <button className="pending-order-btn" onClick={() => { onSave(order, 'pending') }}>❓</button>}
                <button className="remove-order-btn" onClick={() => { onRemove(order._id) }}>🧹</button>
            </div>
        </div>
    )
}