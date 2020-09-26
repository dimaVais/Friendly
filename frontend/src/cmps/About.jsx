import React, { Component } from 'react'

export class About extends Component {
    render() {
        return (
            <div className="about-main-container full">
                <div className="about-headings">
                <h1>Friendly connects Rescue and Adoption centers to potential adopters.</h1>
                <h2>We want to make the world a better place</h2>
                </div>
                <div className="images-box">
                </div>
                
                <div className="call-to-action">
                <h3>Explore</h3>
                <h3>Reach Out</h3>
                <h3>Adopt!</h3>
                <button className="go-to-gallery-btn">Let's See Some Animals</button>
                </div>

            </div>
        )
    }
}
