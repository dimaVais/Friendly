const initialState = {
    pets: [],
    filterBy: {
        type:'',
        gender:'',
        breed:'',
        size:'',
        isInRisk:'',
        bDate:''
    }
}

export function petReducer(state = initialState, action) {

    switch (action.type) {
        case 'LOAD_PETS':
            return {
                ...state,
                pets: [...action.pets]
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
