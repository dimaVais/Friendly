const express = require('express');
const router = express.Router();

const {
    getPets,
    getPet,
    createPet,
    updatePet,
    deletePet
} = require('./pet.controller');

const {requireAuth,requireOwner} = require('../../middlewares/requireAuth.middleware');
const petService = require('./pet.service');


router.get('/', getPets);
router.post('/', requireAuth, requireOwner, createPet);
router.get('/:id', getPet); 
router.put('/:id', updatePet);
router.delete('/:id', requireAuth, requireOwner, deletePet);

module.exports = router;