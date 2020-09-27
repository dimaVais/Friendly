import { petService } from "../../services/petService.js"

export function loadPets(filterBy) {
    return async dispatch => {
        const pets = await petService.query(filterBy);
        dispatch({ type: 'LOAD_PETS', pets });
    }
}

export function savePet(pet) {
    return async dispatch => {
        const petToSave = await petService.save(pet);
        if (pet._id) dispatch({ type: 'EDIT_PET', petToSave });
        else dispatch({ type: 'ADD_PET', petToSave });
    }
}

export function removePet(petId) {
    return async dispatch => {
       await petService.remove(petId);
       dispatch({ type: 'REMOVE_PET', petId })
    }
}

export function setFilter(filterBy){
    return dispatch => {
        dispatch({ type: 'SET_FILTER', filterBy })
    }
}

