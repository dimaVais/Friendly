const orderService = require('./order.service');
const logger = require('../../services/logger.service');


module.exports = {
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder
}

async function getOrders(req, res) {
    const filterBy = req.query;
    const orders = await orderService.query(filterBy);
    return res.json(orders);
}

async function getOrder (req, res) {
    const orderId = req.params.id;
    const order = await orderService.getById(orderId)
    return order;
}

async function createOrder(req, res) {
    const order = req.body;
    const savedOrder = await orderService.save(order);
    return res.json(savedOrder);
}

async function updateOrder(req, res) {
    const order = req.body;
    const savedOrder = await orderService.save(order);
    return res.json(savedOrder);
}

async function deleteOrder(req, res) {
    const orderId = req.params.id;
    await orderService.remove(orderId);
    res.end('Order Deleted Well!');
}