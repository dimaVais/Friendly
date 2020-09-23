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
    if(filterBy.txt){
        if (filterBy.txt.charAt(filterBy.txt.length-1)===' '||',') filterBy.txt = filterBy.txt.substring(0,filterBy.txt.length-1)

        let words = filterBy.txt.split(' ');
        if (words.length=1) words=filterBy.txt.split(',');
        words.forEach(word=>{
            console.log('word is',word);
            // const searchWord = filterBy.txt.toLowerCase()
            filteredPets = filteredPets.filter(pet =>{
                if(pet.name.toLowerCase().includes(word) ||
                 pet.type.toLowerCase().includes(word)||
                 pet.gender.toLowerCase().includes(word)||
                 pet.size.toLowerCase().includes(word)||
                 pet.summary.toLowerCase().includes(word)||
                 pet.description.toLowerCase().includes(word)||
                 pet.shop.fullName.toLowerCase().includes(word)) return pet
            })
        })
    }

    filteredPets = filteredPets.filter(pet=>{
        return pet.type.toLowerCase().includes(filterBy.type)
        })

    filteredPets = filteredPets.filter(pet=>{
        return pet.gender.toLowerCase().includes(filterBy.gender)
        })

    console.log(filteredPets);
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