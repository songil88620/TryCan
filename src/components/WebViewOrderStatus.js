import React, { useEffect, useState } from 'react'
import { database } from '../config/firebase'

import OrderStatusInfo from './OrderStatusInfo';
import checkimage from '../images/checkimage.png'
import warningIcon from '../images/warningIcon.png'
const WebViewOrderStatus = (props) => {
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
        <div className="webview-order-status-cont">
            <p className="order-status-title">Thank you, Bud!</p>
            <p className="webview-order-status-description">CannaGo has received your order at {placeDate}</p>
            <p className="webview-order-status-title">You successfully paid ${props.paidValue}</p>
            <p className="webview-order-status-description">Order #{props.orderId}</p>
            <div>
                <img src={checkimage} width="100" height="100" style={{ marginBottom: 20 }} />
            </div>
            <p className="webview-order-status-title">Estimated Delivery: <span style={{ color: "#707070" }}>Next Day</span></p>
            <p className="webview-order-status-description">Please check your email and phone for item updates</p>
            <p className="order-status-title">CannaGo, Let's be buds!</p>
            {
                localStorage.getItem('openStatus') === "false" ?
                    <div className="timeAlert" style={{ marginBottom:50 }}>
                        <img src={warningIcon} alt="" style={{ width: 16, height: 16 }} />
                        <p style={{ textAlign: "center", padding: 0, fontSize: 12, marginBottom:50 }}>Order placed after hours</p>
                    </div> : ""
            }
        </div>
    )
}
export default WebViewOrderStatus;