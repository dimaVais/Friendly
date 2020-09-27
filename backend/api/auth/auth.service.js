const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')
const session = require('express-session')

const saltRounds = 10

async function login(userName, password) {
    // logger.debug(`auth.service - login with userName: ${userName}`)
    if (!userName || !password) return Promise.reject('userName and password are required!')
    const user = await userService.getByUsername(userName);
    if (!user) return Promise.reject('Invalid userName or password');
    const match = await bcrypt.compare(password, user.password);
    if (!match) return Promise.reject('Invalid userName or password')
    delete user.password;
    return user;
}

async function signup(email, password, userName) {
    logger.debug(`auth.service - signup with email: ${email}, userName: ${userName}`)
    if (!email || !password || !userName) return Promise.reject('email, userName and password are required!')

    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({email, password: hash, userName})
}

module.exports = {
    signup,
    login
}