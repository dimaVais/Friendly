const fs = require('fs')
const dbService = require('../../services/db.service')
const { Logger } = require('mongodb')
const ObjectId = require('mongodb').ObjectId;
const logger = require('../../services/logger.service');


module.exports = {
    query,
    getById,
    getMiniById,
    getShopByUser,
    save,
    remove
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('shop');
    try {
        const shops = await collection.find(criteria).toArray();
        return shops;
    } catch (err) {
        logger.error(`ERROR: cannot get shop list, err: ${err}`);
        throw err;
    }
  }

async function getById(_id) {
    const collection = await dbService.getCollection('shop');
    try {
        const shop = await collection.findOne({
            "_id": ObjectId(_id)
        });
        return shop;
    } catch (err) {
        logger.error(`ERROR: cannot find shop by id  ${_id}, err: ${err}`);
        throw err;
    }
}

async function getMiniById(_id) {
    const collection = await dbService.getCollection('shop');
    try {
        const shop = await collection.findOne({
            "owner._id": ObjectId(_id)
        });
        const minShop = {
            _id:shop._id,
            name:shop.name,
            imgUrl:shop.imgUrls[0]
        }
        return minShop;
    } catch (err) {
        logger.error(`ERROR: cannot find shop by id  ${_id}, err: ${err}`);
        throw err;
    }
}

async function getShopByUser(_id) {
    const collection = await dbService.getCollection('shop');
    try {
        const shop = await collection.findOne({
            "owner._id": ObjectId(_id)
        });
        console.log('shopuser service', shop)
        return shop;
    } catch (err) {
        logger.error(`ERROR: cannot find shop by user id  ${_id}, err: ${err}`);
        throw err;
    }
}

async function remove(_id) {
    const collection = await dbService.getCollection('shop')
    try {
        await collection.deleteOne({"_id": ObjectId(_id)});
        logger.info(`Pet ${_id} was removed well!`);
    } catch (err) {
        logger.error(`ERROR: cannot remove shop ${shop._id}, err: ${err}`)
        throw err;
    }
}

async function save(shop) {
    const collection = await dbService.getCollection('shop');
    if (shop._id) {
        shop._id = ObjectId(shop._id);
        shop.updatedAt = new Date(Date.now()).toISOString();
        try {
            await collection.updateOne({"_id": shop._id}, {$set: shop});
            logger.info(`Pet ${shop._id} was updated well!`);
            return shop;
        } catch (err) {
            logger.error(`ERROR: cannot update shop ${shop._id}, err: ${err}`)
            throw err;
        }
    } else {
        shop.createdAt = new Date(Date.now()).toISOString();
        try {
            await collection.insertOne(shop);
            logger.info(`Pet ${shop._id} was creted well!`);
            return shop;
        } catch (err) {
            logger.error(`ERROR: cannot insert shop ${shop._id} to DB, err: ${err}`)
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