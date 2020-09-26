import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export class About extends Component {
    render() {
        return (
            <div className="about-main-container full">
                <div className="about-left">
                    <div className="about-headings">
                        <h1>Friendly connects adoption centers to potential adopters</h1>
                    </div>
                    <div className="call-to-action">
                       <Link to="/pet"><button className="go-to-gallery-btn">Let's See Some Animals</button></Link> 
                    </div>
                </div>
                <div className="about-right">
                    <div className="adoption-reasons-box">
                        <h3 className="adoption-reasons-header">Why Should I Adopt?</h3>
                        <p>Decrease blood pressure.</p>
                        <p>Decrease feelings of loneliness.</p>
                        <p>Increase opportunities for exercise and outdoor activities.</p>
                        <p className="adoption-reason-last">Increase opportunities for socialization.</p>
                    </div>
                    <div className="images-box">
                        <img className="img-1" src={require('../assets/img/about1.png')} alt="" />
                        <img className="img-2" src={require('../assets/img/about2.png')} alt="" />
                        <img className="img-3" src={require('../assets/img/about3.png')} alt="" />
                    </div>
                </div>
            </div>
        )
    }
}
