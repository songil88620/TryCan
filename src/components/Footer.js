import React from 'react'
import { AiFillInstagram } from 'react-icons/ai'
import { useHistory } from "react-router-dom";


const Footer = () => {

    let history = useHistory();

    const TermsConditions = () => {
        history.push("/termsconditions")
    }
    const PrivacyCookies = () => {
        history.push("/privacycookies")
    }
    const RefundShipping = () => {
        history.push("/refundshipping")
    }
    const Fed = () => {
        history.push("/fed")
    }
    const AboutUs = () => {
        history.push("/aboutus")
    }

    return (
        <footer className="footer">
            <div className="my-container">
                <div className="footer-wrapper">
                    <div className="footer-item">
                        <button onClick={AboutUs} className="footer-link">ABOUT US</button>
                        <button onClick={TermsConditions} className="footer-link">TERMS & CONDITIONS</button>
                        <button onClick={PrivacyCookies} className="footer-link">PRIVACY & COOKIES</button>
                        {/* <a href="/" className="footer-link">AFFILIATES</a>
                        <a href="/" className="footer-link">ADVERTISING</a> */}
                        <button onClick={RefundShipping} className="footer-link">Refund & shipping</button>
                        <button onClick={Fed} className="footer-link">FDA Disclaimer</button>
                    </div>
                    <div className="footer-item">
                        <p className="footer-link-des">Product(s) have not been reviewed by the food and drug administration.</p>
                        {/* <form action="" className="footer-form">
                            <div className="form-group">
                                <input type="email" placeholder="Your Email" />
                                <button type="submit">submit</button>
                            </div>
                        </form>
                        <a href="/" className="footer-social"><AiFillInstagram /></a> */}
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
