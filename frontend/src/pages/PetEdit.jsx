import React, { Component } from 'react';
import { connect } from 'react-redux';
import { savePet, loadPets } from '../store/actions/petActions.js'
import { Input } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';


export class _PetEdit extends Component {

    state = {
        pet: {}
    }

    async componentDidMount() {
        await this.props.loadPets();
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

    onSubmitForm = (ev) => {
        ev.preventDefault();
        this.props.savePet(this.state.pet);
        this.props.history.push('/')
    }

    render() {
        const pet = { ...this.state.pet }
        if (Object.keys(pet).length === 0) return (<h1>LOADING...</h1>)
        return (
            <form className={"form-container fields-container flex column align-center below-nav"}
                onSubmit={(event) => { this.onSubmitForm(event) }}>
                {(!pet._id) ? <h1>Add Your Pet</h1> : <h1>Edit Pet Details</h1>}
                <Input type="text" name="name" placeholder="Pet Name:"
                    value={pet.name} onChange={this.handleInput}></Input>
                <Input type="text" name="type" placeholder="Pet Type:"
                    value={pet.type} onChange={this.handleInput}></Input>
                <TextField name="adoptedAt" label="Pet Adoption Date" type="date"
                    defaultValue={new Date(pet.adoptedAt).toISOString().substr(0, 10)}
                    onChange={this.handleInput}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField name="bDate" label="Pet Birth Date" type="date"
                    defaultValue={new Date(pet.bDate).toISOString().substr(0, 10)}
                    onChange={this.handleInput}
                    InputLabelProps={{ shrink: true }}
                />
                <FormControl>
                    <InputLabel htmlFor="type">Pet Gender:</InputLabel>
                    <Select
                        native
                        value={pet.gender}
                        onChange={this.handleInput}
                        inputProps={{
                            name: "gender",
                        }}>
                        <option value={"male"}>Male</option>
                        <option value={"female"}>Female</option>
                    </Select>
                </FormControl>
                <Input type="text" name="breed" placeholder="Pet Breed:"
                    value={pet.breed} onChange={this.handleInput}></Input>
                <FormControl>
                    <InputLabel htmlFor="type">Pet Size:</InputLabel>
                    <Select
                        native
                        value={pet.size}
                        onChange={this.handleInput}
                        inputProps={{
                            name: "size",
                        }}>
                        <option value="small">Small</option>
                        <option value="medium">medium</option>
                        <option value="large">Large</option>
                        <option value="giant">Giant</option>
                    </Select>
                </FormControl>
                <FormControl className="flex align-center">
                    <lable htmlFor="type"> Is In Risk:
                    <input type="checkbox" checked={(pet.isInRisk) ? "checked" : ""} />
                    </lable>
                    <br /><br />
                </FormControl>
                <TextField
                    id="standard-textarea"
                    label="Pet description:"
                    placeholder="Your pet short description"
                    multiline
                    name="description"
                    value={pet.description}
                    onChange={this.handleInput}
                />
                <FormControl>
                    <InputLabel htmlFor="kids">Select pet behavior with kids:</InputLabel>
                    <Select
                        native
                        onChange={this.handleInput}
                        inputProps={{
                            name: "kids",
                        }}>
                        <option aria-label="None" value="" />
                        <option value="friendly">Friendly</option>
                        <option value="selective">Selective</option>
                        <option value="agressive">Agressive</option>
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="dogs">Select pet behavior with dogs:</InputLabel>
                    <Select
                        native
                        onChange={this.handleInput}
                        inputProps={{
                            name: "dogs",
                        }}>
                        <option aria-label="None" value="" />
                        <option value="friendly">Friendly</option>
                        <option value="selective">Selective</option>
                        <option value="agressive">Agressive</option>
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="cats">Select pet behavior with cats:</InputLabel>
                    <Select
                        native
                        onChange={this.handleInput}
                        inputProps={{
                            name: "cats",
                        }}>
                        <option aria-label="None" value="" />
                        <option value="friendly">Friendly</option>
                        <option value="selective">Selective</option>
                        <option value="agressive">Agressive</option>
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="energy">Select pet energy level:</InputLabel>
                    <Select
                        native
                        onChange={this.handleInput}
                        inputProps={{
                            name: "energy",
                        }}>
                        <option aria-label="None" value="" />
                        <option value="low">Low</option>
                        <option value="moderate">Moderate</option>
                        <option value="high">High</option>
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="health">Select pet health condition:</InputLabel>
                    <Select
                        native
                        onChange={this.handleInput}
                        inputProps={{
                            name: "health",
                        }}>
                        <option aria-label="None" value="" />
                        <option value="helathy">Healthy</option>
                        <option value="notHealthy">Not Healthy</option>
                    </Select>
                </FormControl>
                <button>SAVE</button>
            </form >
        )
    }

}
const mapStateToProps = state => {
    return {
        pets: state.petReducer.pets
    }
}

const mapDispatchToProps = {
    savePet,
    loadPets
}

export const PetEdit = connect(mapStateToProps, mapDispatchToProps)(_PetEdit)
