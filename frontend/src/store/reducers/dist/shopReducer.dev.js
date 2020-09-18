"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shopReducer = shopReducer;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  shops: [],
  currShop: {}
};

function shopReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'LOAD_SHOPS':
      return _objectSpread({}, state, {
        shops: _toConsumableArray(action.shops)
      });

    case 'GET_SHOP':
      console.log('ccc', action.shop);
      return _objectSpread({}, state, {
        currShop: JSON.parse(JSON.stringify(action.shop))
      });

    case 'ADD_SHOP':
      return _objectSpread({}, state, {
        shops: [].concat(_toConsumableArray(state.shops), [action.shopToSave])
      });

    case 'EDIT_SHOP':
      return _objectSpread({}, state, {
        shops: state.shops.map(function (shop) {
          if (shop._id === action.shopToSave._id) shop = action.shopToSave;
        })
      });

    case 'REMOVE_SHOP':
      return _objectSpread({}, state, {
        shops: state.shops.filter(function (shop) {
          return shop._id !== action.shopId;
        })
      });

    default:
      return state;
  }
}