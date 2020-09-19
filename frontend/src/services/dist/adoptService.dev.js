"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adoptService = void 0;

var _httpService = _interopRequireDefault(require("./httpService.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BASE_URL = 'adopt';
var adoptService = {
  query: query,
  getById: getById,
  save: save,
  remove: remove
};
exports.adoptService = adoptService;

function query(filterBy) {
  var queryStr, res;
  return regeneratorRuntime.async(function query$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!filterBy) {
            _context.next = 6;
            break;
          }

          queryStr = filterBy ? "?name=".concat(filterBy.name) : '';
          _context.next = 4;
          return regeneratorRuntime.awrap(_httpService["default"].get("".concat(BASE_URL).concat(queryStr), {
            params: filterBy
          }));

        case 4:
          res = _context.sent;
          return _context.abrupt("return", res);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}

function getById(id) {
  var res;
  return regeneratorRuntime.async(function getById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_httpService["default"].get("".concat(BASE_URL, "/").concat(id)));

        case 2:
          res = _context2.sent;
          return _context2.abrupt("return", res);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function save(adopt) {
  var res, _res;

  return regeneratorRuntime.async(function save$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (!adopt._id) {
            _context3.next = 8;
            break;
          }

          adopt.updatedAt = new Date(Date.now()).toLocaleString();
          _context3.next = 4;
          return regeneratorRuntime.awrap(_httpService["default"].put("".concat(BASE_URL, "/").concat(adopt._id), adopt));

        case 4:
          res = _context3.sent;
          return _context3.abrupt("return", res);

        case 8:
          adopt._id = _makeId();
          adopt.createdAt = new Date(Date.now()).toLocaleString();
          _context3.next = 12;
          return regeneratorRuntime.awrap(_httpService["default"].post("".concat(BASE_URL), adopt));

        case 12:
          _res = _context3.sent;
          return _context3.abrupt("return", _res);

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function remove(adoptId) {
  return regeneratorRuntime.async(function remove$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(_httpService["default"]["delete"]("".concat(BASE_URL, "/").concat(adoptId)));

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function _makeId() {
  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;
  var txt = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return txt;
}