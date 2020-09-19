
import React, { Component } from 'react'
import socketService from '../services/socketService'
import { connect } from 'react-redux';
import { loadPets } from '../store/actions/petActions.js';

 class _Chat extends Component {

    state = {
        pet: {},
        msg: {from: 'Me',txt:''},
        topics:[],
        msgs:[]
    }
      async componentDidMount() {
             
        await console.log(this.state);
        await console.log(this.props);
        // const petId = this.props.match.params.id
        // const petToShow = this.props.pets.find(pet => pet._id === petId)
        // this.setState({ pet: { ...petToShow } });

            socketService.setup();
            socketService.emit('chat topic', this.state.topic);
            socketService.on('chat addMsg', this.addMsg);
      }
    
      componentWillUnmount() {
        socketService.off('chat addMsg', this.addMsg);
        socketService.terminate();
      }

      sendMsg=ev=>{
          console.log('sending');
      }
      msgHandleChange=ev=>{
          console.log('change');
      }
      onClose=()=>{
          this.props.onClose();
      }

    render() {
        return (
            <div className="chat-container">
                <form onSubmit={this.sendMsg}>
                <input
                    type="text"
                    value={this.state.msg.txt}
                    onChange={this.msgHandleChange}
                    name="txt"
                />
                <button>Send</button>
                </form>
                <ul>
                {this.state.msgs.map((msg, idx) => (
                    <li key={idx}>{msg}</li>))}
                </ul>
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