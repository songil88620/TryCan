import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import StoreSettings from '../components/StoreSettings'
import Footer from '../components/Footer'
import DispensaryNavbar from '../components/DispensaryNavbar'

const DispensaryLandingScreen = () => {
  let history = useHistory()
  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem('loggedIn') != 'true') {
      history.push('/')
    }
  }, [])
  return (<div> <DispensaryNavbar /> <StoreSettings /> <Footer /> </div>)
}

export default DispensaryLandingScreen
