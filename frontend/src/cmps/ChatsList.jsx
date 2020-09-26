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
// getChatUserImg = (id) => {
//     const images = this.state.chatImgs;
//     const imgForChat = images.find(img => {
//         return img.id === id;
//     })
//     if (imgForChat) return imgForChat.img;
//     else return imgForChat;
// }

// getChatImgs = async () => {
//     const chats = this.state.shopOwner.chats;
//     if (chats && chats.length > 0) {
//         chats.forEach(async chat => {
//             const id = chat.topic.substring(0, chat.topic.indexOf('_'));
//             const user = await userService.getById(id);
//             const userImg = { id: chat._id, img: user.imgUrl }
//             this.setState({ chatImgs: [...this.state.chatImgs, userImg] })
//         })
//     }
// }

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


{/* <div className={"chat-box flex"}>
{(isUserOwner && this.props.loggedInUser.chats && this.props.loggedInUser.chats.length > 0) ?
    this.props.loggedInUser.chats.map(chat => {
        // console.log('Chat in shop', chat);
        return (
            <div>
                <img className="chat-user-img"
                    src={this.getChatUserImg(chat._id)}
                    alt="CHAT"
                    onClick={() => { this.onToggleChat(chat._id) }} />
                {this.state.chatIdOn === chat._id &&
                    currChat && <Chat targetId={currChat.initiate._id}
                        onClose={() => { this.onToggleChat(chat._id) }} />}
            </div>)
    }) : ""}
</div> */}