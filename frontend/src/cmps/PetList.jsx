import React from 'react'
import { PetPreview } from './PetPreview'


export function PetList({ pets, onEdit, onRemove, user }) {
    return (
        <div className="pet-list">
            <ul>
                {
                    pets.map(pet => <PetPreview pet={pet} onRemove={onRemove} onEdit={onEdit} key={pet._id} user={user} />)
                }
            </ul>

        </div>
    )
}
