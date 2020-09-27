import userService from "../../services/userService";

export function loadUsers() {
    return async dispatch => {
        try {
            const users = await userService.getUsers();
            dispatch({
                type: 'SET_USERS',
                users
            });
        } catch (err) {
            console.log('UserActions: err in loadUsers', err);
        }
    }
}

export async function getUserById(id) {
    const user = await userService.getById(id);
    return user;
}

export function removeUser(userId) {
    return async dispatch => {
        try {
            await userService.remove(userId);
            dispatch({
                type: 'USER_REMOVE',
                userId
            });
        } catch (err) {
            console.log('UserActions: err in removeUser', err);
        }
    };
}

export function updateUser(user) {
    return async dispatch => {
        const userToSave = await userService.update(user);
        dispatch({
            type: 'UPDATE_USER',
            userToSave
        });
    };
}

export function login(userCreds) {
    return async dispatch => {
        const user = await userService.login(userCreds);
        dispatch({
            type: 'SET_USER',
            user
        });
    };
}
export function signup(_user) {
    return async dispatch => {
        const user = await userService.signup(_user);
        dispatch({
            type: 'SET_USER',
            user
        });
    };
}
export function logout() {
    return async dispatch => {
        await userService.logout();
        dispatch({
            type: 'LOGOUT'
        });
    };
}