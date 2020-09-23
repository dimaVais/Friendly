const express = require('express');
const router = express.Router();

const {
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder
} = require('./order.controller');

const {
    requireAuth,
    requireOwner
} = require('../../middlewares/requireAuth.middleware');
const orderService = require('./order.service');


router.get('/', getOrders);
router.post('/', requireAuth, createOrder);
router.get('/:id', getOrder);
router.put('/:id', requireAuth, updateOrder);
router.delete('/:id', requireAuth, deleteOrder);

module.exports = router;