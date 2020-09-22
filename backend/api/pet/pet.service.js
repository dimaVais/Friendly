const fs = require('fs')
const dbService = require('../../services/db.service')
const { Logger } = require('mongodb')
const ObjectId = require('mongodb').ObjectId;
const logger = require('../../services/logger.service');


module.exports = {
    query,
    getById,
    save,
    remove
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('pet');
    try {
        const pets = await collection.find(criteria).toArray();
        return pets;
    } catch (err) {
        logger.error(`ERROR: cannot get pet list, err: ${err}`);
        throw err;
    }
  }

async function getById(_id) {
    const collection = await dbService.getCollection('pet');
    try {
        const pet = await collection.findOne({
            "_id": ObjectId(_id)
        });
        return pet;
    } catch (err) {
        logger.error(`ERROR: cannot find pet by id  ${_id}, err: ${err}`);
        throw err;
    }
}

async function remove(_id) {
    const collection = await dbService.getCollection('pet')
    try {
        await collection.deleteOne({"_id": ObjectId(_id)});
        logger.info(`Pet ${_id} was removed well!`);
    } catch (err) {
        logger.error(`ERROR: cannot remove pet ${pet._id}, err: ${err}`)
        throw err;
    }
}

async function save(pet) {
    const collection = await dbService.getCollection('pet');
    if (pet._id) {
        pet._id = ObjectId(pet._id);
        pet.updatedAt = new Date(Date.now()).toISOString();
        try {
            await collection.updateOne({"_id": pet._id}, {$set: pet});
            logger.info(`Pet ${pet._id} was updated well!`);
            return pet;
        } catch (err) {
            logger.error(`ERROR: cannot update pet ${pet._id}, err: ${err}`)
            throw err;
        }
    } else {
        pet.createdAt = new Date(Date.now()).toISOString();
        try {
            await collection.insertOne(pet);
            logger.info(`Pet ${pet._id} was creted well!`);
            return pet;
        } catch (err) {
            logger.error(`ERROR: cannot insert pet ${pet._id} to DB, err: ${err}`)
            throw err;
        }
    }
}


function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.type) {
        criteria.type = filterBy.type
    }

    if (filterBy.type) {
        criteria.type = filterBy.type
    }

    return criteria;
}