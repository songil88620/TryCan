import React, { useEffect, useState } from 'react'
import { database } from '../config/firebase'

import OrderStatusInfo from './OrderStatusInfo';
import checkimage from '../images/checkimage.png'
import warningIcon from '../images/warningIcon.png'
const OrderStatus = (props) => {
    const [placeDate, setPlaceDate] = useState("")
    useEffect(() => {
        console.log("=====++++", props.orderStoreId, props.orderId);
        const userID = localStorage.getItem('userUid')
        database
            .ref("OrderItems/" + props.orderStoreId + "/" + userID + "/" + props.orderId)
            .on("value", async (snapshot) => {
                var placeDate = snapshot.val().placeDate
                setPlaceDate(placeDate)
            })
    }, [])
    return (
        <div className="order-status-cont">
            <p className="order-status-title">Thank you, Bud!</p>
            <p className="order-status-description">CannaGo has received your order at {placeDate}</p>
            {/* <p className="order-status-title">You successfully paid $75.67</p> */}
            <p className="order-status-title">You successfully paid ${props.paidValue}</p>
            <p className="order-status-description">Order #{props.orderId}</p>
            <div>
                <img src={checkimage} width="120" height="120" style={{ marginBottom: 20 }} />
            </div>
            <p className="order-status-title">Estimated Delivery: <span style={{ color: "#707070" }}>Next Day</span></p>
            <p className="order-status-description">Please check your email and phone for item updates</p>
            <p className="order-status-title">CannaGo, Let's be buds!</p>
            {
                localStorage.getItem('openStatus') === "false" ?
                    <div className="timeAlert" style={{ marginBottom: 50 }}>
                        <img src={warningIcon} alt="" style={{ width: 16, height: 16 }} />
                        <p style={{ textAlign: "center", padding: 0, fontSize: 12, marginBottom: 50 }}>Order placed after hours</p>
                    </div> : ""
            }
            {/* <OrderStatusInfo
                title="Order Placed"
                body="We have received your order."
                time="11:20 AM, 11/20/2020"
                delivered={true}/>
            <OrderStatusInfo
                title="Order Confirmed"
                body="The store has confirmed your order."
                time="11:22 AM, 11/20/2020"
                delivered={true}/>
            <OrderStatusInfo
                title="Order En Route"
                body="Your order is being delivered."
                time="10:03 AM, 11/21/2020"
                delivered={true}/>
            <OrderStatusInfo
                title="Order Delivered"
                body="Your order has been dropped off."
                time="10:32 AM, 11/21/2020"/> */}
            {/* <button className="message-driver">Message Driver</button> */}
        </div>
    )
}
export default OrderStatus;