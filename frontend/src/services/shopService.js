import httpService from './httpService.js'
const BASE_URL = 'shop'


export const shopService = {
    getById,
    save,
    remove
}

async function getById(id) {
    const res = await httpService.get(`${BASE_URL}/${id}`);
    return res;
}

async function save(shop) {
    if (shop._id) {
        shop.updatedAt = new Date(date.now()).toLocaleString();
        const res = await httpService.put(`${BASE_URL}/${shop._id}`, shop)
        return res;

    } else {
        shop._id = _makeId();
        shop.createdAt = new Date(date.now()).toLocaleString();
        const res = await httpService.post(`${BASE_URL}`, shop)
        return res;
    }
}

async function remove(shopId) {
    await httpService.delete(`${BASE_URL}/${shopId}`)
}


function _makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}