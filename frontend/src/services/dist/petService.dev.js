"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.petService = void 0;

var _httpService = _interopRequireDefault(require("./httpService.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BASE_URL = 'pet';
var petService = {
  query: query,
  getPetById: getPetById,
  save: save,
  remove: remove
};
exports.petService = petService;

function query(filterBy) {
  var queryStr, res;
  return regeneratorRuntime.async(function query$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          queryStr = filterBy ? "?name=".concat(filterBy.name, "&type=").concat(filterBy.type) : '';
          _context.next = 3;
          return regeneratorRuntime.awrap(_httpService["default"].get("".concat(BASE_URL).concat(queryStr), {
            params: filterBy
          }));

        case 3:
          res = _context.sent;
          return _context.abrupt("return", res);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}

function getPetById(id) {
  var res;
  return regeneratorRuntime.async(function getPetById$(_context2) {
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

function save(pet) {
  var res, _res;

  return regeneratorRuntime.async(function save$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (!pet._id) {
            _context3.next = 7;
            break;
          }

          _context3.next = 3;
          return regeneratorRuntime.awrap(_httpService["default"].put("".concat(BASE_URL, "/").concat(pet._id), pet));

        case 3:
          res = _context3.sent;
          return _context3.abrupt("return", res);

        case 7:
          pet._id = _makeId(); // pet.createdAt = new Date(date.now()).toLocaleString();

          _context3.next = 10;
          return regeneratorRuntime.awrap(_httpService["default"].post("".concat(BASE_URL), pet));

        case 10:
          _res = _context3.sent;
          return _context3.abrupt("return", _res);

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function remove(petId) {
  return regeneratorRuntime.async(function remove$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(_httpService["default"]["delete"]("".concat(BASE_URL, "/").concat(petId)));

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