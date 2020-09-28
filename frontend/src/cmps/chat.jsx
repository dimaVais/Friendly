
import React, { Component } from 'react'
import socketService from '../services/socketService'
import { connect } from 'react-redux';
import { loadPets } from '../store/actions/petActions.js';
import {  saveChat, getChatById,toggleChat } from '../store/actions/chatActions.js';
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
            isRead:false
        },
    }

    async componentDidMount() {
        console.log(this.props);
        if (this.props.currChatInfo.chatId){
            const chat= await chatService.getById(this.props.currChatInfo.chatId);
            await this.setState({chat});
           
            const targetId = await (chat.members[0]===this.props.loggedInUser._id)?chat.members[1]:chat.members[0];
            const target = await userService.getById(targetId);
            this.setChatAndTargetInfo(target);
            
            
        }else{
            var initiate = this.props.loggedInUser;
            var target = await userService.getById(this.props.currChatInfo.userId);
            debugger
            let chat  = this.props.chats.find(chat=>{
                (chat.members.includes(initiate._id) && chat.members.includes(target._id))
            })
            if (!chat) chat = await  this.creatNewChat(initiate,target)
            console.log('New chat:',chat);

            await this.setState({chat});

            this.setChatAndTargetInfo(target);
        }
    }
    componentWillUnmount() {
        socketService.off('chat addMsg', this.addMsg);
        socketService.terminate();
    }
    setChatAndTargetInfo = async (target)=>{
            let targetName = target.fullName;
            let targetImg = target.imgUrl;
            if (!target.imgUrl){
                const name=target.fullName.split(' ');
                targetImg = `https://ui-avatars.com/api/?name=${name[0]}+${name[1]}`
            }
        
            if (target.isOwner) {
                const shop = await shopService.getByUserId(target._id);
                targetName=shop.name;
            }
            this.setState({targetId:target._id,targetImg,targetName});
            socketService.setup();
            socketService.emit('chat topic', this.state.chat.topic);
            socketService.on('chat addMsg', this.addMsg);
        }

    creatNewChat = async (sender,recipient)=>{
        const chat = {
            topic: `${sender._id}__${recipient._id}`,
            members:[sender._id,recipient._id],
            msgs: []
        }

        const users = [sender, recipient];
        users.forEach( user => {
            if (!user.chats) {
                user.chats = [];
            }  
       
        })

        return chat
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
            authorId: this.props.loggedInUser._id,
            createdAt: new Date(),
            txt: this.state.msg.txt,
            isRead:false
        }
        this.props.saveChat(this.state.chat);
        await this.setState({ msg: { ...msg } });
        socketService.emit('chat newMsg', this.state.msg);
        this.setState({ msg: { authorId: '', createdAt: '', txt: '',isRead:false } });
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
        const time=new Date(msg.createdAt);
        const isAuthor=msg.authorId === this.props.loggedInUser._id;
        classTxt += isAuthor ? 'sender' : 'recipient';
        return (
            <div className={classTxt} key={idx}>
                {!isAuthor && <img src={this.state.targetImg} alt=""/>}
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
                    <span>{this.state.targetName}</span>
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