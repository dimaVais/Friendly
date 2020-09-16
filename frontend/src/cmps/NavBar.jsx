import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'


export  class NavBar extends Component {
    render() {
        return (
            <div>
                <NavLink to="/">Logo</NavLink>
                <NavLink to="/about">About Us</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
            </div>
        )
    }
}
