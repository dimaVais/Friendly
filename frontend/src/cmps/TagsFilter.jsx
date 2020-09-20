
import React from 'react'

export function TagsFilter({onToggleTag,onToggleFilterModal,handleChange})  {
    const tags = ["Kids friendly","Healthy","Energetic","Sterilized"]

     
    function displayTags(tag,index){
        return (
            <div key={index}>
                <label htmlFor="">{tag}</label>
                <input type="checkbox" name="" value={tag} onChange={(ev)=>onToggleTag(ev)}/>
            </div>
        )
    }

    return (
            <div className="tags-modal">
                {tags.map((tag,index) => displayTags(tag,index))}
                <label htmlFor="">By animal type</label>
                    <input name="type" autoComplete="off"  onChange={ handleChange } type="text" />
                    <label htmlFor="">By gender</label>
                    <input name="gender" autoComplete="off"  onChange={ handleChange } type="text" />
                    <label htmlFor="">By breed</label>
                    <input name="breed" autoComplete="off" onChange={ handleChange } type="text" />
                    <label htmlFor="">Min Age</label>
                    <input type="age" name="minAge" onChange={ handleChange } />
                    <label htmlFor="">Max Age</label>
                    <input type="age" name="maxAge" onChange={ handleChange } />
                <button onClick={onToggleFilterModal}>Close</button>
             </div>
        )
}
