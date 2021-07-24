import React, { useEffect } from 'react'
import WebViewOrderConfirmWrapper from '../components/WebViewOrderConfirmWrapper'

function WebViewOrderConfirmScreen(props) {
  let userID = props.match.params.id
  useEffect(() => {
    localStorage.setItem('userUid', userID)
    console.log(userID);
    window.scrollTo(0, 0);
  }, [])
  return (
    <>
      {/* <DispensaryNavbar /> */}
      {/* <div className="back-cont mt30"><GoBackButton /></div> */}
      <WebViewOrderConfirmWrapper userID={userID} usertype="dispensary" />
      {/* <Footer /> */}
    </>
  )
}

export default WebViewOrderConfirmScreen
