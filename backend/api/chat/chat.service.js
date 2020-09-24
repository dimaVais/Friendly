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
    const collection = await dbService.getCollection('chat');
    try {
        const chats = await collection.find(criteria).toArray();
        return chats;
    } catch (err) {
        logger.error(`ERROR: cannot get chat list, err: ${err}`);
        throw err;
    }
  }

async function getById(_id) {
    const collection = await dbService.getCollection('chat');
    try {
        const chat = await collection.findOne({
            "_id": ObjectId(_id)
        });
        return chat;
    } catch (err) {
        logger.error(`ERROR: cannot find chat by id  ${_id}, err: ${err}`);
        throw err;
    }
}

async function remove(_id) {
    const collection = await dbService.getCollection('chat')
    try {
        await collection.deleteOne({"_id": ObjectId(_id)});
        logger.info(`Chat ${_id} was removed well!`);
    } catch (err) {
        logger.error(`ERROR: cannot remove chat ${chat._id}, err: ${err}`)
        throw err;
    }
}

async function save(chat) {
    const collection = await dbService.getCollection('chat');
    if (chat._id) {
        chat._id = ObjectId(chat._id);
        chat.updatedAt = new Date(Date.now()).toISOString();
        try {
            await collection.updateOne({"_id": chat._id}, {$set: chat});
            logger.info(`Chat ${chat._id} was updated well!`);
            return chat;
        } catch (err) {
            logger.error(`ERROR: cannot update chat ${chat._id}, err: ${err}`)
            throw err;
        }
    } else {
        chat.createdAt = new Date(Date.now()).toISOString();
        try {
            await collection.insertOne(chat);
            logger.info(`Chat ${chat._id} was creted well!`);
            return chat;
        } catch (err) {
            logger.error(`ERROR: cannot insert chat ${chat._id} to DB, err: ${err}`)
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