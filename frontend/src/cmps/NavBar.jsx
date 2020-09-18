import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { LoginModal } from './LoginModal'


export  class NavBar extends Component {

    state = {
        showModal: false
    }

        onNavBarClick = () => {
        this.setState({showModal: !this.state.showModal});
        }

    render() {
        return (
            <div>
                <NavLink to="/">Logo</NavLink>
                <NavLink to="/about">About Us</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
                <button onClick={()=> {this.onNavBarClick()}}>Login</button>
                {this.state.showModal && <LoginModal onNavBarClick={this.onNavBarClick} />}
            </div>
        )
    }
}
