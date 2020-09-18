import React, { Component } from 'react'
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';

export class _SignUp extends Component {

    state = {
        userAdopt: false,
        userShop: false
    }

    setUserAdopt = () => {
        this.setState({userAdopt: true, userShop: false})
    }
    setUserShop = () => {
        this.setState({userShop: true, userAdopt: false})
    }

    render() {
        const {userAdopt, userShop} = this.state
        return (
            <div>
               <h1>We are happy you decided to join us!</h1>
               <p>Do you want to adopt or to find adopters for your animals?</p>
               <button onClick={()=>{this.setUserAdopt()}}>Adopt</button>
               <button onClick={()=>{this.setUserShop()}}>Find Adopters</button>
               {userAdopt && 
               <h3>Please filled out this form so we will be able to know you better</h3>
               }
               {userShop && <div>
                <h3>Please filled out this form so we will be able to get to you know and your animals</h3>
                <TextField
                    required={true}
                        type="text"
                        name="userName"
                        value={this.state.loginCred.userName}
                        onChange={this.loginHandleChange}
                        placeholder="Your Full Name"
                    />
               </div>
               
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
        // loggedInUser: state.userReducer.loggedInUser,
    };
};

const mapDispatchToProps = {
    // signup,
    // loadUsers
};



export const SignUp = connect(mapStateToProps, mapDispatchToProps)(_SignUp);