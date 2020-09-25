const express = require('express');
const router = express.Router();

const {
    getChats,
    getChat,
    createChat,
    updateChat,
    deleteChat
} = require('./chat.controller');

const {
    requireAuth,
    requireOwner
} = require('../../middlewares/requireAuth.middleware');
const chatService = require('./chat.service');


router.get('/', getChats);
router.post('/', createChat);
router.get('/:id', getChat);
router.put('/:id', updateChat);
router.delete('/:id', deleteChat);

module.exports = router;