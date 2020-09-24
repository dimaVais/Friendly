
import React, { Component } from 'react'
import socketService from '../services/socketService'
import { connect } from 'react-redux';
import { loadPets } from '../store/actions/petActions.js';
import userService from '../services/userService.js'
import { shopService } from '../services/shopService.js'
import { chatService } from '../services/chatService.js'

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';


class _Chat extends Component {

    state = {
        recipientName: '',
        senderName: '',
        msg: { from: 'Sender', txt: '' },
        topic: null,
        msgs: []
    }

    async componentDidMount() {

        const loggedInUserId = this.props.loggedInUser._id;
        const sender = await userService.getById(loggedInUserId);

        if (sender.isOwner) {
            const shop = await shopService.getByUserId(sender._id);
            this.setState({ senderName: shop.name });

        } else this.setState({ senderName: sender.fullName })
        const msg = {
            from: this.state.senderName,
            txt: ''
        }

        const recipient = await userService.getById(this.props.recipientId);
        const recipientName = recipient.fullName;

        this.setState({ recipientName })
        let topic = "c105";
        if (sender.chats) {
            const chats = [...sender.chats];
            const chat = await chats.filter(chat => (
                chat.recipientId === recipient._id
            ))[0];
            if (chat) {
                topic = chat._id;
                const chatHistory = await chatService.getById(topic);
                const msgs = chatHistory.messages;
                if (msgs) this.setState({ msgs })
            }
        }
        this.setState({ topic });
        console.log('topic is:', this.state.topic);
        socketService.setup();
        socketService.emit('chat topic', this.state.topic);
        // socketService.on('chat newMsg', this.addMsg);
        socketService.on('chat addMsg', this.addMsg);
    }

    componentWillUnmount() {
        socketService.off('chat addMsg', this.addMsg);
        socketService.terminate();
    }

    addMsg = newMsg => {
        this.setState(prevState => ({ msgs: [...prevState.msgs, newMsg] }));
        console.log('adding');
    };

    sendMsg = ev => {
        ev.preventDefault();
        console.log('msg', this.state.msg);
        socketService.emit('chat addMsg', this.state.msg);
        const msg = {
            from: this.state.senderName,
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
                    <button className="btn-close btn" onClick={this.onClose}>X</button>
                </section>
                <section className="msgs-container">
                    <ul>
                        {this.state.msgs.map((msg, idx) => (
                            this.displayMsg(msg, idx))
                        )}
                    </ul>

                </section>
                <form onSubmit={this.sendMsg}>
                    <section className="input-container">
                        <input
                            type="text"
                            value={this.state.msg.txt}
                            onChange={this.msgHandleChange}
                            name="txt"
                            autoComplete="off"
                            placeholder="Aa"
                        />
                        <button>Send</button>
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
        pets: state.petReducer.pets,
        loggedInUser: state.userReducer.loggedInUser,
    }
}

const mapDispatchToProps = {
    loadPets,
}

export const Chat = connect(mapStateToProps, mapDispatchToProps)(_Chat)