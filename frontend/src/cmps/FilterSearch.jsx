import React, { Component } from 'react'
import { connect } from 'react-redux'


export class FilterSearch extends Component{
     
    
render(){
    return (
            <div className="search-container">
                 <input className="search"
                        type="text"
                        name="search"
                        autoComplete="off"
                        placeholder="Find a friend"
                        onChange={(ev)=>this.props.onInputChange(ev)} />
             </div>
        )

    }
}




