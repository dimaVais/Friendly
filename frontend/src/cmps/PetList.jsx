import { PetPreview } from './PetPreview'
import React, { Component } from 'react'
import { connect } from 'react-redux';

class _PetList extends Component {

    state = {
        filterBy: ''
    }

    componentDidMount() {
        this.setState({
            filterBy: JSON.parse(JSON.stringify(this.props.filterBy))
        })
    }


    render() {
        const { pets, onRemove, onEdit } = this.props
        const popPets = pets.filter((pet) => pet.reacts[0].count > 90)
        const notPopPets = pets.filter((pet) => pet.reacts[0].count <= 90)
        const { filterBy } = this.state
        console.log('filterBy', filterBy);
        const isEmptyFilter = !filterBy.type && !filterBy.txt
        console.log('isEmptyFilter', isEmptyFilter);

        return (
             <div className="pet-list-container">
                  
                {isEmptyFilter && <h4 className="popular-pets-header">Most Popular</h4>}
                 <ul className="pet-list">
                    {isEmptyFilter && 
                        popPets.map((pet, index) => <PetPreview pet={pet} key={index} onRemove={onRemove} onEdit={onEdit} />)}
                </ul>
                <hr />
                <ul className="pet-list">
                    {isEmptyFilter && 
                        notPopPets.map((pet, index) => <PetPreview pet={pet} key={index} onRemove={onRemove} onEdit={onEdit} />)}
                </ul>
                
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        filterBy: state.petReducer.filterBy
    }
}

const mapDispatchToProps = {

}

export const PetList = connect(mapStateToProps, mapDispatchToProps)(_PetList);



// export function PetList({ pets, onRemove, onEdit }) {

//     const popPets = pets.filter((pet) => pet.reacts[0].count > 90)
//     const notPopPets = pets.filter((pet) => pet.reacts[0].count <= 90)

//     return (
//         <div className="pet-list-container">
//             <h4 className="popular-pets-header">Most Popular</h4>
//             <ul className="pet-list">
//                 {
//                     popPets.map((pet, index) => <PetPreview pet={pet} key={index} onRemove={onRemove} onEdit={onEdit} />)}
//             </ul>
//             <hr />
//             <ul className="pet-list">
//                 {
//                     notPopPets.map((pet, index) => <PetPreview pet={pet} key={index} onRemove={onRemove} onEdit={onEdit} />)}
//             </ul>

//         </div>
//     )
// }
