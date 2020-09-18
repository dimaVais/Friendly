import React, { Component } from 'react'
import { connect } from 'react-redux';

import {
    loadUsers,
    removeUser,
    login,
    logout,
    signup
} from '../store/actions/userActions';

class _Login extends Component {

    state = {
        msg: '',
        loginCred: {
            userName: '',
            password: ''
        }
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

    doLogin = async ev => {
        ev.preventDefault();
        const { userName, password } = this.state.loginCred;
        if (!userName || !password) {
          return this.setState({ msg: 'Please enter user/password' });
        }
        const userCreds = { userName, password };
        this.props.login(userCreds);
        this.setState({ loginCred: { userName: '', password: '' } });
        this.props.history.push('/')
      };

    render() {
        return (
            <div>
                <button onClick={()=>{this.props.history.push('/signup')}} >Sign up</button>
                <form onSubmit={this.doLogin}>
                    <input
                        type="text"
                        name="userName"
                        value={this.state.loginCred.userName}
                        onChange={this.loginHandleChange}
                        placeholder="User Name"
                    />
                    <br />
                    <input
                        type="password"
                        name="password"
                        value={this.state.loginCred.password}
                        onChange={this.loginHandleChange}
                        placeholder="Password"
                    />
                    <br />
                    <button>Login</button>
                </form>
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



export const Login = connect(mapStateToProps, mapDispatchToProps)(_Login);