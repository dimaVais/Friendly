import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Input } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import { signup, getUserById } from '../store/actions/userActions'
import { saveShop } from '../store/actions/shopActions'



export class _SignUp extends Component {

    state = {
        userAdopt: false,
        userShop: false,
        signupCred: ''
    }

    setUserAdopt = () => {
        this.setState({ userAdopt: true, userShop: false })
    }
    setUserShop = () => {
        this.setState({ userShop: true, userAdopt: false })
    }

    signupHandleChange = ev => {
        const { name, value } = ev.target;
        this.setState(prevState => ({
            signupCred: {
                ...prevState.signupCred,
                [name]: value
            }
        }));
    };

    doSignup = async ev => {
        ev.preventDefault();
        const { userAdopt, userShop } = this.state
        if (userAdopt) {
            this.signUpAdopt()
        } else if (userShop) {
            this.signUpShop()
        }
    }

    signUpAdopt = () => {
        const { fullName, password, address } = this.state.signupCred;
        if (!fullName || !password || !address) {
            return this.setState({ msg: 'All inputs are required!' });
        }
        const signupCreds = { fullName, password, address };
        this.props.signup(signupCreds);
        this.setState({ signupCred: { fullName: '', password: '', address: '' } });
    }

    signUpShop = () => {
        const { fullName, name, type, title, description, location, lat, lng } = this.state.signupCred;
        if (!fullName || !name || !type || !title || !description || !location || !lat || !lng) {
            return this.setState({ msg: 'All inputs are required!' });
        }
        const { _id, imgUrl } = this.props.loggedInUser;
        const signupCreds = { _id, imgUrl, fullName, name, type, title, description, location, lat, lng };
        this.props.saveShop(signupCreds);
        this.setState({
            signupCred: {
                fullName: '', name: '', type: '', title: '', description: '', location: '', lat: '', lng: ''
            }
        });
    }

    render() {
        const { userAdopt, userShop } = this.state
        const { loggedInUser } = this.props
        console.log('this.state.signupCred', this.state.signupCred);
        return (
            <div>
                <h1>We are happy you decided to join us!</h1>
                <p>Do you want to adopt or to find adopters for your animals?</p>
                <button onClick={() => { this.setUserAdopt() }}>Adopt</button>
                <button onClick={() => { this.setUserShop() }}>Find Adopters</button>
                {userAdopt &&
                    <div>
                        <h3>New Adopter</h3>
                        <form onSubmit={this.doSignup}>

                            <br />
                            <Input type="text" name="fullName" placeholder="Your Full Name" onChange={this.signupHandleChange} value={this.state.signupCred.username}></Input>
                            <Input type="password" name="password" placeholder="Password" onChange={this.signupHandleChange} value={this.state.signupCred.username}></Input>
                            <Input type="text" name="address" placeholder="Address" onChange={this.signupHandleChange} value={this.state.signupCred.username}></Input>
                            {/* <Input type="text" name="address" placeholder="Address" onChange={this.signupHandleChange} value={this.state.signupCred.username}></Input> */}

                            <br />
                            <button>Signup</button>
                        </form>
                    </div>
                }
                {userShop && <form className="flex column align-center" onSubmit={this.doSignup}>
                    <h3>Please filled out this form so we will be able to get to know you and your animals</h3>
                    <Input type="text" name="fullName" placeholder="Your Full Name"
                        value={loggedInUser.fullName} onChange={this.signupHandleChange}>
                    </Input>
                    <Input type="text" name="name" placeholder="Your Shop Name"
                        onChange={this.signupHandleChange}></Input>
                    <FormControl>
                        <InputLabel htmlFor="type">Shop Type:</InputLabel>
                        <Select
                            native
                            onChange={this.signupHandleChange}
                            inputProps={{
                                name: "type",
                            }}>
                            <option value={"shelter"}>Shelter</option>
                            <option value={"volunteer"}>Volunteer</option>
                            <option value={"private"}>Private</option>
                        </Select>
                    </FormControl>
                    <Input type="text" name="title" placeholder="Your shop title/catchFrase"
                        onChange={this.signupHandleChange}></Input>
                    <TextField
                        id="standard-textarea"
                        label="Shop Description:"
                        placeholder="Your shop short description"
                        multiline
                        name="description"
                    />
                    <Input type="text" name="location" placeholder="Your Shop Adress"
                        onChange={this.signupHandleChange}></Input>
                    <Input type="number" name="lat" placeholder="Your Shop Latitude"
                        onChange={this.signupHandleChange}></Input>
                    <Input type="number" name="lng" placeholder="Your Shop Longitute"
                        onChange={this.signupHandleChange}></Input>
                </form>

                }
            </div>
        )
    }
}

// "shop": [
//     {
//       "_id": "s101",
//       "name": "Freedom farm",
//       "owner": {
//         "_id": "u101",
//         "fullName": "Moshi Dadiya",
//         "imgUrl": "/img/img1.jpg"
//       },
//       "pets": [
//         {
//           "_id": "p140",
//           "name": "Johnny",
//           "amount": 2
//         }
//       ],
//       "title": "Saving lives",
//       "desc": "We are here for the animals",
//       "location": {
//         "name": "Tel Aviv",
//         "lat": 32.0853,
//         "lng": 34.7818
//       },

const mapStateToProps = state => {
    return {
        users: state.userReducer.users,
        loggedInUser: state.userReducer.loggedInUser,
    };
};

const mapDispatchToProps = {
    signup,
    saveShop,
    getUserById
};



export const SignUp = connect(mapStateToProps, mapDispatchToProps)(_SignUp);