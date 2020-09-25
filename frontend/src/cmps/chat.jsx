
import React, { Component } from 'react'
import socketService from '../services/socketService'
import { connect } from 'react-redux';
import { loadPets } from '../store/actions/petActions.js';
import { loadChats, saveChat, getChatById } from '../store/actions/chatActions.js';
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
            participents: [],
            msgs: []
        },
        msg: {
            senderId: '',
            createdAt:'',
            txt: ''
        },
        sender: '',
        recipient: ''
    }

    async componentDidMount() {
        const sender = this.props.loggedInUser;
        const recipient = await userService.getById(this.props.recipientId);
        await this.setState({ recipient: recipient })
        const cahtParticipents = { sender: sender, recipient: recipient }

        // for (participant in cahtParticipents) {
        //     this.setChat(cahtParticipents[participant], participant);
        // }

        this.setChat(sender, 'sender');
        // this.setChat(recipient, 'recipient');
    }

    setChat = async (user, type) => {
        await this.setState({ msg: { from: user.fullName, txt: '' } });
        let userChat = null;
        if (user.chats && user.chats.length > 0) {
            userChat = [...user.chats].find(chat => {
                return chat.topic === (`${this.props.loggedInUser._id}__${this.props.recipientId}`
                || `${this.props.recipientId}__${this.props.loggedInUser._id}`)})
        }
        if (userChat) {
            await this.props.getChatById(userChat._id)
            await this.setState({ chat: { ...this.props.currChat } })

        }
        else {
            await this.createChat(user, type, this.props.loggedInUser, this.state.recipient, this.props.pet);
        }

        socketService.setup();
        socketService.emit('chat topic', this.state.chat.topic);
        socketService.on('chat addMsg', this.addMsg);
    }

    // setSenderChat = async (sender,recipient) => {
    //     await this.setState({ msg: { from: sender.fullName, txt: '' } });
    //     let userChat = null;
    //     if (sender.chats && sender.chats.length > 0) {
    //         userChat = [...sender.chats].find(chat => (
    //             chat.topic === `${this.props.pet._id}_${sender._id}__${this.props.recipientId}`));
    //     }
    //     if (userChat) {
    //         await this.props.getChatById(userChat._id)
    //         await this.setState({ chat: { ...this.props.currChat } })
    //     }
    //     else {
    //         await this.createChat(sender, recipient, this.props.pet);
    //     }

    //     socketService.setup();
    //     socketService.emit('chat topic', this.state.chat.topic);
    //     socketService.on('chat addMsg', this.addMsg);
    // }

    componentWillUnmount() {
        socketService.off('chat addMsg', this.addMsg);
        socketService.terminate();
    }

    createChat = async (user, type, sender, recipient, pet) => {
        const chat = {
            topic: `${sender._id}__${recipient._id}`,
            participents: [sender._id, recipient._id],
            msgs: []
        }
        if (!user.chats) {
            user.chats = [];
        }

        await this.props.saveChat(chat);
        if (this.props.currChat._id) {
            const chatToAdd = {
                _id: this.props.currChat._id,
                topic: this.props.currChat.topic,
            };
            user.chats.push(chatToAdd);
        }
        await this.props.updateUser(sender);
        await this.setState({ chat: { ...this.props.currChat } });
    }

    addMsg = async newMsg => {
        await this.setState({
            chat: {
                ...this.state.chat,
                msgs: [...this.state.chat.msgs, newMsg]
            }
        });
        this.props.saveChat(this.state.chat);
        this.props.updateUser(this.props.loggedInUser);
    }

    sendMsg = (ev) => {
        ev.preventDefault();
        this.addMsg(this.state.msg);
        console.log(this.state.chat.topic);
        socketService.emit('chat addMsg', this.state.msg);
        console.log('thischat', this.state.chat);
        const msg = {
            senderId: this.props.loggedInUser._id,
            createdAt: new Date(),
            txt: ''
        }
        this.setState({ msg: msg });
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
        this.props.onClose();
    }

    displayMsg = (msg, idx) => {
        let classTxt = 'message ';
        classTxt += (msg.senderId === this.props.loggedInUser._id) ? 'sender' : 'recipient';
        return (<div className={classTxt} key={idx}>{msg.from}:{msg.txt}</div>
        )
    }

    render() {
        return (
            <div className="chat-container">
                <section className="chat-title flex space-between">
                    <span>{this.state.recipientName}</span>
                    <button className="btn-close btn" onClick={this.onClose}><FontAwesomeIcon className="close-icon" icon={faTimes} /></button>
                </section>
                <section className="msgs-container">
                    {this.state.chat.msgs && this.state.chat.msgs.map((msg, idx) => (
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
        chats: state.chatReducer.chats,
        currChat: state.chatReducer.currChat,
        pets: state.petReducer.pets,
        loggedInUser: state.userReducer.loggedInUser,
    }
}

const mapDispatchToProps = {
    loadPets,
    loadChats,
    saveChat,
    getChatById,
    updateUser
}

export const Chat = connect(mapStateToProps, mapDispatchToProps)(_Chat)