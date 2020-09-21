import React, { Component } from 'react'
import { connect } from 'react-redux';

import {TagsFilter} from './TagsFilter'
import {setFilter} from '../store/actions/petActions.js'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
// import SearchIcon from '@material-ui/icons/Search';

  class _PetFilter extends Component {

    state={
            parent:'',
            isModalShown:false,
            type:'',
            gender:'',
            breed:'',
            size:'',
            isInRisk:'',
            bDateMax:new Date(),
            bDateMin:0,
            tags:[]
        
    }
     async componentDidMount(){
         console.log(this.props);
         if(this.props.type){
              await this.setState({ type:this.props.type })
         }
         await this.setState({parent:this.props.parent});
         console.log(this.state);
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
        this.setState({ [field]:value },() => this.props.onSetFilter(this.state));
    }
    onToggleFilterModal =()=>{
        this.setState({isModalShown:!this.state.isModalShown})
    }
    onApplyFilter=()=>{
        this.onToggleFilterModal()
    }
    onInputChange=_=>{

    }

    render() {
        const {isModalShown, parent} = this.state
        return (
            <div className="filter-container">

                {/* <OutlinedInput ></OutlinedInput> */}
                <input  type="text" name="search" autoComplete="off" placeholder="Find a friend" onInputChange={this.onInputChange} />
                {isModalShown   && <TagsFilter onToggleTag={this.onToggleTag} onToggleFilterModal={this.onApplyFilter}/>}
                    {parent!=='hero' && <button onClick={this.onToggleFilterModal}>More filter</button>}
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
