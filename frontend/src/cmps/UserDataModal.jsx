import React from 'react'


export function UserDataModal({ user }) {
    return (
        <React.Fragment>
            
            <div className="user-data-main-container">
                <div className="header">
                <h2>{user.fullName}</h2>
                    <img src={user.imgUrl} alt="" />

                </div>
                <div className="user-data-box">
                    <div className="user-profile-details flex column">
                        {user.phone && <p><span>Phone: </span>{user.phone}</p>}
                        {user.email && <p><span>Email: </span>{user.email}</p>}
                        {user.birthDate && <p><span>Age: </span>
                            {parseInt((Date.now() - new Date(user.birthDate)) / (1000 * 60 * 60 * 24 * 30 * 12))}</p>}
                        {user.familyStatus && <p><span>Family Status: </span>{user.familyStatus}</p>}
                        {user.numberOfKds && <p><span>Number of Kids: </span>{user.numberOfKds}</p>}
                        {user.residence && <p><span>Recidence Type: </span>{user.residence}</p>}
                        {user.petCondition && <p><span>Pet Designated Living conditions: </span>{user.petCondition}</p>}
                        {user.currrenPets && <p><span>Current Pets at home: </span>{user.currrenPets}</p>}
                        {user.prevExperince && <p><span>Previouse experince with animals: </span>{user.prevExperince}</p>}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}