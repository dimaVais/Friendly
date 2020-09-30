//Login

if (this.props.loggedInUser.chats) {
    this.props.loggedInUser.chats.forEach(async chat => {
        await this.props.getChatById(chat._id);
    })
}

//Chat

async componentDidMount() {
    var sender = this.props.loggedInUser;
    this.setState({ sender })

    if (this.props.currChatInfo.chatId) {
        const chat = this.props.chats.find(chat => chat._id === this.props.currChatInfo.chatId);
        this.setState({ chat });
        this.setRecipientInfo(this.getRecipientId(chat.members));
        this.setSocket();

    } else {
        await this.setRecipientInfo(this.props.currChatInfo.userId);
        const chat = this.getChatIfExists() !== false || this.creatNewChat();
        this.setState({ chat });
        this.setSocket();
    }
}
//Fronend Socket
setSocket = async () => {

    socketService.setup();
    socketService.emit('chat topic', this.state.chat.topic);
    socketService.on('chat addMsg', this.addMsg);
}

// Backend Socket
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
            io.to(socket.myTopic).emit('chat addMsg', msg)
        })
    })
}

