import React from 'react'
import { OrderList } from './OrderList.jsx';


export function OrderListModal({ isOpen, isShop, orderFilterName, filterById, onToggleOrderModal }) {
    return (
        <div className={`orderlist-modal ${isOpen}`}>
            <h2>My Adoption Requests</h2>
            <OrderList isShop={isShop} orderFilterName={orderFilterName} filterById={filterById} inModal={true} />
            <div className="flex column align-center">
                <button className={"close-modal"} onClick={onToggleOrderModal}>Close</button>
            </div>
        </div>
    )
}
