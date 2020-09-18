import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PetFilter } from '../cmps/PetFilter'
import { PetList } from '../cmps/PetList'
import { loadPets, removePet } from '../store/actions/petActions'

class _PetApp extends Component {



    state = {
        pets: [],
        filterBy: {
            type: '',
            value:''
        },
        sortBy: null
    }

    async componentDidMount() {
    await this.loadPets()
    if (this.props.match){
        const filterBy={};
        filterBy.type= this.props.match.params.filterType;
        filterBy.value = this.props.match.params.filterValue;
        this.setState({filterBy})
       }

        
    }

    loadPets = () => {
        this.props.loadPets();

    }

    onRemove = (id) => {
        console.log('delete:' ,id);
        this.props.removePet(id)
    }
    
    getPetsForDisplay(){
        if(!this.state.filterBy.type) return this.props.pets
        const {filterBy} = this.state
        const petsFiltered = this.props.pets.filter(pet=>{
            return pet[filterBy.type].toLowerCase()===filterBy.value
        });
        return petsFiltered;
    }


    render() {
        const {  user } = this.props;
        const pets = this.getPetsForDisplay()
        // const pet={
        //     name:"Bobi",
        //     summary: "Energetic and happy dog",
        //     imgUrls:["../assets/img/cow.jpg"],
        //     bDate: 12321312,
        //     gender: "Male",
        //     breed: "Golden retreiver",
        //     size: "Small",
        //     isInRisk: true,
        //     shop: {
        //         fullName: "Freedom Farm",
        //         imgUrl: "../assets/img/user.jpg",
        //         rate: 4
        //       },
        //       reacts:[{
        //         type:"love",
        //         count:4
        //       },
        //       {
        //         type:"food",
        //         count:10
        //       }
        //     ]
        // }
        if (!pets) return <h1>Loading...</h1>
        return (
            <div>
                {/* <PetFilter /> */}

                <PetList pets={pets} onRemove={this.onRemove} user={user} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        pets: state.petReducer.pets,
        // user: state.userReducer.loggedInUser
    }
}
const mapDispatchToProps = {
    loadPets,
    removePet
}


export const PetApp = connect(mapStateToProps, mapDispatchToProps)(_PetApp)

