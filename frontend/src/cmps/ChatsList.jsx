import React, { Component } from 'react';
import { connect } from 'react-redux';
import socketService from '../services/socketService'
import { chatService } from "../services/chatService.js"
import userService from '../services/userService.js';
import { shopService } from '../services/shopService.js'
import { getChatById, toggleChat, loadChats } from '../store/actions/chatActions.js';


class _ChatsList extends Component {

    state = {
        chats: [],
        chatsReady: false,
        usersInfo: {}
    }

    componentDidMount() {
        if (this.props.chats.length > 0) {
            this.setState({ chats: [...this.props.chats] }, () => this.setUsersData())
        }
        this.setSocket();
    }

    async componentDidUpdate(prevProps) {
        if (this.props.chats.length !== prevProps.chats.length) {
            this.setState({ chats: [...this.props.chats] }, () => this.setUsersData())
        }
    }

    componentWillUnmount() {
        socketService.off('chat addMsg', this.loadAllChats());
        socketService.terminate();
    }

    setSocket = () => {
        socketService.setup();
        socketService.on('chat addMsg', this.loadAllChats());
    }

    setUsersData = () => {
        this.setState({ chatsReady: true })
        this.state.chats.forEach(async chat => {
            const miniUser = await userService.getMiniById(this.getRecipientId(chat.members))
            this.setRecipientsInfo(miniUser);
        })
    }

    loadAllChats = async () => {
        await this.props.loadChats();
        this.setState({ chats: [...this.props.chats] }, () => this.setUsersData())
    }

    async setRecipientsInfo(miniUser) {
        let userInfo = {
            [miniUser._id]: {
                imgUrl: miniUser.imgUrl,
                name: miniUser.name
            }
        };

        if (!miniUser.imgUrl) {
            const name = miniUser.fullName.split(' ');
            userInfo[miniUser._id].imgUrl = `https://ui-avatars.com/api/?name=${name[0]}+${name[1]}`
        }

        if (miniUser.isOwner) {
            const shop = await shopService.getMiniByUserId(miniUser._id);
            userInfo[miniUser._id].name = shop.name;
            userInfo[miniUser._id].imgUrl = shop.imgUrl
        }

        this.setState({ usersInfo: { ...this.state.usersInfo, ...userInfo } })
    }

    onChatListClicked = (chatId) => {
        this.props.toggleChat({ 'chatId': chatId });
        this.props.onToggleChatsList()
    }

    displayChatDetails = (chat) => {
        const id = this.getRecipientId(chat.members)
        if (!this.state.usersInfo[id]) return
        return (
            <div key={chat._id} className="chat-list-row flex" onClick={() => this.onChatListClicked(chat._id)}>
                <img src={this.state.usersInfo[id].imgUrl} alt="" />
                <div>{this.state.usersInfo[id].name}</div>
            </div>
        )
    }

    getRecipientId(members) {
        return (members[0] === this.props.loggedInUser._id) ? members[1] : members[0]
    }

    render() {
        return (
            <div className="chat-list-container">
                {(this.state.chats.length > 0 && this.state.chats.map(chat => this.displayChatDetails(chat))) || <div>No chats to load</div>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isChatShown: state.chatReducer.isChatShown,
        chats: state.chatReducer.chats,
        currChat: state.chatReducer.currChat,
        loggedInUser: state.userReducer.loggedInUser,
    }
}

const mapDispatchToProps = {
    getChatById,
    toggleChat,
    loadChats
}

export const ChatsList = connect(mapStateToProps, mapDispatchToProps)(_ChatsList)

