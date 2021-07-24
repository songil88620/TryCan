import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import BG from '../images/order-history-img.png'
import OrderHistory from '../components/OrderHistory'

const OrderHistoryScreen = () => {
    const [orderData, setOrderData] = useState('')
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <div className="overflow-none">
            <Navbar />
            <div className="order-image-cont">
                <img src={BG} />
            </div>
            <OrderHistory />

            <Footer />
        </div>
    )
}
export default OrderHistoryScreen;