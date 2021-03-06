const shopService = require('./shop.service');
const logger = require('../../services/logger.service');


module.exports = {
    getShops,
    getShop,
    getMiniShop,
    getShopByUser,
    createShop,
    updateShop,
    deleteShop
}

async function getShops(req, res) {
    const filterBy = req.query;
    const shops = await shopService.query(filterBy);
    return res.json(shops);
}

async function getShop(req, res) {
    const shopId = req.params.id;
    const shop = await shopService.getById(shopId);
    return res.json(shop);
}

async function getMiniShop(req, res) {
    const shopId = req.params.id;
    const miniShop = await shopService.getMiniById(shopId);
    return res.json(miniShop);
}

async function getShopByUser(req, res) {
    const userId = req.params.id;
    const shop = await shopService.getShopByUser(userId)
    return res.json(shop);
}

async function createShop(req, res) {
    const shop = req.body;
    const savedShop = await shopService.save(shop);
    return res.json(savedShop);
}

async function updateShop(req, res) {
    const shop = req.body;
    const savedShop = await shopService.save(shop);
    return res.json(savedShop);
}

async function deleteShop(req, res) {
    const shopId = req.params.id;
    await shopService.remove(shopId);
    res.end('Shop Deleted Well!');
}