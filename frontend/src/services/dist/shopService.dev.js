"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shopService = void 0;

var _httpService = _interopRequireDefault(require("./httpService.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BASE_URL = 'shop';
var shopService = {
  getById: getById,
  save: save,
  remove: remove
};
exports.shopService = shopService;

function getById(id) {
  var res;
  return regeneratorRuntime.async(function getById$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_httpService["default"].get("".concat(BASE_URL, "/").concat(id)));

        case 2:
          res = _context.sent;
          return _context.abrupt("return", res);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

function save(shop) {
  var res, _res;

  return regeneratorRuntime.async(function save$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!shop._id) {
            _context2.next = 8;
            break;
          }

          shop.updatedAt = new Date(date.now()).toLocaleString();
          _context2.next = 4;
          return regeneratorRuntime.awrap(_httpService["default"].put("".concat(BASE_URL, "/").concat(shop._id), shop));

        case 4:
          res = _context2.sent;
          return _context2.abrupt("return", res);

        case 8:
          shop._id = _makeId();
          shop.createdAt = new Date(date.now()).toLocaleString();
          _context2.next = 12;
          return regeneratorRuntime.awrap(_httpService["default"].post("".concat(BASE_URL), shop));

        case 12:
          _res = _context2.sent;
          return _context2.abrupt("return", _res);

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function remove(shopId) {
  return regeneratorRuntime.async(function remove$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(_httpService["default"]["delete"]("".concat(BASE_URL, "/").concat(shopId)));

        case 2:
        case "end":
          return _context3.stop();
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