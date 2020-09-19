"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = void 0;

var _redux = require("redux");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _petReducer = require("./reducers/petReducer");

var _shopReducer = require("./reducers/shopReducer");

var _userReducer = require("./reducers/userReducer");

var _orderReducer = require("./reducers/orderReducer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var rootReducer = (0, _redux.combineReducers)({
  petReducer: _petReducer.petReducer,
  shopReducer: _shopReducer.shopReducer,
  userReducer: _userReducer.userReducer,
  orderReducer: _orderReducer.orderReducer
});
var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;
var store = (0, _redux.createStore)(rootReducer, composeEnhancers((0, _redux.applyMiddleware)(_reduxThunk["default"])));
exports.store = store;