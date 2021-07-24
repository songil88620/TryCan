import React from 'react'

export default function ChangePasswordLogo({...props}) {
  return (
    <div className="logoArea">
      <img src={props.logo} alt="logoWithUserType" className="ChangePasswordLogo" />
      <p style={{fontSize:15, color:"black"}} className="userType">{props.userType}</p>
    </div>
  )
}
