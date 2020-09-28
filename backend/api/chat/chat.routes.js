const express = require('express');
const router = express.Router();

const {
    getChats,
    getChat,
    createChat,
    updateChat,
    deleteChat,
    getChatsByUserId
} = require('./chat.controller');

const {
    requireAuth,
    requireOwner
} = require('../../middlewares/requireAuth.middleware');
const chatService = require('./chat.service');


router.get('/', getChats);
router.get('/member/:id', getChatsByUserId);
router.post('/', createChat);
router.get('/:id', getChat);
router.put('/:id', updateChat);
router.delete('/:id', deleteChat);

module.exports = router;