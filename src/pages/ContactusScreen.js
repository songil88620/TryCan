import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import DispensaryNavbar from '../components/DispensaryNavbar'
import Footer from '../components/Footer'
import GoBackButton from '../components/GoBackButton'
import { useEffect } from 'react'
import { database } from '../config/firebase'

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { injectStyle } from "react-toastify/dist/inject-style";

if (typeof window !== "undefined") {
    injectStyle();
}

const ContactusScreen = (props) => {

    let userId = localStorage.getItem('userUid')
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const Submit = () => {
        if (fullName === "" || email === "" || subject === "" || message === "") {
            toast("Please fill all fields.")
        } else {
            var newContactMessageKey = database.ref().child('contactMessage').push().key;
            database.ref('ContactMessage/' + userId + '/' + newContactMessageKey).update({
                id: newContactMessageKey,
                fullName: fullName,
                email: email,
                subject: subject,
                message: message,
            });
            toast("Your message was sent correctly.")
        }
    }

    return (
        <div>
            {localStorage.getItem('loggedIn') === 'true' ? localStorage.getItem('usertype') === "consumer" ? <Navbar /> : <DispensaryNavbar /> : <Navbar />}
            <div className="contactusarea">
                <h1 style={{ marginLeft: '12.5%', marginTop: 60 }}>Contact Us</h1>
                <div className="contactus-form">
                    <div className="contactus-form-section">
                        <div className="about-form-card">
                            <p>Full name</p>
                            <input className="contactus-input" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Full name" type="text" />
                        </div>
                        <div className="about-form-card">
                            <p >Email</p>
                            <input className="contactus-input" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" />
                        </div>
                    </div>
                    <div className="contactus-form-section">
                        <div className="about-form-card">
                            <p >Subject</p>
                            <input className="contactus-input" value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject" type="text" />
                        </div>
                        <div className="about-form-card">
                            <p >Message</p>
                            <textarea className="contactus-textarea" value={message} onChange={e => setMessage(e.target.value)} placeholder="Message" type="text" />
                        </div>
                    </div>
                </div>
                <div className="contactusbutton">
                    <button className="contactus-form-submit" type="submit" onClick={Submit}>Submit</button>
                </div>
                <ToastContainer />
            </div>
            <Footer />
        </div>
    )
}
export default ContactusScreen;