import React, { Component } from 'react'
import { connect } from 'react-redux';

import {TagsFilter} from './TagsFilter'
import {setFilter} from '../store/actions/petActions.js'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import { FilterSearch } from './FilterSearch';
// import SearchIcon from '@material-ui/icons/Search';

  class _PetFilter extends Component {

    state={
            parent:'',
            filterBy:{
                word:'',
                type:'',
                gender:'',
                breed:'',
                size:'',
                isInRisk:'',
                bDateMax:new Date(),
                bDateMin:0,
            },
            isModalShown:false,
            tags:[]
        
    }
     async componentDidMount(){
         console.log(this.props);
         if(this.props.type){
              await this.setState({ ...this.state.filterBy,type:this.props.type })
         }
         await this.setState({parent:this.props.parent});
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
    onInputChange=(ev)=>{
        const word = ev.target.value
        this.setState({...this.state,filterBy:{...this.state.filterBy,word}},() => this.props.setFilter(this.state.filterBy))
        console.log(this.props.filterBy);
        
    }

    render() {
        const {isModalShown, parent} = this.state
        return (
            <div className="filter-container">
                <FilterSearch onInputChange={this.onInputChange}/>
                {isModalShown   && <TagsFilter onToggleTag={this.onToggleTag} onToggleFilterModal={this.onApplyFilter}/>}
                {parent!=='hero' && parent!== 'home' && <button onClick={this.onToggleFilterModal}>More filter</button>}
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
   setFilter

}


export const PetFilter = connect(mapStateToProps, mapDispatchToProps)(_PetFilter)
