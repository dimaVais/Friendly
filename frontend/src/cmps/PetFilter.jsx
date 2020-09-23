import React, { Component } from 'react'
import { connect } from 'react-redux';

import {TagsFilter}from './TagsFilter'
import {setFilter,loadPets} from '../store/actions/petActions.js'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import { FilterSearch } from './FilterSearch';
import {CategoryList} from  './CategoryList'
// import SearchIcon from '@material-ui/icons/Search';

  class _PetFilter extends Component {

    state={
            parent:'',
            filterBy: {
                type:'',
                gender:'',
                breed:'',
                size:'',
                txt:''
            },
            isModalShown:false,
            tags:[]
        
    }

   
     onToggleTag=ev=>{
        console.log('toggled:', ev.target.value);
        const tag = ev.target.value;
        let tags = [...this.state.tags]
        if (tags.includes(tag)){
            tags.splice(tags.indexOf(tag),1);
        }else{
            tags.push(tag)
        }
        this.setState({tags})
        console.log(this.state.tags);
    }
    
    onFilterChange=(obj)=>{
        this.updateFilterAndLoad(obj)
    }
     
    handleChange = (ev) => {
       console.log(ev);

        // const field = target.name;
        // const value = target.type === 'number' ? +target.value : target.value;
        // if (field==='minAge'){
        //     const minBDate = new Date()- value;
        //     console.log();
        // }
        // if (field==='maxAge'){
        //     const maxBDate = new Date()- value;
        // }
        
    }
    onToggleFilterModal =()=>{
        this.setState({isModalShown:!this.state.isModalShown})
    }
    onApplyFilter=()=>{
        this.onToggleFilterModal()
    }
   
    resetFilter=async()=>{
        await console.log(this.props);
      
        await this.props.setFilter({
            type:'',
            gender:'',
            breed:'',
            size:'',
            txt:''
        },()=>this.props.loadPets())
    }

    async updateFilterAndLoad(obj){
        await this.props.setFilter({...this.props.filterBy,...obj},()=>this.loadPets())
    }

    render() {
        const {isModalShown, parent} = this.state
        const btnClass=parent==='hero'?'hero-btn more-btn':'gallery-btn more-btn';
        return (
            <div className="filter-container flex column align-center">
                <CategoryList onCategoryChange={this.onFilterChange}/>
                    <section className="flex align-center">
                        <FilterSearch onInputChange={this.onInputChange}/>
                        { <button className={btnClass}   onClick={this.onToggleFilterModal}>More</button>}
                    </section>
                {isModalShown   && <TagsFilter filterBy={this.props.filterBy} onToggleTag={this.onToggleTag} onFilterChange={this.onFilterChange} onToggleFilterModal={this.onToggleFilterModal}/>}
              
            <br/>   
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


export const PetFilter = connect(mapStateToProps, mapDispatchToProps)(_PetFilter)
