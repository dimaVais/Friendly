import React, { Component } from 'react'
import { connect } from 'react-redux';
import { OutlinedInput } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { Geolocation } from '../cmps/Geolocation';

import { signup, getUserById, updateUser, login, loadUsers } from '../store/actions/userActions'
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
        const { userAdopt, userShop } = this.state;
        const { fullName, username, password, address, email, phone } = this.state.signupCred;
        if (!fullName || !username || !password || !address) {
            return this.setState({ msg: 'All inputs are required!' });
        }
        const user = {
            fullName: fullName,
            username: username,
            password: password,
            imgUrl: `https://ui-avatars.com/api/?name=${fullName.substring(0, 1)}+${fullName.substring(fullName.indexOf(' ') + 1, fullName.indexOf(' ') + 2)}`,
            address: address,
            email: email,
            phone: phone,
            isOwner: userShop,
            isGuest: false
        };
        await this.props.signup(user);
        await this.props.loadUsers();
        const lastSignUpUser = this.props.users[this.props.users.length - 1]
        console.log('userNow:',lastSignUpUser);
        this.setState({ signupCred: { fullName: '', username: '', password: '', address: '', email: '', phone: '' } });
        if (userShop) {
            this.signUpShop(lastSignUpUser);
        } 
        this.props.history.push(`/`);
    }

    signUpShop = async (currUser) => {
        const { name, type, title, desc, locName, lat, lng } = this.state.signupCred;
        if (!name || !type || !title || !desc || !locName) {
            return this.setState({ msg: 'All inputs are required!' });
        }

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
        const signupCreds = { name, type, owner, title, desc, location };
        this.props.saveShop(signupCreds);
        currUser.isOwner = true;
        await this.props.updateUser(currUser)
        this.setState({
            signupCred: {
                name: '', type: '', owner: '', title: '', description: '', location: ''
            }
        });
        // await this.props.loadShops();
        // const shopId = this.props.shops.find(shop => { return shop.owner._id === currUser._id })._id;
        // this.props.history.push(`/shop/${shopId}`)
    }

    getGeolocation = (latLng) => {
        this.setState({
            signupCred: {
                ...this.state.signupCred,
                lat: latLng.lat,
                lng: latLng.lng
            }
        })
    }

    render() {
        const { userAdopt, userShop } = this.state
        const { loggedInUser } = this.props
        console.log('this.state.signupCred', this.state.signupCred);
        return (
            <div className="form-container flex column align-center">
                <h1>We are happy you decided to join us!</h1>
                <p>Do you want to adopt or to find adopters for your animals?</p>
                <div className="btn-menu flex">
                    <button onClick={() => { this.setUserAdopt() }}>Adopt</button>
                    <button onClick={() => { this.setUserShop() }}>Find Adopters</button>
                </div>
                <div className="fields-container flex column align-center">
                    {(userAdopt) ? <h3>New Adopter</h3> :
                        <h3>Please filled out this form so we will be able to get to know you and your animals</h3>}
                    <form className="flex column align-center" onSubmit={this.doSignup}>
                        <div className="flex">
                            <div className="flex column align-center">
                                <br />
                                <OutlinedInput type="text" name="fullName" placeholder="Full Name" onChange={this.signupHandleChange} value={this.state.signupCred.fullName}></OutlinedInput>
                                <OutlinedInput type="text" name="username" placeholder="User Name" onChange={this.signupHandleChange} value={this.state.signupCred.username}></OutlinedInput>
                                <OutlinedInput type="password" name="password" placeholder="Password" onChange={this.signupHandleChange} value={this.state.signupCred.password}></OutlinedInput>
                                <OutlinedInput type="text" name="address" placeholder="Personal Address" onChange={this.signupHandleChange} value={this.state.signupCred.address}></OutlinedInput>
                                <OutlinedInput type="text" name="email" placeholder="Email" onChange={this.signupHandleChange} value={this.state.signupCred.email}></OutlinedInput>
                                <OutlinedInput type="text" name="phone" placeholder="Phone" onChange={this.signupHandleChange} value={this.state.signupCred.phone}></OutlinedInput>
                            </div>
                            {userShop &&
                                <div className="flex column align-center">
                                    <OutlinedInput type="text" name="name" placeholder="Your Shop Name"
                                        onChange={this.signupHandleChange}></OutlinedInput>
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
                                    <OutlinedInput type="text" name="title" placeholder="Your shop title/catchFrase"
                                        onChange={this.signupHandleChange}></OutlinedInput>
                                    <OutlinedInput
                                        id="standard-textarea"
                                        label="Shop Description:"
                                        placeholder="Your shop short description"
                                        multiline
                                        name="desc"
                                        onChange={this.signupHandleChange}
                                    />
                                    <Geolocation getGeolocation={this.getGeolocation}
                                        signupHandleChange={this.signupHandleChange} />
                                    <br />
                                </div>}
                        </div>
                        <button>Signup</button>
                    </form>
                </div >
            </div >
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
    login,
    loadUsers,
    saveShop,
    loadShops,
    getUserById,
    updateUser
};

export const SignUp = connect(mapStateToProps, mapDispatchToProps)(_SignUp);