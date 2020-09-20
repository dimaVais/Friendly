import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Input } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { Geolocation } from '../cmps/Geolocation';

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

    signupHandleChange = async ev => {
        const { name, value } = ev.target;
        await this.setState(prevState => ({
            signupCred: {
                ...prevState.signupCred,
                [name]: value
            }
        }));
        console.log('This State:', this.state);
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
        const { fullName, name, type, title, desc, locName, lat, lng } = this.state.signupCred;
        if (!name || !type || !title || !desc || !locName) {
            return this.setState({ msg: 'All inputs are required!' });
        }

        const currUser = this.props.loggedInUser;
        const owner = {
            _id: currUser._id,
            fullName: currUser.fullName,
            imgUrl: currUser.imgUrl
        }
        const location = {
            name: locName,
            lat: parseFloat(lat),
            lng: parseFloat(lng)
        }
        console.log('locName', locName);
        console.log('location', location);
        console.log('lat', lat);
        console.log('lng', lng);

        const signupCreds = { name, type, owner, title, desc, location };
        this.props.saveShop(signupCreds);
        currUser.isOwner = true;
        await this.props.updateUser(currUser)
        this.setState({
            signupCred: {
                name: '', type: '', owner: '', title: '', description: '', location: ''
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
            <div className="signup-container flex column align-center">
                <h1>We are happy you decided to join us!</h1>
                <p>Do you want to adopt or to find adopters for your animals?</p>
                <div className="btn-menu flex">
                    <button onClick={() => { this.setUserAdopt() }}>Adopt</button>
                    <button onClick={() => { this.setUserShop() }}>Find Adopters</button>
                </div>
                {userAdopt &&
                    <div className="main-adopt-container flex column align-center">
                        <h3>New Adopter</h3>
                        <form className="flex column align-center" onSubmit={this.doSignup}>
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
                {userShop && <form className="main-shop-container flex column align-center" onSubmit={this.doSignup}>
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
                            <option aria-label="None" value="" />
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
                        name="desc"
                        onChange={this.signupHandleChange}
                    />
                    <Geolocation signupHandleChange={this.signupHandleChange} />
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