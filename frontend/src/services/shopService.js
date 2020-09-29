import httpService from './httpService.js'
const BASE_URL = '/shop'


export const shopService = {
    query,
    getById,
    getMiniByUserId,
    getByUserId,
    save,
    remove
}

async function query() {
    const res = await httpService.get(`${BASE_URL}`);
    return res;
}

async function getById(id) {
    const res = await httpService.get(`${BASE_URL}/${id}`);
    return res;
}

function getMiniByUserId(id) {
    return httpService.get(`${BASE_URL}/mini/${id}`);
}

async function getByUserId(id) {
    const res = await httpService.get(`${BASE_URL}/owner/${id}`);
    return res;
}

async function save(shop) {
    if (shop._id) {
        shop.updatedAt = new Date(Date.now()).toLocaleString();
        const res = await httpService.put(`${BASE_URL}/${shop._id}`, shop)
        return res;

    } else {
        shop.createdAt = new Date(Date.now()).toLocaleString();
    }
    shop.pets = [];
    shop.reviews = [];
    const res = await httpService.post(`${BASE_URL}`, shop)
    return res;
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