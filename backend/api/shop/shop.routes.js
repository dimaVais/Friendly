const express = require('express');
const router = express.Router();

const {
    getShops,
    getShop,
    createShop,
    updateShop,
    deleteShop
} = require('./shop.controller');

const {requireAuth,requireOwner} = require('../../middlewares/requireAuth.middleware');
const shopService = require('./shop.service');


router.get('/', getShops);
router.post('/', createShop);
router.get('/:id', getShop); 
router.put('/:id',requireAuth, requireOwner, updateShop);
router.delete('/:id', requireAuth, requireOwner, deleteShop);

module.exports = router;