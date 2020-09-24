import { chatService } from "../../services/chatService.js"

export function loadChats(filterBy, filterName) {
    return async dispatch => {
        const chats = await chatService.query(filterBy, filterName);
        dispatch({ type: 'LOAD_CHATS', chats });
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
