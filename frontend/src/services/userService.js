import httpService from './httpService'
const BASE_URL_AUTH = '/auth'
const BASE_URL_USER = '/user'

export default {
    login,
    logout,
    signup,
    getUsers,
    getById,
    getMiniById,
    remove,
    update
}

function getUsers() {
    return httpService.get('user')
}

function getById(userId) {
    return httpService.get(`${BASE_URL_USER}/${userId}`)
}

 function getMiniById(userId) {
    return httpService.get(`${BASE_URL_USER}/mini/${userId}`);
}

function remove(userId) {
    return httpService.delete(`${BASE_URL_USER}/${userId}`)
}

function update(user) {
    return httpService.put(`${BASE_URL_USER}/${user._id}`, user)
}

async function login(userCred) {
    const res = await httpService.post(`${BASE_URL_AUTH}/login`, userCred);
    return res;                              
}

async function signup(user) {
    const res = await httpService.post(`user`, user);
    return res[0] 
}

async function logout() {
    await httpService.post(`${BASE_URL_AUTH}/logout`);
    sessionStorage.clear();
}
function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}

function _makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}