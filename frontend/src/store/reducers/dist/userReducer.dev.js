"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userReducer = userReducer;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var localLoggedinUser = {
  _id: 'guest',
  fullName: 'guest',
  isGuest: true
};
var initialState = {
  loggedInUser: localLoggedinUser,
  users: []
};

function userReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case 'SET_USER':
      console.log('action.user', action.user);
      return _objectSpread({}, state, {
        loggedInUser: action.user
      });

    case 'UPDATE_USER':
      return _objectSpread({}, state, {
        users: state.users.map(function (user) {
          if (user._id === action.userToSave._id) user = action.userToSave;
        })
      });

    case 'USER_REMOVE':
      return _objectSpread({}, state, {
        users: state.users.filter(function (user) {
          return user._id !== action.userId;
        })
      });

    case 'SET_USERS':
      return _objectSpread({}, state, {
        users: action.users
      });

    default:
      return state;
  }
}