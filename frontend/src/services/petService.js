import httpService from './httpService.js'
const BASE_URL = 'pet'


export const petService = {
    query,
    getPetById,
    save,
    remove
}

async function query(filterBy) {
    let queryStr='';
    if (filterBy){
        filterBy.type = filterBy.type.charAt(0).toUpperCase()+filterBy.type.slice(1);
        queryStr = '?' + Object.keys(filterBy).map(key => key + '=' + filterBy[key]).join('&');

    }    
    const res = await httpService.get(`${BASE_URL}${queryStr}`, {
        params: filterBy
    });
    
    return res;
}

async function getPetById(id) {
    const res = await httpService.get(`${BASE_URL}/${id}`);
    return res;
}

async function save(pet) {
    if (pet._id) {
        // pet.updatedAt = new Date(date.now()).toLocaleString();
        const res = await httpService.put(`${BASE_URL}/${pet._id}`, pet)
        return res;

    } else {
        pet._id = _makeId();
        // pet.createdAt = new Date(date.now()).toLocaleString();
        const res = await httpService.post(`${BASE_URL}`, pet)
        return res;
    }
}

async function remove(petId) {
    await httpService.delete(`${BASE_URL}/${petId}`)
}


function _makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}