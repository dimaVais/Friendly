import React, { Component } from 'react'


export class CategoryList extends Component {
    
    state={
        dog:false,
        cat:false,
        farm:false,
        other:false
    }
    


    displayTypesBtn(type){
        const classStr=this.state[type]?'pressed':'';
        return(
             <img key={type} src={require(`../assets/img/category/${type}.png`)} className={classStr} alt="Category" onClick={(event)=>this.imgClicked(type)}/>
        )
    }
     imgClicked=async (type)=>{
         const state= {
            dog:false,
            cat:false,
            farm:false,
            other:false
         }
        if(this.state[type]) {
            await this.setState({...state})
            type='';
        }else await this.setState({...state,[type]:!this.state.type})
        this.props.onCategoryChange(type)
    }
    
    render(){
        
        return (
            <div className="category-list anchor">
                {
                    Object.keys(this.state).map(type=>this.displayTypesBtn(type) )
                }
            </div>
        )

    }
}
