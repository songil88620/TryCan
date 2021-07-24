import React from 'react'

export default function LogoWithUserType({...props}) {
  return (
    <div className="logoArea">
      <img src={props.logo} alt="logoWithUserType" className="logoWithUserType" />
      <p className="userType">{props.userType}</p>
    </div>
  )
}
