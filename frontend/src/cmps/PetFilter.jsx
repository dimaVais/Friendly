import React, { Component } from 'react'
import { connect } from 'react-redux';

import {TagsFilter}from './TagsFilter'
import {setFilter,loadPets} from '../store/actions/petActions.js'
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
                txt:'',
                distance:{
                    lat:0,
                    lon:0,
                    range:0
                }
            },
            isModalShown:false,
            tags:[]
        
    }

   async componentDidMount(){
       const position= await navigator.geolocation.getCurrentPosition(
        function(position) {
          return position
          const distance={
            lat:position.coords.latitude,
            lon:position.coords.longitude,
            range:0
        }
        this.setState({...this.state.filterBy,distance:distance});
        
        },
        function(error) {
          console.error("Error Code = " + error.code + " - " + error.message);
        }
      );
      console.log(position);
      this.setState({...this.state,filterBy:this.props.filterBy})

   }
    
   componentDidUpdate(){
       console.log(this.props.pets);
   }
    onFilterChange=(obj)=>{
        this.updateFilterAndLoad(obj)
    }
     
    handleChange = (ev) => {
       console.log(ev);
        
    }
    onToggleFilterModal =()=>{
        this.setState({isModalShown:!this.state.isModalShown})
    }
    onApplyFilter=()=>{
        this.onToggleFilterModal()
    }
   
    resetFilter=async()=>{
        
        await this.setState({...this.state.filterBy,
            type:'',
            gender:'',
            breed:'',
            size:'',
            txt:''
        });
        this.props.setFilter(this.state.filterBy,()=>this.props.loadPets())
    }

    async updateFilterAndLoad(obj){
        await this.props.setFilter({...this.props.filterBy,...obj},()=>this.loadPets())
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

    render() {
        const {isModalShown, parent} = this.state
        // const btnClass=parent==='hero'?'hero-btn more-btn':'gallery-btn more-btn';
        return (
            <div className="filter-container flex column align-center">

                <section className="search-container flex space-around">
                        <FilterSearch parent="main" onInputChange={this.onInputChange}/>
                        { <button className="more-btn"  onClick={this.onToggleFilterModal}>More</button>}
                </section>
                <section className="category-container">
                    <CategoryList onCategoryChange={this.onFilterChange}/>
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
