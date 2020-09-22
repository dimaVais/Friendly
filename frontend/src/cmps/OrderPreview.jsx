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
                    <p><span>I want to Adopt:</span> {order.pet.name} </p>
                </div>

            }

            {!isShop &&
                <div>
                    <p><span>To:</span> {order.shop.name} </p>
                    <p> {order.shop.type} </p>
                    <p><span>I want to Adopt:</span> {order.pet.name} </p>
                    <img src={order.shop.imgUrl} alt="shop image" />
                    <span>{order.shop.rate}</span>
                </div>
            }

            <div>
                <p><span>Adoption Request:</span> {order.msg} </p>
            </div>
            <div>
                {isShop && <button onClick={() => { onSave(order, 'accepted') }}>✔</button>}
                {isShop && <button onClick={() => { onSave(order, 'denied') }}>✖</button>}
                {isShop && <button onClick={() => { onSave(order, 'pending') }}>❓</button>}
                <button onClick={() => { onRemove(order._id) }}>🧹</button>
            </div>
        </div>
    )
}