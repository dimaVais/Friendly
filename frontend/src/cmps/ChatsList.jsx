import React, { Component } from 'react';
import { connect } from 'react-redux';

import { chatService } from "../services/chatService.js"
import userService from '../services/userService.js';
import { getChatById,toggleChat } from '../store/actions/chatActions.js';
import { shopService } from '../services/shopService.js'


class _ChatsList extends Component {

state={
    chats:null,
    usersInfo:{} 
}  
 
 async componentDidMount(){
    if (this.props.loggedInUser.chats){ 
        let chats=[];
        let imgs;
        this.props.loggedInUser.chats.forEach(async chat=>{
            const fullChat = await chatService.getById(chat._id);
            chats.push(fullChat);
            const recipientId =await this.getRecipientId(fullChat.members);
            const user = await userService.getById(recipientId);
            await this.setStateWithRecipient(user);
        })
        await this.setState({chats})
    }
}
async componentDidUpdate(prevProps){

}

async setStateWithRecipient(user){
    let userInfo={
       [user._id]:{
           img:user.imgUrl,
           name:user.fullName
       }
    }; 

    if (!user.imgUrl){
        const name=user.fullName.split(' ');
        userInfo[user._id].img = `https://ui-avatars.com/api/?name=${name[0]}+${name[1]}`
    }

    if (user.isOwner) {
        const shop = await shopService.getByUserId(user._id);
         userInfo[user._id].name=shop.name;
    }

    await this.setState({usersInfo:{...this.state.usersInfo,...userInfo} })
}

onChatListClicked=(chatId)=>{
    this.props.toggleChat({'chatId':chatId});
}

displayChatDetails= (chat)=>{
    const id = this.getRecipientId(chat.members)
    if (!this.state.usersInfo[id])return
       return (
            <div key={chat._id} className="chat-list-row flex" onClick={()=>this.onChatListClicked(chat._id)}>   
              <img src={this.state.usersInfo[id].img} alt=""/>
              <div>{this.state.usersInfo[id].name}</div>
            </div>
        )
}

getRecipientId(members){
    return (members[0]===this.props.loggedInUser._id)?members[1]:members[0]
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
        isChatShown: state.chatReducer.isChatShown,
        chats: state.chatReducer.chats,
        currChat: state.chatReducer.currChat,
        loggedInUser: state.userReducer.loggedInUser,
    }
}

const mapDispatchToProps = {
    getChatById,
    toggleChat
}

export const ChatsList = connect(mapStateToProps, mapDispatchToProps)(_ChatsList)

