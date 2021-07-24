import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import GoBackButton from '../components/GoBackButton'
import ProfileInfo from '../components/ProfileInfo'
import { useEffect } from 'react'
const ProfileInformationScreen = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <div>
            <Navbar/>
            <div className="profile-info-cont">
                <div className="back-cont"><GoBackButton/></div>
                <ProfileInfo/>
            </div>
            <Footer/>
        </div>
    )
}
export default ProfileInformationScreen;