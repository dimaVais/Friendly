import React, { Component } from 'react';

import { Input,Button,Switch,FormGroup,InputLabel,ListItem } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMars } from '@fortawesome/free-solid-svg-icons'
import { faVenus } from '@fortawesome/free-solid-svg-icons'


export class TagsFilter extends Component () {
    
    state={
        
            type:'',
            gender:'',
            breed:'',
            size:'',
            word:''

    }

     displayTags(tag,index){
        return (
            <div  key={index}>
                <label htmlFor="">{tag}</label>
                <Switch type="checkbox" name="" value={tag} />
            </div>
        )
    }
    onToggle(){

    }
    render(){
        const tags = ["Kids friendly","Healthy","Energetic","Sterilized"]

        return (
            <div className="tags-modal">
                <div className="container">
                <FormGroup>
                    <section>
                        <InputLabel htmlFor="">Animal type</InputLabel>
                        <Input name="type" autoComplete="off"  type="text" />

                    </section>
                    <section className="gender">
                        <InputLabel htmlFor="">Gender</InputLabel>
                        <FontAwesomeIcon className="pet-gender pet-gender-male-icon" onClick={this.onToggle} icon={faMars} />
                        <FontAwesomeIcon className="pet-gender pet-gender-female-icon" icon={faVenus} />
{/*                         <Input name="gender" autoComplete="off"  onChange={ handleChange } type="text" />
 */}                    </section>
                    <section>
                        <InputLabel htmlFor="">Breed</InputLabel>
                        <Input name="breed" autoComplete="off"  type="text" />
                    </section>
                    <section>
                        <InputLabel htmlFor="">Min Age</InputLabel>
                        <Input type="age" name="minAge"  />
                    </section>
                    <section>
                        <InputLabel className='s' htmlFor="">Max Age</InputLabel>
                        <Input type="age" name="maxAge"  />
                    </section>
                    {/* <section >
                        {tags.map((tag,index) => displayTags(tag,index))}
                    </section> */}
                    <Button variant="contained" onClick={this.props.onToggleFilterModal}>Clear</Button>
                    <Button variant="contained" onClick={this.props.onToggleFilterModal}>Show</Button>
                </FormGroup>  
                </div>  
             </div>
        )
    }
}
