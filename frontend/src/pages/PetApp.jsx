import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PetFilter } from '../cmps/PetFilter'
import { PetList } from '../cmps/PetList'
import { loadPets, removePet,setFilter } from '../store/actions/petActions'

class _PetApp extends Component {



    state = {
        pets: [],
        filterBy: {},
        sortBy: null
    }

    async componentDidMount() {
    if (this.props.match){
        if (this.props.match.params.filterType){
            const filterBy={
                type:this.props.match.params.filterType
            }
            await this.props.setFilter(filterBy)
        }
       } 
        await this.loadPets()

    }

    loadPets = () => {
        console.log('Filter is:',this.props.filterBy);
        this.props.loadPets(this.props.filterBy);
    }

    onRemove = (id) => {
        console.log('delete:' ,id);
        this.props.removePet(id)
    }
    
    // getPetsForDisplay(){
    //     if(!this.state.filterBy.type) return this.props.pets
    //     const {filterBy} = this.state
    //     const petsFiltered = this.props.pets.filter(pet=>{
    //         return pet[filterBy.type].toLowerCase()===filterBy.value
    //     });
    //     return petsFiltered;
    // }


    render() {
        const { pets, user } = this.props;
        // const pets = this.getPetsForDisplay()
      
        if (!pets) return <h1>Loading...</h1>
        return (
            <div>
                <PetFilter />

                <PetList pets={pets} onRemove={this.onRemove} user={user} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        pets: state.petReducer.pets,
        filterBy:state.petReducer.filterBy
        // user: state.userReducer.loggedInUser
    }
}
const mapDispatchToProps = {
    loadPets,
    removePet,
    setFilter
}

export const PetApp = connect(mapStateToProps, mapDispatchToProps)(_PetApp)

