import React, { Component } from 'react'
import { connect } from 'react-redux';

import {TagsFilter} from './TagsFilter'
import {setFilter,loadPets} from '../store/actions/petActions.js'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import { FilterSearch } from './FilterSearch';
// import SearchIcon from '@material-ui/icons/Search';

  class _PetFilter extends Component {

    state={
            parent:'',
            filterBy: {
                type:'',
                gender:'',
                breed:'',
                size:'',
                word:''
            },
            isModalShown:false,
            tags:[]
        
    }
    
     async componentDidMount(){
        if (this.props.parent && this.props.parent==='hero'){
            console.log(this.props);
            await this.resetFilter();
        }
        if(this.props.type){
              await this.setState({ ...this.state.filterBy,type:this.props.type })
         }else this.resetFilter();
         await this.setState({parent:this.props.parent});
    }
    componentDidUpdate(prevProps){
        
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
    
    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.type === 'number' ? +target.value : target.value;
        if (field==='minAge'){
            const minBDate = new Date()- value;
        }
        if (field==='maxAge'){
            const maxBDate = new Date()- value;
        }
        this.setState({ ...this.state.filterBy,[field]:value },() => this.props.setFilter(this.state));
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
            word:''
        },()=>this.props.loadPets())
        await console.log(this.props);
    }

    render() {
        const {isModalShown, parent} = this.state
        const btnClass=parent==='hero'?'hero-btn more-btn':'gallery-btn more-btn';
        return (
            <div className="filter-container flex justify-center">
                {/* <FilterSearch onInputChange={this.onInputChange}/> */}
                {isModalShown   && <TagsFilter onToggleTag={this.onToggleTag} onToggleFilterModal={this.onApplyFilter}/>}
                { <button className={btnClass} onClick={this.onToggleFilterModal}>More </button>}
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
