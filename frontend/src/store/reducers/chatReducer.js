const initialState = {
    chats: [],
    currChat:'',
    filterBy: {}
}

export function chatReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOAD_CHATS':
            return {
                ...state,
                chats: [...action.chats]
            }
        case 'GET_CHAT':
            console.log('chat in reducer after get',action.chat );
            return {
                ...state,
                currChat: {...action.chat}
            }
        case 'ADD_CHAT':
            console.log('IN REDUCER',action.chatToSave);
            return {
                ...state,
                chats: [...state.chats, action.chatToSave],
                currChat:{...action.chatToSave}
            }
        case 'EDIT_CHAT':
            return {
                ...state,
                chats: state.chats.map(chat => {
                    if (chat._id === action.chatToSave._id) return action.chatToSave;
                    return chat;
                }),
                currChat:{...action.chatToSave}
            }
        case 'REMOVE_CHAT':
            return {
                ...state,
                chats: state.chats.filter(chat => chat._id !== action.chatId)
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