
import React, { Component } from 'react'
import socketService from '../services/socketService'
import { connect } from 'react-redux';
import { loadPets } from '../store/actions/petActions.js';
import  userService from '../services/userService.js'
import {shopService} from '../services/shopService.js'
import {chatService} from '../services/chatService.js'
 class _Chat extends Component {

    state = {
        msg: {from: 'Me',txt:''},
        topic:null,
        msgs:[]
    }
      async componentDidMount() {
            
            const loggedInUserId=  this.props.loggedInUser._id;
            const user = await userService.getById(loggedInUserId);
            const shop = await shopService.getById(this.props.shopOwnerId);
            const shopOwnerId = await shop.owner._id;
            let topic="c105";
            console.log(user);
             if(user.chats){
                const chats=[...user.chats];
                const chat= await chats.filter(chat=>(
                     chat.targetUserId===shopOwnerId
                 ))[0];
                 if (chat){
                     topic=chat._id;
                     const chatHistory= await chatService.getById(topic);
                     const msgs =  chatHistory.messages;
                    if (msgs) this.setState({msgs})
                 }
             }
            this.setState({topic});
            console.log('topic is:',this.state.topic);
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
      
      sendMsg=ev=>{
        ev.preventDefault();
        socketService.emit('chat addMsg', this.state.msg);
        this.setState({ msg: { from: 'Me', txt: '' } }); 

     }
      msgHandleChange=ev=>{
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

    onClose=()=>{
          this.props.onClose();
      }

    render() {
        return (
            <div className="chat-container">
                    <ul>
                    {this.state.msgs.map((msg, idx) => (
                        <li className="message" key={idx}>{msg.from}:{msg.txt}</li>)
                        )}
                    </ul>
                <form onSubmit={this.sendMsg}>
                    <input
                        type="text"
                        value={this.state.msg.txt}
                        onChange={this.msgHandleChange}
                        name="txt"
                        />
                        <button>Send</button>
                </form>
             <button onClick={this.onClose}>Close</button>
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