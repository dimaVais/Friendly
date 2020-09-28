import httpService from './httpService.js'
import {SphericalUtil} from "node-geometry-library";
const BASE_URL = '/pet'

export const petService = {
    query,
    getPetById,
    save,
    remove
}

async function query(filterBy) {
    let queryStr = '';
    //todo - change after building backend
    // if (filterBy){
    //     filterBy.type = filterBy.type.charAt(0).toUpperCase()+filterBy.type.slice(1);
    //     queryStr = '?' + Object.keys(filterBy).map(key => key + '=' + filterBy[key]).join('&');

    // }    
    const res = await httpService.get(`${BASE_URL}${queryStr}`, {
        params: filterBy
    });
    const filtered = filterPets(res, filterBy);
    return filtered;
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
        // pet.createdAt = new Date(date.now()).toLocaleString();
        const res = await httpService.post(`${BASE_URL}`, pet)
        return res;
    }
}
async function remove(petId) {
    await httpService.delete(`${BASE_URL}/${petId}`)
}

function filterPets(pets, filterBy) {
    if (!filterBy) return pets

    let filteredPets = pets
    if (filterBy.txt) {
        filterBy.txt = filterBy.txt.trim(' ');
        filterBy.txt = filterBy.txt.trim(',');

        let words = filterBy.txt.split(' ');
        if (words.length = 1) words = filterBy.txt.split(',');

        words.forEach(word => {
            filteredPets = filteredPets.filter(pet => {
                if (pet.name.toLowerCase().includes(word) ||
                    pet.type.toLowerCase().includes(word) ||
                    pet.gender.toLowerCase().includes(word) ||
                    pet.size.toLowerCase().includes(word) ||
                    pet.summary.toLowerCase().includes(word) ||
                    pet.description.toLowerCase().includes(word) ||
                    pet.shop.fullName.toLowerCase().includes(word)) return pet
            })
        })
    }


    filteredPets = filteredPets.filter(pet => {
        return pet.type.toLowerCase().includes(filterBy.type)
    })


    if (filterBy.distance.range) {
        const userLoc = {lat: filterBy.distance.lat, lng: filterBy.distance.lon};
        filteredPets = filteredPets.filter(pet => {
            const petLoc = {lat:pet.location.lat, lng:pet.location.lng };
            const distanceFromUser = SphericalUtil.computeDistanceBetween(userLoc, petLoc)/1000
            console.log('distanceFromUser',distanceFromUser)
            return  distanceFromUser <= filterBy.distance.range
        })
    }

    return filteredPets
}