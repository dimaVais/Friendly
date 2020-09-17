import { shopService } from "../../services/shop.js"

export function loadShopBYId(shopId) {
    return async dispatch => {
        const shop = await shopService.getById(shopId);
        dispatch({ type: 'GET_SHOP', shops });
    }
}

export function saveShop(shop) {
    return async dispatch => {
        const shopToSave = await shopService.save(shop);
        if (shop._id) dispatch({ type: 'EDIT_SHOP', shopToSave });
        else dispatch({ type: 'ADD_SHOP', shopToSave });
    }
}

export function removeShop(shopId) {
    return async dispatch => {
       await shopService.remove(shopId);
       dispatch({ type: 'REMOVE_SHOP', shopId })
    }
}
