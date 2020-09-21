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
    const filtered = pets.filter(pet=>{
        let isFit=true;
        let isFitWord=false;
        for(const key in filterBy){
            console.log(filterBy[key]);
            if (!filterBy[key])break
            debugger
            const searchWord=filterBy[key].toLowerCase();
            console.log(key);
            if(key==='word'){
                const wordKeys=['name','shop','type','gender','size','summary','description','tags']
                let isTag=false;
                let isShop=false;
                let isAnyWord=false;
                wordKeys.map(wordKey=>{
                    if (wordKey==='tags'){
                        isTag=ifInArray(searchWord,pet['tags'])
                    }else if ((wordKey==='shop')){
                        isShop= (pet['shop'].name.toLowerCase().includes(searchWord))
                    }else if (pet[wordKey].toLowerCase().includes(searchWord)){
                        isAnyWord=true; 
                        }
                })
            isFitWord=isTag||isShop||isAnyWord;
            console.log(isFit);
            } else if(typeof searchWord==='string' && typeof pet[key]==='string') {
                if (pet[key].toLowerCase().includes(searchWord)){
                    isFit=false;
                    break
                }else{
                    isFit=true;;
                }
            }
        }
        if (isFit && isFitWord)return pet;
    })
    console.log(filtered);
    return filtered
}


function ifInArray(word,array){
    return array.filter(arg => arg.toLowerCase(word));
}

function _makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}