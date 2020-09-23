const initialState = {
    orders: [],
    filterBy: {
        shop:''
    }
}

export function orderReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOAD_ORDERS':
            return {
                ...state,
                orders: [...action.orders]
            }
        case 'ADD_ORDER':
            return {
                ...state,
                orders: [...state.orders, action.orderToSave]
            }
        case 'EDIT_ORDER':
            return {
                ...state,
                orders: state.orders.map(order => {
                    if (order._id === action.orderToSave._id) return action.orderToSave;
                    return order;
                })
            }
        case 'REMOVE_ORDER':
            return {
                ...state,
                orders: state.orders.filter(order => order._id !== action.orderId)
            }
        case 'SET_FILTER':
            return {
                ...state,
                filterBy: { ...state.filterBy, ...action.filterBy }
            }
        default:
            return state;
    }
}
