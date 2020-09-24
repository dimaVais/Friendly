const initialState = {
    shops: [],
    currShop: {}
}

export function shopReducer(state = initialState, action) {

    switch (action.type) {
        case 'LOAD_SHOPS':
            return {
                ...state,
                shops: [...action.shops]
            }
        case 'GET_SHOP':
            return {
                ...state,
                currShop: JSON.parse(JSON.stringify(action.shop))
            }
        case 'ADD_SHOP':
            return {
                ...state,
                shops: [...state.shops, action.shopToSave]
            }
        case 'EDIT_SHOP':
            return {
                ...state,
                shops: state.shops.map(shop => {
                    if (shop._id === action.shopToSave._id) return action.shopToSave;
                    return shop;
                })
            }
        case 'REMOVE_SHOP':
            return {
                ...state,
                shops: state.shops.filter(shop => shop._id !== action.shopId)
            }
        default:
            return state;
    }

}