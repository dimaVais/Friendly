import { shopService } from "../../services/shopService.js"

export function loadShops() {
    return async dispatch => {
        const shops = await shopService.query();
        dispatch({ type: 'LOAD_SHOPS', shops });
    }
}

export function getShopById(shopId) {
    return async dispatch => {
        const shop = await shopService.getById(shopId);
        dispatch({ type: 'GET_SHOP', shop });
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
