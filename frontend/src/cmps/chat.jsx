
import React, { Component } from 'react'

export class Chat extends Component {



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
            <li key={idx}>{msg}</li>
          ))}
        </ul>
    
            </div>
        )
    }
}