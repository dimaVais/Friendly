const petService = require('./pet.service');
const logger = require('../../services/logger.service');


module.exports = {
    getPets,
    getPet,
    createPet,
    updatePet,
    deletePet
}

async function getPets(req, res) {
    const filterBy = req.query;
    const pets = await petService.query(filterBy);
    return res.json(pets);
}

async function getPet (req, res) {
    const petId = req.params.id;
    const pet = await petService.getById(petId)
    return pet;
}

async function createPet(req, res) {
    const pet = req.body;
    const savedPet = await petService.save(pet);
    return res.json(savedPet);
}

async function updatePet(req, res) {
    const pet = req.body;
    const savedPet = await petService.save(pet);
    return res.json(savedPet);
}

async function deletePet(req, res) {
    const petId = req.params.id;
    await petService.remove(petId);
    res.end('Pet Deleted Well!');
}