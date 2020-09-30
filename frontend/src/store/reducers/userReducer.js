let localLoggedinUser = {_id: 'guest', fullName: 'guest', isGuest: true};

const initialState = {
    loggedInUser: localLoggedinUser,
    users: []
};

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_USER':
            // console.log('action.user', action.user);
            return {
                ...state, loggedInUser: action.user
            };
        // case 'UPDATE_USER':
        //     return {
        //         ...state,
        //         users: state.users.map(user => {
        //             if (user._id === action.userToSave._id) return action.userToSave;
        //             return user;
        //         })
        //     }
        case 'UPDATE_USER':
            return {
                ...state,
                loggedInUser: action.userToSave
            }
        case 'USER_REMOVE':
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            };
        case 'SET_USERS':
            return {
                ...state, users: action.users
            };
        case 'LOGOUT':
            return {
                ...state, loggedInUser: localLoggedinUser
            };
        default:
            return state;
    }
}