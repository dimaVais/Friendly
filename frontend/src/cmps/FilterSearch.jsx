import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


export class FilterSearch extends Component{
     
onInputChange=event=>{
    console.log(event.target);
} 
    
render(){
    return (
            <div className="search-container">
                <FontAwesomeIcon className="search-icon" icon={faSearch} />
                 <input className="search" type="text" name="search" autoComplete="off" placeholder="Find a friend" onInputChange={this.onInputChange} />
             </div>
        )

    }
}




