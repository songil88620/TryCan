import React from 'react'
import Footer from '../components/Footer'
import Experience from '../components/Experience'
import Navbar from '../components/Navbar'
import { useEffect } from 'react'
const OrderExperience = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <div>
            <Navbar/>
            <Experience/>
            <Footer/>
        </div>
    )
}
export default OrderExperience;