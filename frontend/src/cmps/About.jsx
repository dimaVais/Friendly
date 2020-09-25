import React, { Component } from 'react'

export class About extends Component {
    render() {
        return (
            <div className="about-main-container full">
                <div className="about-headings">
                <h1>Friendly connects Rescue and Adoption centers to potential adopters.</h1>
                <h2>We want to make the world a better place</h2>
                </div>
                {/* <div className="images-box">

                <div>
                    <img className="img1" src="https://jennycanhamdotcom.files.wordpress.com/2014/11/jenny-brown.jpg" alt=""/>
                </div>
                <div>
                    <img className="img2" src="https://phillypaws.org/wp-content/uploads/NElobby.jpg" alt=""/>
                </div>
                <div>
                    <img className="img3" src="https://secureservercdn.net/198.71.233.87/da7.3f2.myftpupload.com/wp-content/uploads/2019/08/dogs-running.jpg" alt=""/>
                </div>
                <div>
                    <img className="img4" src="https://d17fnq9dkz9hgj.cloudfront.net/uploads/2012/11/144803710-complain-local-animal-shelter-632x475.jpg" alt=""/>
                </div>
                <div>
                    <img className="img0" src="https://image.freepik.com/free-photo/asian-thinking-lady-standing-isolated_171337-2111.jpg" alt=""/>
                </div>
                </div> */}
                
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
