
import React, { Component } from 'react'
import socketService from '../services/socketService'
import { connect } from 'react-redux';
import { loadPets } from '../store/actions/petActions.js';
import  userService from '../services/userService.js'
import {shopService} from '../services/shopService.js'
import {chatService} from '../services/chatService.js'
 class _Chat extends Component {

    state = {

        fromName:'',
        msg: {from: 'Sender',txt:''},
        topic:null,
        msgs:[]
    }
      async componentDidMount() {
            
            const loggedInUserId=  this.props.loggedInUser._id;
            const user = await userService.getById(loggedInUserId);
            this.setState({ user });
            if (user.isOwner){
                const owner=await shopService.getByUserId(user._id);
                this.setState({fromName:owner.name})
            }else this.setState({fromName:user.fullName})
            const msg={
                from:this.state.user.fullName,
                txt:''
            }
            this.setState({ msg })
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
        const msg={
            from:this.state.user.fullName,
            txt:''
        }
        this.setState({ msg: msg }); 
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

      displayMsg=(msg,idx)=>{
        let classTxt = 'message ';
        classTxt += (msg.from===this.state.user.fullName)?'user':'';

        return(<li className={classTxt} key={idx}>{msg.from}:{msg.txt}</li>
)
      }



    render() {
        return (
            <div className="chat-container">
                    <button className="btn-close" onClick={this.onClose}>X</button>
                    <section className="msgs-container">
                        <ul>
                        {this.state.msgs.map((msg, idx) => (
                            this.displayMsg(msg,idx))
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
                        />
                        <button>Send</button>

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