import { orderService } from "../../services/orderService.js"

export function loadOrders(filterBy, filterName) {
    return async dispatch => {
        const orders = await orderService.query(filterBy, filterName);
        dispatch({ type: 'LOAD_ORDERS', orders });
    }
}

export function saveOrder(order) {
    return async dispatch => {
        const orderToSave = await orderService.save(order);
        if (order._id) dispatch({ type: 'EDIT_ORDER', orderToSave });
        else dispatch({ type: 'ADD_ORDER', orderToSave });
    }
}

export function removeOrder(orderId) {
    return async dispatch => {
       await orderService.remove(orderId);
       dispatch({ type: 'REMOVE_ORDER', orderId })
    }
}

export function setFilter(filterBy){
    return dispatch => {
        dispatch({ type: 'SET_FILTER', filterBy })
    }
}
