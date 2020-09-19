import React from 'react'
import { PetPreview } from './PetPreview'


export function PetList({pets, onRemove,onEdit}) {
    return (
        <div >
            <ul className="pet-list">
                {
                   pets.map(pet => <PetPreview pet={pet} onRemove={onRemove} onEdit={onEdit} />)
                }
            </ul>

        </div>
    )
}
