
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
            initiate: {
                _id: '',
                fullName: ''
            },
            target: {
                _id: '',
                fullName: ''
            },
            msgs: []
        },
        msg: {
            senderId: '',
            from: '',
            createdAt: '',
            txt: ''
        },
        target: '',
    }

    async componentDidMount() {
        var initiate = this.props.loggedInUser;
        console.log('logedIn', initiate);
        var target = await userService.getById(this.props.targetId);
        this.setState({ target })
        this.setChat(this.props.loggedInUser);
    }

    setChat = async (user) => {
        let userChat = null;
        if (user.chats && user.chats.length > 0) {
            console.log('userchats', user.chats, 'of user', user);
            userChat = [...user.chats].find(chat => {
                console.log('IN USER CHAT', chat);
                return chat.topic === `${this.props.loggedInUser._id}__${this.props.targetId}`
                    || chat.topic === `${this.props.targetId}__${this.props.loggedInUser._id}`;
            })
        }
        console.log('userChat', userChat);
        if (userChat) {
            await this.props.getChatById(userChat._id)
            await this.setState({ chat: { ...this.props.currChat } })
        }
        else {
            await this.createChat(this.props.loggedInUser, this.state.target);
        }

        socketService.setup();
        socketService.emit('chat topic', this.state.chat.topic);
        socketService.on('chat addMsg', this.addMsg);
    }

    componentWillUnmount() {
        socketService.off('chat addMsg', this.addMsg);
        socketService.terminate();
    }

    createChat = async (initiate, target) => {
        const chat = {
            topic: `${initiate._id}__${target._id}`,
            initiate: {
                _id: initiate._id,
                fullName: initiate.fullName
            },
            target: {
                _id: target._id,
                fullName: target.fullName
            }, msgs: []
        }
        await this.props.saveChat(chat);

        const users = [initiate, target];
        users.forEach(async user => {
            if (!user.chats) {
                user.chats = [];
            }

            if (this.props.currChat._id) {
                const chatToAdd = {
                    _id: this.props.currChat._id,
                    topic: this.props.currChat.topic,
                    role: (user._id === this.props.loggedInUser) ? 'initiate' : 'target'
                };
                user.chats.push(chatToAdd);
            }
            await this.props.updateUser(user);
            await this.setState({ chat: { ...this.props.currChat } });
        })
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

    sendMsg = async (ev) => {
        ev.preventDefault();
        const msg = {
            senderId: this.props.loggedInUser._id,
            from: this.props.loggedInUser.fullName,
            createdAt: new Date(),
            txt: this.state.msg.txt
        }
        await this.setState({ msg: { ...msg } });
        this.addMsg(this.state.msg);
        socketService.emit('chat addMsg', this.state.msg);
        this.setState({ msg: { senderId: '', from: '', createdAt: '', txt: '' } });
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
        console.log(msg);
        let classTxt = 'message-row ';
        const time=new Date(msg.createdAt);
        const isSender=msg.senderId === this.props.loggedInUser._id;
        classTxt += isSender ? 'sender' : 'recipient';
        return (
            <div className={classTxt} key={idx}>
                {!isSender && <img src={this.state.recipient.imgUrl} alt=""/>}
                <div className="message-content">
                    <div className="txt">{msg.txt}</div>
                    <div className="date" >{time.getHours()+':'+time.getMinutes()}</div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="chat-container">
                <section className="chat-title flex space-evenly">
                    <span>{this.state.recipient.fullName}</span>
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