const fs = require('fs')
const dbService = require('../../services/db.service')
const { Logger } = require('mongodb')
const ObjectId = require('mongodb').ObjectId;
const logger = require('../../services/logger.service');


module.exports = {
    query,
    getById,
    getByUserId,
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
    console.log('chatId in service:',_id);
    const collection = await dbService.getCollection('chat');
    try {
        const chat = await collection.findOne({
            "_id": ObjectId(_id)
        });
        console.log('AFTER MONGO');
        return chat;
    } catch (err) {
        logger.error(`ERROR: cannot find chat by id  ${_id}, err: ${err}`);
            
    }
}
async function getByUserId(_id) {
    console.log('chatId in service:',_id);
    const collection = await dbService.getCollection('chat');
    try {
        const chat = await collection.find({
           "members":_id
        });
        
        console.log('AFTER MONGO');
        return chat;
    } catch (err) {
        logger.error(`ERROR: cannot find chat by user id  ${_id}, err: ${err}`);
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
    const userCollection = await dbService.getCollection('user');
    console.log('|||||||||||||saving chat|||||||||||||');
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

            //target user
            const userToUpdate1 =  await userCollection.findOne({"_id":ObjectId(chat.members[1])});
            const userToUpdate2 =  await userCollection.findOne({"_id":ObjectId(chat.members[0])});
            const miniChat={
                _id:ObjectId(chat._id),
                topic :chat.topic
            }
            userToUpdate1.chats.push(miniChat);
            userToUpdate2.chats.push(miniChat);
            userCollection.updateOne({"_id":ObjectId(userToUpdate1._id)},{$set:userToUpdate1})
            userCollection.updateOne({"_id":ObjectId(userToUpdate2._id)},{$set:userToUpdate2})
            console.log('users after update|||||||||||||||||||||||||||');
            console.log(userToUpdate1);
            console.log(userToUpdate2);
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
