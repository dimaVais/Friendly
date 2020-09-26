import React, { Component } from 'react'
import { connect } from 'react-redux';




class _ChatsList extends Component {

state={
    chats:[]
}  
async componentDidMount(){
    if (this.props.loggedInUser) this.setState({chats:[...this.props.loggedInUser.chats]})
    
}
async componentDidUpdate(prevProps){
    if (prevProps!==this.props){
        if (this.props.loggedInUser) this.setState({chats:[...this.props.loggedInUser.chats]}) 
    }
}

displayChatDetails=(chat)=>{
    console.log(chat);
       return (
            <div>
                <div>{chat._id}</div>
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
   
}

export const ChatsList = connect(mapStateToProps, mapDispatchToProps)(_ChatsList)