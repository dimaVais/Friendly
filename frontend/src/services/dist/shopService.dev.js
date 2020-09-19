"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shopService = void 0;

var _httpService = _interopRequireDefault(require("./httpService.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BASE_URL = 'shop';
var shopService = {
  query: query,
  getById: getById,
  getByUserId: getByUserId,
  save: save,
  remove: remove
};
exports.shopService = shopService;

function query() {
  var res;
  return regeneratorRuntime.async(function query$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_httpService["default"].get("".concat(BASE_URL)));

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

function getByUserId(id) {
  var res;
  return regeneratorRuntime.async(function getByUserId$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(_httpService["default"].get("".concat(BASE_URL, "/owner/").concat(id)));

        case 2:
          res = _context3.sent;
          return _context3.abrupt("return", res);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function save(shop) {
  var _res, res;

  return regeneratorRuntime.async(function save$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (!shop._id) {
            _context4.next = 8;
            break;
          }

          shop.updatedAt = new Date(Date.now()).toLocaleString();
          _context4.next = 4;
          return regeneratorRuntime.awrap(_httpService["default"].put("".concat(BASE_URL, "/").concat(shop._id), shop));

        case 4:
          _res = _context4.sent;
          return _context4.abrupt("return", _res);

        case 8:
          shop._id = _makeId();
          shop.createdAt = new Date(Date.now()).toLocaleString();
          shop.location = {
            name: shop.location,
            lat: parseFloat(shop.lat),
            lng: parseFloat(shop.lng)
          };

        case 11:
          shop.pets = [];
          shop.reviews = [];
          _context4.next = 15;
          return regeneratorRuntime.awrap(_httpService["default"].post("".concat(BASE_URL), shop));

        case 15:
          res = _context4.sent;
          return _context4.abrupt("return", res);

        case 17:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function remove(shopId) {
  return regeneratorRuntime.async(function remove$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(_httpService["default"]["delete"]("".concat(BASE_URL, "/").concat(shopId)));

        case 2:
        case "end":
          return _context5.stop();
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