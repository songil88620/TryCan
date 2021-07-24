import React from 'react'
import DispensaryNavbar from '../components/DispensaryNavbar'
import DispensaryInfoForm from '../components/DispensaryInfoForm'
import Footer from '../components/Footer'
import GoBackButton from '../components/GoBackButton'
import { useEffect } from 'react'

function DispensaryInfoScreen() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <>
      <DispensaryNavbar />
      <div className="back-cont mt30"><GoBackButton /></div>
      <DispensaryInfoForm />
      <Footer />
    </>
  )
}

export default DispensaryInfoScreen
