import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import GoBackButton from '../components/GoBackButton'
import ChangePassword from '../components/ChangePassword'
import { useEffect } from 'react'
const ChangeEmailScreen = (props) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <div>
            <Navbar/>
            <div className="profile-info-cont">
                <div className="back-cont"><GoBackButton/></div>
                <ChangePassword />
            </div>
            <Footer/>
        </div>
    )
}
export default ChangeEmailScreen;