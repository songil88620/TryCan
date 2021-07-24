import React from 'react'
import plus from '../images/plus.svg'
import Spinner from 'react-bootstrap/Spinner'

export default function Profile({ ...props }) {
  return (
    <div className="avatar">
      <div className="avatarImg-container">
        <img src={props.src} id="avatar" alt="avatar" className="avatarImg" />
      </div>
      <div onClick={props.onClick} className="plusBtn">
        <img src={plus} alt="plus" className="plusImg" />
      </div>
      <input
        type="file"
        accept="image/*"
        name="image-upload"
        id="input"
        onChange={props.onChange}
        hidden
      />
      {
        props.loading &&
        <Spinner animation="grow" variant="primary" className="loading" />
      }
    </div>
  )
}
