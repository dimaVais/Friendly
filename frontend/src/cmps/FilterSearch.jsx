import React, { Component } from 'react'
import { connect } from 'react-redux';
import {setFilter,loadPets} from '../store/actions/petActions.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


 class _FilterSearch extends Component{
     
 onInputChange=async (ev)=>{
        const word = ev.target.value
        
        await this.props.setFilter({word},()=>this.props.loadPets())        
    } 
render(){
    return (
            <div className="search-container">
                <FontAwesomeIcon className="search-icon" icon={faSearch} />
                 <input className="search" type="text" name="search" autoComplete="off" placeholder="Find a friend (i.e. small, cat, puppy)" onChange={(ev)=>this.onInputChange(ev)} />
             </div>
        )

    }
}

const mapStateToProps = state => {
    return {
        filterBy:state.petReducer.filterBy
    }
}

const mapDispatchToProps = {
   setFilter,
   loadPets
}


export const FilterSearch = connect(mapStateToProps, mapDispatchToProps)(_FilterSearch)


