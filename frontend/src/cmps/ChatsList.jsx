import React, { Component } from 'react'
import { connect } from 'react-redux';




class _ChatsList extends Component {

state={
    chats:[]
}  
async componentDidMount(){
    if (this.props.loggedInUser) this.setState({chats:[...this.props.loggedInUser.chats]})
    
}

    render() {
        return (
            <div className="chat-list-container">
                ChatList
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