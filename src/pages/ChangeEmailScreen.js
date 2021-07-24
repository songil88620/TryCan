import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import GoBackButton from '../components/GoBackButton'
import ChangeEmail from '../components/ChangeEmail'
import { useEffect } from 'react'
const ChangePasswordScreen = (props) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <div>
            <Navbar/>
            <div className="profile-info-cont">
                <div className="back-cont"><GoBackButton/></div>
                <ChangeEmail />
            </div>
            <Footer/>
        </div>
    )
}
export default ChangePasswordScreen;