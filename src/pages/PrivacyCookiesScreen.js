import React from 'react'
import Navbar from '../components/Navbar'
import DispensaryNavbar from '../components/DispensaryNavbar'
import Footer from '../components/Footer'
import GoBackButton from '../components/GoBackButton'
import { useEffect } from 'react'
const PrivacyCookiesScreen = (props) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <div>
            {localStorage.getItem('loggedIn') === 'true'? localStorage.getItem('usertype') === "consumer" ? <Navbar /> : <DispensaryNavbar />:<Navbar />}
            <div className="profile-info-cont">
                <div className="back-cont"><GoBackButton /></div>
                <h1 style={{ marginLeft: '15%', marginTop: 12  }}>PRIVACY & COOKIES</h1>
                <p style={{ width: '85%', marginLeft: '7.5%', marginTop: 15, fontSize: 13, paddingBottom:100 }}>Your privacy is important to us. It is CannaGo, LLC’s policy to respect your privacy regarding any information we may collect from you across our website, http://www.trycannago.com, and other sites we own and operate.<br /><br />
                We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.<br /><br />
                We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.<br /><br />
                We don’t share any personally identifying information publicly or with third-parties, except when required to by law.<br /><br />
                Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.<br /><br />
                You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.<br /><br />
                Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.<br /><br />
                This policy is effective as of 24 January 2021.<br /><br />
                Privacy Policy created with GetTerms.<br /><br />
                Privacy Policy<br />
                Your privacy is important to us. It is CannaGo, LLC’s policy to respect your privacy regarding any information we may collect from you across our website, http://www.trycannago.com, and other sites we own and operate.<br /><br />
                We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.<br /><br />
                We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.<br /><br />
                We don’t share any personally identifying information publicly or with third-parties, except when required to by law.<br /><br />
                Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.<br /><br />
                You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.<br /><br />
                Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.<br /><br />
                This policy is effective as of 24 January 2021.</p>
            </div>
            <Footer />
        </div>
    )
}
export default PrivacyCookiesScreen;