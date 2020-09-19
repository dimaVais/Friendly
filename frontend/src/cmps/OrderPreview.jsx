import React, { Component } from 'react'


export function OrderPreview({ order, onSave, onRemove }) {

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
            <p><span>From:</span> {order.buyer.fullName} </p>
            <p><span>I want to Adopt:</span> {order.pet.name} </p>
            <div>
                <p><span>Adoption Request:</span> {order.msg} </p>
            </div>
            <div>
                <button onClick={() => { onSave(order, 'accepted') }}>✔</button>
                <button onClick={() => { onSave(order, 'denied') }}>✖</button>
                <button onClick={() => { onSave(order, 'pending') }}>❓</button>
                <button onClick={() => { onRemove(order._id) }}>🧹</button>
            </div>
        </div>
    )
}