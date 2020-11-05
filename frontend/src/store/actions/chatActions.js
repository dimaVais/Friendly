import { chatService } from "../../services/chatService.js"

export function loadChats(filterBy, filterName) {
    return async dispatch => {
        const chats = await chatService.query(filterBy, filterName);
        console.log('Chats were load:',chats);
        dispatch({ type: 'LOAD_CHATS', chats });
    }
}

export function getChatsByUserId(userId) {
    console.log('chatId',userId);
    return async dispatch => {
        try {
            const chat = await chatService.getByUserId(userId);
            dispatch({ type: 'LOAD_CHATS', chat });
        } catch (err) {
            console.log('UserActions: err in loadUsers', err);
        }  
    }
}
export function getChatById(chatId) {
    return async dispatch => {
        try {
            const chat = await chatService.getById(chatId);
            dispatch({ type: 'GET_CHAT', chat });
        } catch (err) {
            console.log('UserActions: err in loadUsers', err);
        }  
    }
}

export function saveChat(chat) {
    return async dispatch => {
        const chatToSave = await chatService.save(chat);
        if (chat._id) dispatch({ type: 'EDIT_CHAT', chatToSave });
        else dispatch({ type: 'ADD_CHAT', chatToSave });
    }
}

export function removeChat(chatId) {
    return async dispatch => {
       await chatService.remove(chatId);
       dispatch({ type: 'REMOVE_CHAT', chatId })
    }
}

export function setFilter(filterBy){
    return dispatch => {
        dispatch({ type: 'SET_FILTER', filterBy })
    }
}

export function toggleChat(chatInfo=null){
    return dispatch => {
        dispatch({ type: 'TOGGLE_CHAT', chatInfo })
    }
}
