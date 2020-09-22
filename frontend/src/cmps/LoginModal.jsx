import React, { Component } from 'react'
import { connect } from 'react-redux';

import { Button, TextField } from '@material-ui/core';
import {
    loadUsers,
    removeUser,
    login,
    logout,
    signup
} from '../store/actions/userActions';

class _LoginModal extends Component {

    state = {
        msg: '',
        loginCred: {
            userName: '',
            password: ''
        },
        showModal: false
    }

    loginHandleChange = ev => {
        const { name, value } = ev.target;
        this.setState(prevState => ({
            loginCred: {
                ...prevState.loginCred,
                [name]: value
            }
        }));
    };

    closeModal = () => {
        this.props.onNavBarClick()
    }

    doLogin = async ev => {
        ev.preventDefault();
        const { userName, password } = this.state.loginCred;
        if (!userName || !password) {
            return this.setState({ msg: 'Please enter user/password' });
        }
        const userCreds = { userName, password };
        this.props.login(userCreds);
        this.setState({ loginCred: { userName: '', password: '' } });
        this.props.onNavBarClick()

    };

    render() {
        return (
            <div>
                {/* <div onClick={()=>{this.props.onNavBarClick()}} className="modal-screen">heyyyyyyyy</div> */}
                <div className="login-modal">
                    <form onSubmit={this.doLogin}>
                        <TextField
                            autoFocus={true}
                            required={true}
                            type="text"
                            name="userName"
                            value={this.state.loginCred.userName}
                            onChange={this.loginHandleChange}
                            placeholder="User Name"
                        />
                        <br />
                        <br />

                        <TextField
                            required={true}
                            type="password"
                            name="password"
                            value={this.state.loginCred.password}
                            onChange={this.loginHandleChange}
                            placeholder="Password"
                        />
                        <br />
                        <br />

                        <Button onClick={this.doLogin} variant="text" variant="outlined" color="primary" >Login</Button>

                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.userReducer.users,
        // loggedInUser: state.userReducer.loggedInUser,
    };
};
const mapDispatchToProps = {
    login,
    logout,
    signup,
    removeUser,
    loadUsers
};



export const LoginModal = connect(mapStateToProps, mapDispatchToProps)(_LoginModal);