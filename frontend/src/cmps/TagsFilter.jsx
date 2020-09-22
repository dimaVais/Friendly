
import React from 'react'
import { Input,Button,Switch,FormGroup,InputLabel } from '@material-ui/core';

export function TagsFilter({onToggleTag,onToggleFilterModal,handleChange})  {
    const tags = ["Kids friendly","Healthy","Energetic","Sterilized"]

    function displayTags(tag,index){
        return (
            <div  key={index}>
                <label htmlFor="">{tag}</label>
                <Switch type="checkbox" name="" value={tag} onChange={(ev)=>onToggleTag(ev)}/>
            </div>
        )
    }

    return (
            <div className="tags-modal">
                <FormGroup>
                    <section>
                        <InputLabel htmlFor="">Animal type</InputLabel>
                        <Input name="type" autoComplete="off"  onChange={ handleChange } type="text" />

                    </section>
                    <section>
                        <InputLabel htmlFor="">Gender</InputLabel>
                        <Input name="gender" autoComplete="off"  onChange={ handleChange } type="text" />
                    </section>
                    <section>
                        <InputLabel htmlFor="">By breed</InputLabel>
                        <Input name="breed" autoComplete="off" onChange={ handleChange } type="text" />
                    </section>
                    <section>
                        <InputLabel htmlFor="">Min Age</InputLabel>
                        <Input type="age" name="minAge" onChange={ handleChange } />
                    </section>
                    <section>
                        <InputLabel htmlFor="">Max Age</InputLabel>
                        <Input type="age" name="maxAge" onChange={ handleChange } />
                    </section>
                    <section >
                        {tags.map((tag,index) => displayTags(tag,index))}
                    </section>
                    <Button variant="contained" onClick={onToggleFilterModal}>Show</Button>
                </FormGroup>    
             </div>
        )
}
