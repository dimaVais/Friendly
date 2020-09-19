"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadOrders = loadOrders;
exports.saveOrder = saveOrder;
exports.removeOrder = removeOrder;
exports.setFilter = setFilter;

var _orderService = require("../../services/orderService.js");

function loadOrders(filterBy) {
  return function _callee(dispatch) {
    var orders;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(_orderService.orderService.query(filterBy));

          case 2:
            orders = _context.sent;
            console.log('orders', orders);
            dispatch({
              type: 'LOAD_ORDERS',
              orders: orders
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    });
  };
}

function saveOrder(order) {
  return function _callee2(dispatch) {
    var orderToSave;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(_orderService.orderService.save(order));

          case 2:
            orderToSave = _context2.sent;
            if (order._id) dispatch({
              type: 'EDIT_ORDER',
              orderToSave: orderToSave
            });else dispatch({
              type: 'ADD_ORDER',
              orderToSave: orderToSave
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    });
  };
}

function removeOrder(orderId) {
  return function _callee3(dispatch) {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(_orderService.orderService.remove(orderId));

          case 2:
            dispatch({
              type: 'REMOVE_ORDER',
              orderId: orderId
            });

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    });
  };
}

function setFilter(filterBy) {
  return function (dispatch) {
    dispatch({
      type: 'SET_FILTER',
      filterBy: filterBy
    });
  };
}