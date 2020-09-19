"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadUsers = loadUsers;
exports.getUserById = getUserById;
exports.removeUser = removeUser;
exports.updateUser = updateUser;
exports.login = login;
exports.signup = signup;
exports.logout = logout;

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

var _userService = _interopRequireDefault(require("../../services/userService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function loadUsers() {
  return function _callee(dispatch) {
    var users;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(_userService["default"].getUsers());

          case 3:
            users = _context.sent;
            dispatch({
              type: 'SET_USERS',
              users: users
            });
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log('UserActions: err in loadUsers', _context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 7]]);
  };
}

function getUserById(id) {
  var user;
  return regeneratorRuntime.async(function getUserById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_userService["default"].getById(id));

        case 2:
          user = _context2.sent;
          return _context2.abrupt("return", user);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function removeUser(userId) {
  return function _callee2(dispatch) {
    return regeneratorRuntime.async(function _callee2$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return regeneratorRuntime.awrap(_userService["default"].remove(userId));

          case 3:
            dispatch({
              type: 'USER_REMOVE',
              userId: userId
            });
            _context3.next = 9;
            break;

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](0);
            console.log('UserActions: err in removeUser', _context3.t0);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 6]]);
  };
}

function updateUser(user) {
  return function _callee3(dispatch) {
    var userToSave;
    return regeneratorRuntime.async(function _callee3$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap(_userService["default"].update(user));

          case 2:
            userToSave = _context4.sent;
            dispatch({
              type: 'UPDATE_USER',
              userToSave: userToSave
            });

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    });
  };
}

function login(userCreds) {
  return function _callee4(dispatch) {
    var user;
    return regeneratorRuntime.async(function _callee4$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return regeneratorRuntime.awrap(_userService["default"].login(userCreds));

          case 2:
            user = _context5.sent;
            dispatch({
              type: 'SET_USER',
              user: user
            });

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    });
  };
}

function signup(userCreds) {
  return function _callee5(dispatch) {
    var user;
    return regeneratorRuntime.async(function _callee5$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return regeneratorRuntime.awrap(_userService["default"].signup(userCreds));

          case 2:
            user = _context6.sent;
            dispatch({
              type: 'SET_USER',
              user: user
            });

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    });
  };
}

function logout() {
  return function _callee6(dispatch) {
    return regeneratorRuntime.async(function _callee6$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return regeneratorRuntime.awrap(_userService["default"].logout());

          case 2:
            dispatch({
              type: 'SET_USER',
              user: null
            });

          case 3:
          case "end":
            return _context7.stop();
        }
      }
    });
  };
}