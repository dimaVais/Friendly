
import React, { Component } from 'react'
import socketService from '../services/socketService'
import { connect } from 'react-redux';
import { loadPets } from '../store/actions/petActions.js';
import { loadChats, saveChat } from '../store/actions/chatActions.js';
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
            sender: {
                id: '',
                fullName: ''
            },
            recipient: {
                id: '',
                fullName: ''
            },
            msgs: []
        },
        msg: { from: '', txt: '' }
    }

    async componentDidMount() {
        const sender = this.props.loggedInUser;
        console.log(this.props);
        let chat = null;
        if (sender.chats && sender.chats.length > 0) {
            chat = [...sender.chats].find(chat => (
                chat.topic === `${this.props.pet._id}_${sender._id}__${this.props.recipientId}`));
        }

        if (chat) {
            this.setState({ chat: { ...chat } })
        }
        else {
            const recipient = await userService.getById(this.props.recipientId);
            this.createChat(sender, recipient, this.props.pet);
        }
        socketService.setup();
        socketService.emit('chat topic', this.state.chat.topic);
        socketService.on('chat addMsg', this.addMsg);
    }

    componentWillUnmount() {
        socketService.off('chat addMsg', this.addMsg);
        socketService.terminate();
    }

    createChat = async (sender, recipient, pet) => {
        const chat = {
            topic: `${pet._id}_${sender._id}__${recipient._id}`,
            sender: {
                id: sender._id,
                fullName: sender.fullName
            },
            recipient: {
                id: recipient._id,
                fullName: recipient.fullName
            },
            msgs: []
        }
        if (!sender.chats) {
            sender.chats = [];
            this.props.saveChat(chat);
            this.props.updateUser(sender);
        }
        await this.setState({ chat: { ...chat } });
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
        socketService.emit('chat addMsg', this.state.msg);
        const msg = {
            from: this.state.chat.sender.fullName,
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
        classTxt += (msg.from === this.state.senderName) ? 'sender' : 'recipient';
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
                    {this.state.chat.msgs.map((msg, idx) => (
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
                            placeholder="Aa"
                        />
                        <button className="btn-send"><FontAwesomeIcon className="send-icon" icon={faPaperPlane} /></button>
                        {/* <Button variant="contained"
                                color="primary"
                                className="send-btn"
                                endIcon={<Icon>send</Icon>}>
                         </Button> */}
                    </section>
                </form>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        chats: state.chatReducer.chats,
        pets: state.petReducer.pets,
        loggedInUser: state.userReducer.loggedInUser,
    }
}

const mapDispatchToProps = {
    loadPets,
    loadChats,
    saveChat,
    updateUser
}

export const Chat = connect(mapStateToProps, mapDispatchToProps)(_Chat)