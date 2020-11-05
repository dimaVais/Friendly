
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {

        socket.on('chat topic', topic => {
            if (socket.myTopic) {
                socket.leave(socket.myTopic)
            }
            socket.join(topic)
            socket.myTopic = topic;
        })
        socket.on('chat newMsg', msg => {       
            console.log('sending new msg',msg);
                io.to(socket.myTopic).emit('chat addMsg', msg)
        })
    })
}