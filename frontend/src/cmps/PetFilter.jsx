import React, { Component } from 'react'
import {TagsFilter} from './TagsFilter'

export  class PetFilter extends Component {

    state={
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
              console.log(this.state);
         }
         

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

    render() {
        return (
            <div>
                <p>Filter</p>
                <TagsFilter onToggleTag={this.onToggleTag}/>
                <form>
                    <label htmlFor="">By animal type</label>
                    <input name="type" autoComplete="off" value={ this.state.type } onChange={ this.handleChange } type="text" />
                    <label htmlFor="">By gender</label>
                    <input name="gender" autoComplete="off"  onChange={ this.handleChange } type="text" />
                    <label htmlFor="">By breed</label>
                    <input name="breed" autoComplete="off" onChange={ this.handleChange } type="text" />
                    <label htmlFor="">Min Age</label>
                    <input type="age" name="minAge" onChange={ this.handleChange } />
                    <label htmlFor="">Max Age</label>
                    <input type="age" name="maxAge" onChange={ this.handleChange } />
                    
                </form>
            </div>
        )
    }
}
