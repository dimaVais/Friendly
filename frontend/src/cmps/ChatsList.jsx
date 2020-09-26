import React, { Component } from 'react';
import { connect } from 'react-redux';

import { chatService } from "../services/chatService.js"

import { getChatById } from '../store/actions/chatActions.js';
import { Chat } from './Chat.jsx';


class _ChatsList extends Component {

state={
    chats:[]
}  
  async componentDidMount(){
    if (this.props.loggedInUser.chats){ 
        let chats;
        this.props.loggedInUser.chats.forEach(async (chat)=>{
            const fullChat = await chatService.getById(chat._id);
            chats.push(JSON.parse(JSON.stringify(fullChat)));
        })
        console.log(chats);
        await this.setState({chats})
    }
}

async componentDidUpdate(prevProps){

    // if (prevProps!==this.props ){
    //     if (this.props.loggedInUser.chats){

    //         let chats=[];
    //         await this.props.loggedInUser.chats.map(chat=>{
    //             chats.push(chatService.getById(chat._id));
    //         })
    //         this.setState({chats})
    
    //     } 
    // }
}

displayChatDetails=(chat)=>{
    console.log(chat);
       return (
            <div>
                <div onClick={<Chat chatId={chat._id}/>} >{chat.target.fullName}</div>
            </div>
        )

}
    render() {
        return (
            <div className="chat-list-container">
                {(this.state.chats && this.state.chats.map(chat=>this.displayChatDetails(chat)))|| <div>No chats to load</div> }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        chats: state.chatReducer.chats,
        currChat: state.chatReducer.currChat,
        loggedInUser: state.userReducer.loggedInUser,
    }
}

const mapDispatchToProps = {
    getChatById
}

export const ChatsList = connect(mapStateToProps, mapDispatchToProps)(_ChatsList)