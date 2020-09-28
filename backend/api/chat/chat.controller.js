const chatService = require('./chat.service');
const logger = require('../../services/logger.service');


module.exports = {
    getChats,
    getChatsByUserId,
    getChat,
    createChat,
    updateChat,
    deleteChat
}

async function getChats(req, res) {
    const filterBy = req.query;
    const chats = await chatService.query(filterBy);
    return res.json(chats);
}
async function getChatsByUserId(req, res) {
    const userId = req.params.id;
    const chats = await chatService.getByUserId(userId);
    return res.json(chats);
}

async function getChat (req, res) {
    const chatId = req.params.id;
    const chat = await chatService.getById(chatId)
    return res.json(chat);;
}

async function createChat(req, res) {
    const chat = req.body;
    const savedChat = await chatService.save(chat);
    return res.json(savedChat);
}

async function updateChat(req, res) {
    const chat = req.body;
    const savedChat = await chatService.save(chat);
    return res.json(savedChat);
}

async function deleteChat(req, res) {
    const chatId = req.params.id;
    await chatService.remove(chatId);
    res.end('Chat Deleted Well!');
}