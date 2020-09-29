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
        const { filterBy } = this.props
        const isEmptyFilter = !filterBy.type && !filterBy.txt && !filterBy.distance.range

        return (
            <div className="pet-list-container">

                {isEmptyFilter && <h4 className="popular-pets-header">Most Popular</h4>}
                {isEmptyFilter && <ul className="pet-list"> {
                    popPets.map((pet, index) => <PetPreview pet={pet} key={index} onRemove={onRemove} onEdit={onEdit} />)

                }

                </ul>}
                <hr />
                {isEmptyFilter && <h4 className="popular-pets-header">Very Popular</h4>}
                {isEmptyFilter && <ul className="pet-list"> {
                    notPopPets.map((pet, index) => <PetPreview pet={pet} key={index} onRemove={onRemove} onEdit={onEdit} />)
                }
                </ul>}
                { !isEmptyFilter && <ul className="pet-list"> {pets.map((pet, index) => <PetPreview pet={pet} key={index} onRemove={onRemove} onEdit={onEdit} />)}</ul>}
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

