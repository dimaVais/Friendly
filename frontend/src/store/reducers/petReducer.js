const initialState = {
    pets: [],
    filterBy: {
        type:'',
        gender:'',
        breed:'',
        size:'',
        word:''
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
            console.log('Saved Pet:',action.petToSave._id);
            return {
                ...state,
                pets: state.pets.map(pet => {
                    console.log('Theis is pet:', pet);
                    if (pet._id === action.petToSave._id) return action.petToSave;
                    return pet;
                })
            }
        case 'REMOVE_PET':
            return {
                ...state,
                pets: state.pets.filter(pet => pet._id !== action.petId)
            }
        case 'SET_FILTER':
            console.log(action.filterBy);
            return {
                ...state,
                filterBy: { ...state.filterBy, ...action.filterBy }
            }
        default:
            return state;
    }
}
