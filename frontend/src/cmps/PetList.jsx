import React from 'react'
import { PetPreview } from './PetPreview'


export function PetList(props) {
    return (
        <div className="pet-list">
            <ul>
                {
                    props.pets.map(pet => <PetPreview pet={pet} onRemove={props.onRemove}/>)
                }
            </ul>

        </div>
    )
}
