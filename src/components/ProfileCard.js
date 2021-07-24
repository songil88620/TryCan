import React from 'react'

const ProfileCard = (props) => {
    return (
        <button
            disabled={props.disabled}
            onClick={props.onClick}
            className={`profile-card ${props.logout && ' profile-hover'}`}>
            <img style={{color:'black'}} src={props.src} alt=""/>
            <p>{props.text}</p>
        </button>
    )
}
export default ProfileCard;