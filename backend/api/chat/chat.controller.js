const chatService = require('./chat.service');
const logger = require('../../services/logger.service');


module.exports = {
    getChats,
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

async function getChat (req, res) {
    const chatId = req.params.id;
    console.log('chatID in controller',chatId);
    const chat = await chatService.getById(chatId)
    console.log(chat);
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