import httpService from './httpService.js'
const BASE_URL = 'pet'

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
<<<<<<< HEAD

function filterPets(pets, filterBy) {
    if (!filterBy) return pets

    let filteredPets = pets
    if (filterBy.txt) {
        filterBy.txt = filterBy.txt.trim(' ');
        filterBy.txt = filterBy.txt.trim(',');

        let words = filterBy.txt.split(' ');
        if (words.length === 1) words = filterBy.txt.split(',');


        words.forEach(word => {
            filteredPets = filteredPets.filter(pet => {
                if (pet.name.toLowerCase().includes(word) ||
                    pet.type.toLowerCase().includes(word) ||
                    pet.gender.toLowerCase().includes(word) ||
                    pet.size.toLowerCase().includes(word) ||
                    pet.summary.toLowerCase().includes(word) ||
                    pet.description.toLowerCase().includes(word) ||
                    pet.shop.fullName.toLowerCase().includes(word)) return pet
=======
function filterPets(pets,filterBy){
    if (!filterBy) return pets

    let filteredPets=pets
    if(filterBy.txt){
        filterBy.txt=filterBy.txt.trim(' ');
        filterBy.txt=filterBy.txt.trim(',');

        let words = filterBy.txt.split(' ');
        if (words.length=1) words=filterBy.txt.split(',');

        words.forEach(word=>{
            filteredPets = filteredPets.filter(pet =>{
                if(pet.name.toLowerCase().includes(word) ||
                 pet.type.toLowerCase().includes(word)||
                 pet.gender.toLowerCase().includes(word)||
                 pet.size.toLowerCase().includes(word)||
                 pet.summary.toLowerCase().includes(word)||
                 pet.description.toLowerCase().includes(word)||
                 pet.shop.fullName.toLowerCase().includes(word)) return pet
>>>>>>> cce4675a6caed8b9579ec7146b66059a73f5407c
            })
        })
    }


    filteredPets = filteredPets.filter(pet => {
        return pet.type.toLowerCase().includes(filterBy.type)
    })


<<<<<<< HEAD
    filteredPets = filteredPets.filter(pet => {
        return pet.gender.toLowerCase().includes(filterBy.gender)
    })
=======
    if (filterBy.distance.range){
        const geocoder = require('google-geocoder');
        const geo = geocoder({
            key: 'AIzaSyDGql0MyVMEQeH89LQj0TtpM66SoLpkAhw'
        });
        const distance=geo.computeDistanceBetween()
        filteredPets = filteredPets.filter(pet=>{
            return pet
            })
    }
>>>>>>> cce4675a6caed8b9579ec7146b66059a73f5407c
    return filteredPets
}

