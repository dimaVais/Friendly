
import React, { Component } from 'react'
import socketService from '../services/socketService'
import { connect } from 'react-redux';
import { loadPets } from '../store/actions/petActions.js';
import { saveChat, getChatById, toggleChat } from '../store/actions/chatActions.js';
import { updateUser } from '../store/actions/userActions.js';
import userService from '../services/userService.js'
import { shopService } from '../services/shopService.js'
import { chatService } from '../services/chatService.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faTimes, faPaperPlane } from '@fortawesome/free-solid-svg-icons'


class _Chat extends Component {

    state = {
        chat: {
            topic: '',
            members: [],
            msgs: []
        },
        msg: {
            authorId: '',
            createdAt: '',
            txt: '',
            isRead: false
        },
        recipient: {},
        sender: {}
    }

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
    componentWillUnmount() {
        socketService.off('chat addMsg', this.addMsg);
        socketService.terminate();
    }

    getChatIfExists() {
        return this.props.chats.includes(chat => {
            (chat.members.includes(this.state.sender._id) && chat.members.includes(this.state.recipient._id))
        })
    }
    setRecipientInfo = async (id) => {

        let recipient = await userService.getMiniById(id);
        if (!recipient.imgUrl) {
            const name = recipient.name.split(' ');
            recipient.imgUrl = `https://ui-avatars.com/api/?name=${name[0]}+${name[1]}`
        }
        if (recipient.isOwner) {
            const shop = await shopService.getMiniByUserId(recipient._id);
            console.log('shop:', shop);
            recipient.name = shop.name;
            recipient.imgUrl = shop.imgUrl;
        }
        console.log('recipient:', recipient);
        this.setState({ recipient });
    }

    setSocket = async () => {

        socketService.setup();
        socketService.emit('chat topic', this.state.chat.topic);
        socketService.on('chat addMsg', this.addMsg);
    }

    creatNewChat = () => {
        console.log(this.state);
        const chat = {
            topic: `${this.state.sender._id}__${this.state.recipient._id}`,
            members: [this.state.sender._id, this.state.recipient._id],
            msgs: []
        }
        return chat
    }

    getRecipientId(members) {
        return (members[0] === this.state.sender._id) ? members[1] : members[0]
    }

    addMsg = async newMsg => {
        this.setState({
            chat: {
                ...this.state.chat,
                msgs: [...this.state.chat.msgs, newMsg]
            }
        }, () => {
            // const updatedUser = {...this.state.sender,chats:[...this.state.sender.chats,this.state.chat]}
            this.props.saveChat(this.state.chat);
            // this.props.updateUser(updatedUser);
        });
    }

    sendMsg = async (ev) => {
        ev.preventDefault();
        const msg = {
            authorId: this.props.loggedInUser._id,
            createdAt: new Date(),
            txt: this.state.msg.txt,
            isRead: false
        }
        await this.setState({ msg: { ...msg } });
        socketService.emit('chat newMsg', this.state.msg);
        this.setState({ msg: { authorId: '', createdAt: '', txt: '', isRead: false } });
    }

    msgHandleChange = ev => {
        const { name, value } = ev.target;
        this.setState(prevState => {
            return {
                msg: {
                    ...prevState.msg,
                    [name]: value
                }
            };
        });
    }

    onClose = () => {
        this.props.toggleChat();
    }

    displayMsg = (msg, idx) => {
        let classTxt = 'message-row ';
        const time = new Date(msg.createdAt);
        const isAuthor = msg.authorId === this.state.sender._id;
        classTxt += isAuthor ? 'sender' : 'recipient';
        if (msg.authorId !== this.state.sender._id) msg.isRead = true;
        return (
            <div className={classTxt} key={idx}>
                {!isAuthor && <img src={this.state.recipient.imgUrl} alt="" />}
                <div className="message-content">
                    <div className="txt">{msg.txt}</div>
                    <div className="date" >{time.getHours() + ':' + time.getMinutes()}</div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="chat-container">
                <section className="chat-title flex space-evenly">
                    {this.state.recipient && <span>{this.state.recipient.name}</span>}
                    <button className="btn-close btn" onClick={this.onClose}><FontAwesomeIcon className="close-icon" icon={faTimes} /></button>
                </section>
                <section className="msgs-container">
                    {this.state.chat.msgs && this.state.chat.msgs.slice(0).reverse().map((msg, idx) => (
                        this.displayMsg(msg, idx))
                    )}
                </section>
                <form onSubmit={this.sendMsg}>
                    <section className="input-container flex space-around">
                        <input
                            type="text"
                            value={this.state.msg.txt}
                            onChange={this.msgHandleChange}
                            name="txt"
                            autoComplete="off"
                            placeholder="Type Message Here"
                        />
                        <button className="btn-send"><FontAwesomeIcon className="send-icon" icon={faPaperPlane} /></button>
                    </section>
                </form>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        isChatShown: state.chatReducer.isChatShown,
        chats: state.chatReducer.chats,
        currChatInfo: state.chatReducer.currChatInfo,
        pets: state.petReducer.pets,
        loggedInUser: state.userReducer.loggedInUser,
    }
}

const mapDispatchToProps = {
    loadPets,
    saveChat,
    getChatById,
    updateUser,
    toggleChat
}

export const Chat = connect(mapStateToProps, mapDispatchToProps)(_Chat)