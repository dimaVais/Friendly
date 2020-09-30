import React from 'react'
import {UserData} from './UserData.jsx'


export function UserDataModal({ user, closeModal }) {
    return (
        <div className="user-data-main-container">
            <UserData />
        </div>
    )
}