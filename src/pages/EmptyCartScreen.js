import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Plus from '../images/plus-sign.svg'
import ShopLocal from '../components/ShopLocal'
import Footer from '../components/Footer'
import { useHistory } from "react-router-dom";
import { database } from '../config/firebase'

const EmptyCartScreen = () => {
    const [storeData, setStoreData] = useState([])
    useEffect(() => {
        window.scrollTo(0, 0);
        var today = new Date()
        var day = today.getDay()
        // Fetching store data
        database
            .ref("user")
            .on("value", async (snapshot) => {
                var data = []
                var row = {}
                snapshot.forEach(element => {
                    if (element.val().hasOwnProperty('dispensary')) {
                        let el = element.val().dispensary
                        row = {
                            id: element.key,
                            store: el.storeName,
                            ImageUrl: el.profileimage,
                            usertype: el.userType,
                            startTime: el.storeHours[day].startTime,
                            endTime: el.storeHours[day].endTime,
                        }
                        data.push(row)
                    }
                });
                setStoreData(data)
            })
    }, [])
    let history = useHistory();
    const cart = () => {
        history.push("/");
    }
    return (
        <div>
            <Navbar />
            <div className="empty-cart-cont">
                <button onClick={cart} className="plus-btn"><img src={Plus} /></button>
                <p className="empty-card-text">Shopping Cart Empty</p>
            </div>
            <ShopLocal data={storeData} />
            <Footer />
        </div>
    )
}
export default EmptyCartScreen;