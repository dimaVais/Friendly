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
    const collection = await dbService.getCollection('order');
    try {
        const orders = await collection.find(criteria).toArray();
        return orders;
    } catch (err) {
        logger.error(`ERROR: cannot get order list, err: ${err}`);
        throw err;
    }
  }

async function getById(_id) {
    const collection = await dbService.getCollection('order');
    try {
        const order = await collection.findOne({
            "_id": ObjectId(_id)
        });
        return order;
    } catch (err) {
        logger.error(`ERROR: cannot find order by id  ${_id}, err: ${err}`);
        throw err;
    }
}

async function remove(_id) {
    const collection = await dbService.getCollection('order')
    try {
        await collection.deleteOne({"_id": ObjectId(_id)});
        logger.info(`Order ${_id} was removed well!`);
    } catch (err) {
        logger.error(`ERROR: cannot remove order ${order._id}, err: ${err}`)
        throw err;
    }
}

async function save(order) {
    const collection = await dbService.getCollection('order');
    if (order._id) {
        order._id = ObjectId(order._id);
        order.updatedAt = new Date(Date.now()).toISOString();
        try {
            await collection.updateOne({"_id": order._id}, {$set: order});
            logger.info(`Order ${order._id} was updated well!`);
            return order;
        } catch (err) {
            logger.error(`ERROR: cannot update order ${order._id}, err: ${err}`)
            throw err;
        }
    } else {
        order.createdAt = new Date(Date.now()).toISOString();
        try {
            await collection.insertOne(order);
            logger.info(`Order ${order._id} was creted well!`);
            return order;
        } catch (err) {
            logger.error(`ERROR: cannot insert order ${order._id} to DB, err: ${err}`)
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