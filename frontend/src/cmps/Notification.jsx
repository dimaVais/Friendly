import React from 'react'


export function Notification({title, message}) {

    let hidden='';
    function onClose(){
        hidden='hidden';
    }
    return (
        <div className="notification">
                <h2>{title}</h2>
                <p>{message}</p>
                <button onClick={onClose}>Close</button>
        </div>
    )
}