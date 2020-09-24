import React, { Component } from 'react'
import { connect } from 'react-redux';
import {setFilter,loadPets} from '../store/actions/petActions.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { animateScroll as scroll } from "react-scroll";


 class _FilterSearch extends Component{
     
    state={
        txt:'',
        isClearShown:false
    }

    componentDidMount(){
        this.setState({txt:this.props.filterBy.txt});
    }
    componentDidUpdate(prevProps){
        if (prevProps!==this.props){
            this.setState({txt:this.props.filterBy.txt});
        }
    }

    onInputChange= (ev)=>{
        console.log(ev.target.value);
        const txt = ev.target.value;
        this.setState({isClearShown:txt!==''})
        this.setState({txt});   
    } 
    keyPress=(e)=>{
        if(e.keyCode == 13){
            this.onSearch();
            
         }
    }
    onClear=async()=>{
        this.setState({txt:''})
         this.props.setFilter({txt:''},()=>this.props.loadPets())
        this.setState({isClearShown:false})
    }

    onSearch= async ()=>{
        await this.props.setFilter({txt:this.state.txt},()=>this.props.loadPets())
        scroll.scrollTo(750);
    }
    
render(){
    return (
        <div>
            <div className="search-container flex">
                <FontAwesomeIcon className="search-icon" icon={faSearch} />
                <FontAwesomeIcon className={this.state.isClearShown?'clear-icon':'clear-icon hidden'} 
                                     onClick={this.onClear} icon={faTimesCircle} />
                <section className="input-container">
                    
                    <input className="search"
                            type="text"
                            name="search" 
                            value={this.state.txt}
                            autoComplete="off"
                            placeholder="Find a friend (i.e. small, cat, puppy)" 
                            onChange={(ev)=>this.onInputChange(ev)}
                            onKeyDown={this.keyPress} />
                </section>

                <div className="btn-search" onClick={this.onSearch}>Search</div>
             </div>
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


