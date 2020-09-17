const initialState = {
    shop: {}
}

export function shopReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_SHOP':
            return {
                ...state,
                shop: {...action.shop}
            }
        case 'ADD_PET':
            return {
                ...state,
                pets: [...state.pets, action.petToSave]
            }
        case 'EDIT_PET':
            return {
                ...state,
                pets: state.pets.map(pet => {
                    if (pet._id === action.petToSave._id) pet = action.petToSave;
                    // return pets;
                })
            }
        case 'REMOVE_PET':
            return {
                ...state,
                pets: state.pets.filter(pet => pet._id !== action.petId)
            }
        case 'SET_FILTER':
            return {
                ...state,
                filterBy: { ...state.filterBy, ...action.filterBy }
            }
        default:
            return state;
    }

}