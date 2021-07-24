import React, { useEffect, useState } from 'react'
import SignUpForm from '../components/SignUpForm'
import DispensarySignUpForm from '../components/DispensarySignUpForm'
import DriverSignUpForm from '../components/DriverSignUpForm'
import greenPhone from '../images/greenPhone.png'
import maple from '../images/maple2.png'
import DispensaryStations from '../components/DispensaryStations'
import Profile from '../components/Profile'
import GoBackButton from '../components/GoBackButton'
import Avatar from '../images/avatar.png'
// import DispensaryNavbar from '../components/DispensaryNavbar'

export default function SignupScreen() {
  const [userType, setUserType] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    setUserType(localStorage.getItem('usertype'))
  }, [])

  return (
    <>
    <div className="back-cont-login"><GoBackButton/></div>
      {
        userType === 'consumer' &&
        <section className="section">
          <SignUpForm />
          <div className="greenArea2"><img src={greenPhone} alt="green" className="greenPhone" /></div>
          <div className="mapleArea"><img src={maple} alt="green" className="maple" /></div>
          <div className="mapleArea2"><img src={greenPhone} alt="green" className="greenPhone2" /></div>
        </section>
      }
      {
        userType === 'dispensary' &&
        <>
          {/* <div className="shopping-station-cont">
            <div className="back-cont"><GoBackButton /></div>
            <DispensaryStations />
          </div> */}
          <DispensarySignUpForm />
        </>
      }
      {
        userType === 'driver' &&
        <>
          {/* <DispensaryNavbar /> */}
          <div className="shopping-station-cont">
            <div className="back-cont"><GoBackButton /></div>
            <Profile src={Avatar} />
          </div>
          <DriverSignUpForm />
        </>
      }
    </>
  )
}
