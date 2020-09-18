import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { petReducer } from './reducers/petReducer';
import { shopReducer } from './reducers/shopReducer';
import { userReducer } from './reducers/userReducer'
// import { userReducer } from './reducers/userReducer';
// import { reviewReducer } from './reducers/reviewReducer';

const rootReducer = combineReducers({
    petReducer,
    shopReducer,
    userReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))