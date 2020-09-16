import React from 'react'
import { PetPreview } from './PetPreview'


export function PetList(props) {

    const {pets} = this.props

    return (
        <div className="pet-list">
            <ul>
                {
                    pets.map(pet => <PetPreview pet={pet} />)
                }
            </ul>

        </div>
    )
}
