
import React from 'react'

export function TagsFilter({onToggleTag})  {
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
                <br/>
             </div>
        )
}
