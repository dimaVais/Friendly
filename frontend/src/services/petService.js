import httpService from './httpService.js'
const BASE_URL = 'pet'

export const petService = {
    query,
    getPetById,
    save,
    remove
}

async function query(filterBy) {
    console.log(filterBy);
    let queryStr='';
    //todo - change after building backend
    // if (filterBy){
    //     filterBy.type = filterBy.type.charAt(0).toUpperCase()+filterBy.type.slice(1);
    //     queryStr = '?' + Object.keys(filterBy).map(key => key + '=' + filterBy[key]).join('&');

    // }    
    const res = await httpService.get(`${BASE_URL}${queryStr}`, {
        params: filterBy
    });
    const filtered=filterPets(res,filterBy);
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
        pet._id = _makeId();
        // pet.createdAt = new Date(date.now()).toLocaleString();
        const res = await httpService.post(`${BASE_URL}`, pet)
        return res;
    }
}
async function remove(petId) {
    await httpService.delete(`${BASE_URL}/${petId}`)
}
function filterPets(pets,filterBy){

    console.log('Filter in service:',filterBy);
    if (!filterBy) return pets
    let filteredPets=pets
    if(filterBy.word){
        const searchWord = filterBy.word.toLowerCase()
    
        filteredPets = pets.filter(pet =>{
            if(pet.name.toLowerCase().includes(searchWord) ||
             pet.type.toLowerCase().includes(searchWord)||
             pet.gender.toLowerCase().includes(searchWord)||
             pet.size.toLowerCase().includes(searchWord)||
             pet.summary.toLowerCase().includes(searchWord)||
             pet.description.toLowerCase().includes(searchWord)||
             pet.shop.fullName.toLowerCase().includes(searchWord)) return pet
        })

    }
    
    filteredPets = filteredPets.filter(pet=>{
        
        return pet.type.toLowerCase().includes(filterBy.type)
   })
     filteredPets = filteredPets.filter(pet=>{
        
        return pet.gender.toLowerCase().includes(filterBy.gender)
   })

   
    return filteredPets
}
function _makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}