import React, { Component } from 'react';
import { connect } from 'react-redux';
import { savePet } from '../store/actions/petActions.js'


export class _PetEdit extends Component {

    state = {
        pet: {}
    }

    componentDidMount() {
        const petId = this.props.match.params.id
        if (petId) {
            const petToEdit = this.props.pets.find(pet => pet._id === petId)
            this.setState({ pet: { ...petToEdit } })
        }
    }

    handleInput = ({ target }) => {
        const field = target.name;
        if (target.type === 'number') var value = +target.value;
        else if (target.type === 'checkbox') value = (target.checked);
        else value = target.value;

        this.setState(prevState => {
            return {
                ...prevState,
                pet: {
                    ...prevState.pet,
                    [field]: value
                }
            }
        })
    }

    onSubmitForm = (ev) =>{
        ev.preventDefault();
        this.props.savePet(this.state.pet);
    }


    render() {
        return (
            <form className={"flex column align-center"} onSubmit={(event)=>{this.onSubmitForm(event)}}>
                <label> Insert Pet Name:
                    <input type="text" name="name" onChange={this.handleInput}/>
                </label>
                <label>Insert Pet Type:
                    <input type="text" name="type"  onChange={this.handleInput} />
                </label>
                <label> Insert Pet Adoption Date:
                    <input type="date" name="adoptedAt"  onChange={this.handleInput}/>
                </label>
                <label> Insert Pet Birth Date:
                    <input type="date" name="bDate"  onChange={this.handleInput} />
                </label>
                <label> Insert Pet Gender:
                    <input type="text" name="gender"  onChange={this.handleInput} />
                </label>
                <label>Insert Pet Breed:
                    <input type="text" name="breed"  onChange={this.handleInput}/>
                </label>
                <label> Insert Pet Size:
                    <select name="size" id="size"  onChange={this.handleInput}>
                        <option value="small">Small</option>
                        <option value="medium">medium</option>
                        <option value="large">Large</option>
                        <option value="giant">Giant</option>
                    </select>
                </label>
                <label> Is the adoption urgent:
                    <input type="checkbox" name="isInRisk"  onChange={this.handleInput}/>
                </label>
                <label> Insert summary about the Pet:
                    <input type="text" name="summary"  onChange={this.handleInput}/>
                </label>
                <label> Insert pet description:
                    <textarea type="text" name="description"  onChange={this.handleInput}/>
                </label>
                <label> Select pet behavior with kids:
                    <select name="kids" id="kids"  onChange={this.handleInput}>
                        <option value="friendly">Friendly</option>
                        <option value="selective">Selective</option>
                        <option value="agressive">Large</option>
                    </select>
                </label>
                <label> Select pet behavior with dogs:
                    <select name="dogs" id="dogs"  onChange={this.handleInput}>
                        <option value="friendly">Friendly</option>
                        <option value="selective">Selective</option>
                        <option value="agressive">Large</option>
                    </select>
                </label>
                <label> Select pet behavior with cats:
                    <select name="cats" id="cats"  onChange={this.handleInput}>
                        <option value="friendly">Friendly</option>
                        <option value="selective">Selective</option>
                        <option value="agressive">Large</option>
                    </select>
                </label>
                <label> Select pet energy level:
                    <select name="energy" id="energy" onChange={this.handleInput}>
                        <option value="low">Low</option>
                        <option value="moderate">Moderate</option>
                        <option value="high">High</option>
                    </select>
                </label>
                <label> Select pet health condition:
                    <select name="health" id="health"  onChange={this.handleInput}>
                        <option value="helathy">Helathy</option>
                        <option value="notHealthy">Not Helathy</option>
                    </select>
                </label>
                <button>SAVE</button>
            </form>
        )
    }

}
    const mapStateToProps = state => {
        return {
            pets: state.petReducer.pets
        }
    }

    const mapDispatchToProps = {
        savePet
    }

    export const PetEdit = connect(mapStateToProps, mapDispatchToProps)(_PetEdit)
