import React from 'react'
import WebViewCheckoutForm from '../components/WebViewCheckoutForm'
import { useEffect } from 'react'
const WebViewCheckoutScreen = (props) => {
    let userID = props.match.params.id
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <div className="check-out-screen">
            {/* <h1>{propsInfo}</h1> */}
            <WebViewCheckoutForm userID={userID}/>
            {/* <Navbar/>
            <div className="checkout-img-cont">
                <img src={Image1}/>
            </div>
            <div className="checkout-img-cont2">
                <img src={Image2}/>
            </div>
            <Footer/> */}
        </div>
    )
}
export default WebViewCheckoutScreen;