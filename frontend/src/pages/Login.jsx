// import React, { Component } from 'react'
// import { connect } from 'react-redux';

// import {
//     loadUsers,
//     removeUser,
//     login,
//     logout,
//     signup
// } from '../actions/userActions';

// class _Login extends Component {

//     state = {
//         msg: '',
//         loginCred: {
//             username: '',
//             password: ''
//         }
//     }

//     render() {
//         return (
//             <div>
//                 <form onSubmit={this.doLogin}>
//                     <input
//                         type="text"
//                         name="username"
//                         value={this.state.loginCred.username}
//                         onChange={this.loginHandleChange}
//                         placeholder="User Name"
//                     />
//                     <br />
//                     <input
//                         type="password"
//                         name="password"
//                         value={this.state.loginCred.password}
//                         onChange={this.loginHandleChange}
//                         placeholder="Password"
//                     />
//                     <br />
//                     <button>Login</button>
//                 </form>
//             </div>
//         )
//     }
// }

// const mapStateToProps = state => {
//     return {
//         users: state.user.users,
//         loggedInUser: state.user.loggedInUser,
//         isLoading: state.system.isLoading
//     };
// };
// const mapDispatchToProps = {
//     login,
//     logout,
//     signup,
//     removeUser,
//     loadUsers
// };



// export const Login = connect(mapStateToProps, mapDispatchToProps)(_Login);