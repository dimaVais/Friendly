import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Input } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import { signup, getUserById, updateUser } from '../store/actions/userActions'
import { saveShop, loadShops } from '../store/actions/shopActions'



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

    signUpShop = async () => {
        const { fullName, name, type, title, description, location, lat, lng } = this.state.signupCred;
        // if (!fullName || !name || !type || !title || !description || !location || !lat || !lng) {
        //     return this.setState({ msg: 'All inputs are required!' });
        // }
        console.log('bbb,');

        const currUser = this.props.loggedInUser;
        const owner = {
            _id: currUser._id,
            fullName: currUser.fullName,
            imgUrl: currUser.imgUrl
        }
        console.log('btttbb,');

        const signupCreds = { name, type, owner, title, description, location, lat, lng };
        console.log('hhhh,', signupCreds);
        this.props.saveShop(signupCreds);
        currUser.isOwner = true;
        await this.props.updateUser(currUser)
        this.setState({
            signupCred: {
                name: '', type: '', owner: '', title: '', description: '', location: '', lat: '', lng: ''
            }
        });
        await this.props.loadShops();
        const shopId = this.props.shops.find(shop => { return shop.owner._id === currUser._id })._id;
        this.props.history.push(`/shop/${shopId}`)
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
                    <Input type="number" step="0.00000001" name="lat" placeholder="Your Shop Latitude"
                        onChange={this.signupHandleChange}></Input>
                    <Input type="number" step="0.00000001" name="lng" placeholder="Your Shop Longitute"
                        onChange={this.signupHandleChange}></Input>
                    <button>SAVE</button>
                </form>

                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.userReducer.users,
        loggedInUser: state.userReducer.loggedInUser,
        shops: state.shopReducer.shops
    };
};

const mapDispatchToProps = {
    signup,
    saveShop,
    loadShops,
    getUserById,
    updateUser
};



export const SignUp = connect(mapStateToProps, mapDispatchToProps)(_SignUp);