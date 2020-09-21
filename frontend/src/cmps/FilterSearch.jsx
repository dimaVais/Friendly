import React, { Component } from 'react'
import { connect } from 'react-redux'


class FilterSearch extends Component{
     
onInputChange=event=>{
    console.log(event.target);
} 
    
render(){
    return (
            <div className="search-modal">
                 <input  type="text" name="search" autoComplete="off" placeholder="Find a friend" onInputChange={this.onInputChange} />
             </div>
        )

    }
}




