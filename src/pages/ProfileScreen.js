import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import DispensaryNavbar from '../components/DispensaryNavbar'
import ProfileSettings from '../components/ProfileSettings'
import GoBackButton from '../components/GoBackButton'

const ProfileScreen = () => {
    let location = useLocation()
    let history = useHistory()
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    useEffect(() => {
        if (localStorage.getItem('loggedIn') != 'true') {
            history.push('/')
        }
    }, [])
    const [userType] = useState(localStorage.getItem('usertype'))
    const [orderShow, setOrderShow] = useState('')
    return (
        <div>
            {userType === 'consumer' ? <Navbar /> : <DispensaryNavbar setdata={setOrderShow} />}
            <div className="back-cont mt30"><GoBackButton /></div>
            <ProfileSettings data={orderShow} role={userType} />
            <Footer />
        </div>
    )
}
export default ProfileScreen;