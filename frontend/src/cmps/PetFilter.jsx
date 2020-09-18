import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../store/actions/petActions'

export  class _PetFilter extends Component {

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.props.setFilter({ [field]:value })
    }

    toUpCase(str){
       return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render() {
        return (
            <div>
                <p>Filter</p>
                <form>
                    <label htmlFor="">By animal type</label>
                    <input name="type" autoComplete="off" value={ this.toUpCase(this.props.filterBy.type) } onChange={ this.handleChange } type="text" />
                    <label htmlFor="">By gender</label>
                    <input name="gender" autoComplete="off"  onChange={ this.handleChange } type="text" />
                    <label htmlFor="">By breed</label>
                    <input name="breed" autoComplete="off" onChange={ this.handleChange } type="text" />
                    <label htmlFor="">Min Age</label>
                    <input type="age" name="minPrice" onChange={ this.handleChange } />
                    <label htmlFor="">Max Age</label>
                    <input type="age" name="maxPrice" onChange={ this.handleChange } />
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        filterBy:state.petReducer.filterBy
        // user: state.userReducer.loggedInUser
    }
}
const mapDispatchToProps = {
  
    setFilter
}

export const PetFilter = connect(mapStateToProps, mapDispatchToProps)(_PetFilter)