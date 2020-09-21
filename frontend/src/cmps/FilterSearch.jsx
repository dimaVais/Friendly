import React, { Component } from 'react'
import { connect } from 'react-redux'


export class FilterSearch extends Component{
     
onInputChange=event=>{
    console.log(event.target);
} 
    
render(){
    return (
            <div className="search-container">
                 <input className="search" type="text" name="search" autoComplete="off" placeholder="Find a friend" onInputChange={this.onInputChange} />
             </div>
        )

    }
}




