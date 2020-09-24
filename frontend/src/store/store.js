import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { petReducer } from './reducers/petReducer';
import { shopReducer } from './reducers/shopReducer';
import { userReducer } from './reducers/userReducer'
import { orderReducer } from './reducers/orderReducer'
import { chatReducer } from './reducers/chatReducer';
// import { reviewReducer } from './reducers/reviewReducer';

const rootReducer = combineReducers({
    petReducer,
    shopReducer,
    userReducer,
    orderReducer,
    chatReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))