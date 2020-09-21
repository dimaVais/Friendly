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
        if (this.props.match.params.filterType){
            const type=this.props.match.params.filterType
            await this.props.setFilter({type})
        }
       }else{
        this.resetFitler();
       }
        await this.loadPets()   
    }

   async  componentDidUpdate(prevProps){
        if (prevProps!==this.props){
            this.setState({isReady:true})
           }
        if(prevProps.filterBy!==this.props.filterBy){
            await this.loadPets();
        }
        else{
        }
    }
    
    async componentWillUnmount(){
       await this.resetFitler();
    }

     resetFitler=async()=>{
         console.log('reseting filter');
        await this.props.setFilter({filterBy: {
            type:'',
            gender:'',
            breed:'',
            size:'',
            word:''
        }})
    }

    onSetFilter = (filterBy) =>  {
        this.setState({ filterBy }, () => this.loadPets())
    }

    loadPets = async _ => {
        await this.props.loadPets(this.props.filterBy);
    }

    onRemove = (id) => {
        this.props.removePet(id)
    }
    
    render() {
        const {  user } = this.props;
        
        if (!this.props.pets) return <h1>Loading...</h1>
        return (
            <div> 
                {/* {this.state.isReady && <PetFilter onSetFilter={this.onSetFilter} type={this.state.filterBy.type} />} */}
                <PetList pets={this.props.pets} onRemove={this.onRemove} user={user} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        pets: state.petReducer.pets,
        filterBy:state.petReducer.filterBy 
      }
}
const mapDispatchToProps = {
    loadPets,
    removePet,
    setFilter
}

export const PetApp = connect(mapStateToProps, mapDispatchToProps)(_PetApp)

