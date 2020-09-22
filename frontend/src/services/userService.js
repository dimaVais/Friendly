import httpService from './httpService'

export default {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update
}

function getUsers() {
    return httpService.get('user')
}

function getById(userId) {
    return httpService.get(`user/${userId}`)
}
function remove(userId) {
    return httpService.delete(`user/${userId}`)
}

function update(user) {
    return httpService.put(`user/${user._id}`, user)
}

async function login(userCred) {
    // const user = await httpService.post('auth/login', userCred)
    // const user = await httpService.get('user', userCred.username)
    const queryStr =  `?user=Name=${userCred.userName}&password=${userCred.password}`;
    const res = await httpService.get(`user/${queryStr}`, {
        params: userCred
    });
    return res[0]                               
    // return _handleLogin(user)
}
async function signup(user) {
    const queryStr =  `?user=Name=${user.fullName}&password=${user.password}`;
    user._id = _makeId()
    const res = await httpService.post(`user`, user);
    return res[0] 
    // const user = await httpService.post('auth/signup', userCred)
    // return _handleLogin(user)
}
async function logout() {
    await httpService.post('auth/logout');
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