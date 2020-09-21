import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PetFilter } from '../cmps/PetFilter'
import { PetList } from '../cmps/PetList'
import { loadPets, removePet,setFilter } from '../store/actions/petActions'

class _PetApp extends Component {

    state = {
        pets: [],
        filterBy:{type:''},
        sortBy: null,
        isReady:false
    }

    async componentDidMount() {
    if (this.props.match){
        console.log(this.props);
        if (this.props.match.params.filterType){
            const filterBy={
                type:this.props.match.params.filterType
            }
            await this.setState({filterBy})
        }
       } 
        await this.loadPets()   
    }

   async  componentDidUpdate(prevProps){
           if (prevProps!==this.props){
                this.setState({isReady:true})
           }
    }

    onSetFilter = (filterBy) =>  {
        this.setState({ filterBy }, () => this.loadPets())
    }

    loadPets = () => {
        this.props.loadPets(this.state.filterBy);
    }

    onRemove = (id) => {
        console.log('delete:' ,id);
        this.props.removePet(id)
    }
    
    render() {
        const { pets, user } = this.props;
      
        if (!pets) return <h1>Loading...</h1>
        return (
            <div> 
                {/* {this.state.isReady && <PetFilter onSetFilter={this.onSetFilter} type={this.state.filterBy.type} />} */}
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
    removePet,
    setFilter
}

export const PetApp = connect(mapStateToProps, mapDispatchToProps)(_PetApp)

