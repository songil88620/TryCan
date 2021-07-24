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
            {localStorage.getItem('loggedIn') === 'true'? localStorage.getItem('usertype') === "consumer" ? <Navbar /> : <DispensaryNavbar />:<Navbar />}
            <div className="profile-info-cont">
                <div className="back-cont"><GoBackButton /></div>
                <h1 style={{ marginLeft: '15%', marginTop: 12 }}>Refund & shipping</h1>
                <p style={{ width: '85%', marginLeft: '7.5%', marginTop: 15, fontSize: 13, paddingBottom: 100 }}>RETURN POLICY<br /><br />
                Last updated January 24, 2021<br /><br />
                Thank you for your purchase. We hope you are happy with your purchase. However, if you are not completely satisfied with your purchase for any reason, you may return it to us for a full refund or an exchange. Please see below for more information on our return policy.<br /><br />
                RETURNS<br /><br />
                All returns must be postmarked within three (3) days of the purchase date. All returned items must be in new and unused condition, with all original tags and labels attached.<br /><br />
                RETURN PROCESS<br />
                To return an item, please email customer service at hello@trycannago.com to obtain a Return Merchandise Authorization (RMA) number. After receiving a RMA number, place the item securely in its original packaging and include your proof of purchase, and mail your return to the following address:<br />
                CannaGo, LLC<br />
                Attn: Returns<br />
                RMA #<br />
                227 Sandy Springs Place STE D #137,<br />
                Atlanta, GA 30328<br />
                United States<br />
                You may also use the prepaid shipping label enclosed with your package. Return shipping charges will be paid or reimbursed by us.<br /><br />
                REFUNDS<br />
                After receiving your return and inspecting the condition of your item, we will process your return or exchange. Please allow at least seven (7) days from the receipt of your item to process your return or exchange. We will notify you by email when your return has been processed.<br /><br />
                EXCEPTIONS<br />
                The following items cannot be returned or exchanged:<br /><br />
                Items that have been opened<br />
                Items that have shown signs of tampering on box or item itself<br />
                For defective or damaged products, please contact us at the customer service number below to arrange a refund or exchange.<br /><br />
                QUESTIONS<br />
                If you have any questions concerning our return policy, please contact us at:</p>
            </div>
            <Footer />
        </div>
    )
}
export default RefundShippingScreen;