import httpService from './httpService.js'
const BASE_URL = '/chat'


export const chatService = {
    query,
    getById,
    getByUserId,
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
async function getByUserId(userId) {    
    const res = await httpService.get(`${BASE_URL}/member/${userId}`);
    return res;
}

async function save(chat) {
    if (chat._id) {
        chat.updatedAt = new Date(Date.now()).toLocaleString();
        const res = await httpService.put(`${BASE_URL}/${chat._id}`, chat)
        return res;

    } else {
        chat.createdAt = new Date(Date.now()).toLocaleString();
        const res = await httpService.post(`${BASE_URL}`, chat)
        return res;
    }
}

async function remove(chatId) {
    await httpService.delete(`${BASE_URL}/${chatId}`)
}


function _makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}
