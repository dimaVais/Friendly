const initialState = {
    isChatShown:false,
    currChatInfo:null,
    chats: [],
    currChatId:'',
    filterBy: {}
}

export function chatReducer(state = initialState, action) {
    switch (action.type) {
        case 'TOGGLE_CHAT':
            if (!action.chatInfo){
                return {
                    ...state,
                    isChatShown: false,
                    currChatInfo: {...action.chatInfo}
                }
            }
            return {
                ...state,
                isChatShown: true,
                currChatInfo: {...action.chatInfo}
            }
        case 'LOAD_CHATS':
            return {
                ...state,
                chats: [...action.chats]
            }
        case 'GET_CHAT':
            return {
                ...state,
                chats: [...state.chats,action.chat]
            }
        case 'ADD_CHAT':
            return {
                ...state,
                chats: [...state.chats, action.chatToSave],
            }
        case 'EDIT_CHAT':
            return {
                ...state,
                chats: state.chats.map(chat => {
                    if (chat._id === action.chatToSave._id) return action.chatToSave;
                    return chat;
                }),
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
