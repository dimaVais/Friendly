
import React, { Component } from 'react'

export class Chat extends Component {

    state = {
        msg: { from: 'Me', txt: '' },
        msgs: [],
      };

    render() {
        return (
            <div className="chat-container">
                Chat
            
                {/* <form onSubmit={this.sendMsg}>
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
             */}
            </div>
        )
    }
}