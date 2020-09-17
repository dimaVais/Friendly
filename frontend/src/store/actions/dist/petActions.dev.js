"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadPets = loadPets;
exports.savePet = savePet;
exports.removePet = removePet;
exports.setFilter = setFilter;

var _petService = require("../../services/petService.js");

function loadPets(filterBy) {
  return function _callee(dispatch) {
    var pets;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(_petService.petService.query(filterBy));

          case 2:
            pets = _context.sent;
            dispatch({
              type: 'LOAD_PETS',
              pets: pets
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  };
}

function savePet(pet) {
  return function _callee2(dispatch) {
    var petToSave;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(_petService.petService.save(pet));

          case 2:
            petToSave = _context2.sent;
            if (pet._id) dispatch({
              type: 'EDIT_PET',
              petToSave: petToSave
            });else dispatch({
              type: 'ADD_PET',
              petToSave: petToSave
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    });
  };
}

function removePet(petId) {
  return function _callee3(dispatch) {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(_petService.petService.remove(petId));

          case 2:
            dispatch({
              type: 'REMOVE_PET',
              petId: petId
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