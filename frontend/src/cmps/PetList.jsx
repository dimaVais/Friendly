import React from 'react'
import { PetPreview } from './PetPreview'


export function PetList(pets, remove) {

    

    const {pets} = props

    return (
        <div className="pet-list">
            <ul>
                {
                    pets.map(pet => <PetPreview pet={pet} remove={remove}/>)
                }
            </ul>

        </div>
    )
}
