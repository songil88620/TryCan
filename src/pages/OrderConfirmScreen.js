import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import DispensaryNavbar from '../components/DispensaryNavbar'
import GoBackButton from '../components/GoBackButton'
import OrderConfirmWrapper from '../components/OrderConfirmWrapper'

function OrderConfirmScreen() {
  let location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log('location must be OrderConfirm =>', location.pathname, location.state);
  }, [])
  return (
    <>
      <DispensaryNavbar />
      <div className="back-cont mt30"><GoBackButton /></div>
      <OrderConfirmWrapper usertype={location.state} />
      {/* <Footer /> */}
    </>
  )
}

export default OrderConfirmScreen
