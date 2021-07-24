import React from 'react'
import Navbar from '../components/Navbar'
import DispensaryNavbar from '../components/DispensaryNavbar'
import Footer from '../components/Footer'
import GoBackButton from '../components/GoBackButton'
import { useEffect } from 'react'
const RefundShippingScreen = (props) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <div>
            {localStorage.getItem('loggedIn') === 'true' ? localStorage.getItem('usertype') === "consumer" ? <Navbar /> : <DispensaryNavbar /> : <Navbar />}
            <div className="profile-info-cont">
                <div className="back-cont"><GoBackButton /></div>
                <h1 style={{ marginLeft: '15%', marginTop: 12 }}>FDA Disclaimer</h1>
                <p style={{ width: '85%', marginLeft: '7.5%', marginTop: 50, fontSize: 13, paddingBottom: 200 }}>
                    The Statements made regarding these products have not been evaluated by the Food and Drug administration.
                    The efficacy of these products has not been confirmed by FDA-approved research.
                    These products are not intended to diagnose, treat, cure or prevent any disease.
                    All information presented here is not meant as a substitute for or alternative to information from health care practitioners.
                    Please consult your health care professional about potential interactions or other possible complications before using any product.
                    The Federal Food, Drug, and Cosmetic Act requires this notice.
                </p>
            </div>
            <div className="fedFooter">
                <Footer />
            </div>
        </div>
    )
}
export default RefundShippingScreen;