"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadShops = loadShops;
exports.getShopById = getShopById;
exports.saveShop = saveShop;
exports.removeShop = removeShop;

var _shopService = require("../../services/shopService.js");

function loadShops() {
  return function _callee(dispatch) {
    var shops;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(_shopService.shopService.query());

          case 2:
            shops = _context.sent;
            dispatch({
              type: 'LOAD_SHOPS',
              shops: shops
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  };
}

function getShopById(shopId) {
  return function _callee2(dispatch) {
    var shop;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(_shopService.shopService.getById(shopId));

          case 2:
            shop = _context2.sent;
            dispatch({
              type: 'GET_SHOP',
              shop: shop
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    });
  };
}

function saveShop(shop) {
  return function _callee3(dispatch) {
    var shopToSave;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(_shopService.shopService.save(shop));

          case 2:
            shopToSave = _context3.sent;
            if (shop._id) dispatch({
              type: 'EDIT_SHOP',
              shopToSave: shopToSave
            });else dispatch({
              type: 'ADD_SHOP',
              shopToSave: shopToSave
            });

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    });
  };
}

function removeShop(shopId) {
  return function _callee4(dispatch) {
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap(_shopService.shopService.remove(shopId));

          case 2:
            dispatch({
              type: 'REMOVE_SHOP',
              shopId: shopId
            });

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    });
  };
}