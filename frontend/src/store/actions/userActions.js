import {
    faFan
} from "@fortawesome/free-solid-svg-icons";
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
export function login(userCreds) {
    return async dispatch => {
        const user = await userService.login(userCreds);
        dispatch({
            type: 'SET_USER',
            user
        });
    };
}
export function signup(userCreds) {
    return async dispatch => {
        const user = await userService.signup(userCreds);
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
            type: 'SET_USER',
            user: null
        });
    };
}