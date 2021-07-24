import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CheckoutForm from '../components/CheckoutForm'
import Image1 from '../images/checkout-1.png'
import Image2 from '../images/checkout-2.png'
import { useEffect } from 'react'
const CheckoutScreen = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <div className="check-out-screen">
            <Navbar/>
            <CheckoutForm/>
            <div className="checkout-img-cont">
                <img src={Image1}/>
            </div>
            <div className="checkout-img-cont2">
                <img src={Image2}/>
            </div>
            <Footer/>
        </div>
    )
}
export default CheckoutScreen;