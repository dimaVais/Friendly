import httpService from './httpService.js'
const BASE_URL = '/order'


export const orderService = {
    query,
    getById,
    save,
    remove
}

async function query(filterBy={}, filterName) {
    if (filterBy) {
        const queryStr = (filterBy) ? `?${filterName}=${filterBy}` : '';
        const res = await httpService.get(`${BASE_URL}${queryStr}`, {
            params: filterBy
        });
        return res;
    }
}

async function getById(id) {
    const res = await httpService.get(`${BASE_URL}/${id}`);
    return res;
}

async function save(order) {
    console.log('order', order);
    if (order._id) {

        order.updatedAt = new Date(Date.now()).toLocaleString();
        const res = await httpService.put(`${BASE_URL}/${order._id}`, order)
        return res;

    } else {
        order.createdAt = new Date(Date.now()).toLocaleString();
        const res = await httpService.post(`${BASE_URL}`, order)
        return res;
    }
}

async function remove(orderId) {
    await httpService.delete(`${BASE_URL}/${orderId}`)
}


function _makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}
