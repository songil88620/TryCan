import React from 'react'

const ProfileFormButton = props => {

    return (
        <button disabled={props.disabled} onClick={props.onclick} className={`profile-form-card profile-button ${props.isDeactive &&' profile-hover'} ` } type="button">
            <img src={props.src} />
            <h3>{props.text}</h3>
        </button>
    )
}
export default ProfileFormButton;