import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


export class FilterSearch extends Component{
     
    
render(){
    return (
            <div className="search-container">
                <FontAwesomeIcon className="search-icon" icon={faSearch} />
                 <input className="search" type="text" name="search" autoComplete="off" placeholder="Find a friend" onChange={(ev)=>this.props.onInputChange(ev)} />
             </div>
        )

    }
}




