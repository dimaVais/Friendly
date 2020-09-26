import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import {  FacebookIcon, TwitterIcon } from 'react-share'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export class Footer extends Component {

    


    render() {
        return (
            <div className="footer full">
                <NavLink to="/"><img className="logo-footer" src={require('../assets/img/logo-with-title.png')} alt="Home" /></NavLink>
                <p>Powered By ADA Systems.</p>
                <div className="social">
                <a href="https://www.facebook.com/iHeartDogscom" target="_blank"><FacebookIcon size={30} /></a>
                <a href="https://twitter.com/AdoptCatsDogs" target="_blank"><TwitterIcon size={30} /></a>
                <a href="https://www.instagram.com/charlie_retriever/?hl=en" target="_blank"><img className="insta-logo" src={require('../assets/img/insta.png')} alt=""/></a>
                </div>
            </div>
        )
    }
}
