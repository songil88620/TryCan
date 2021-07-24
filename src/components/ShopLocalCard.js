import React, { useEffect, useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { injectStyle } from "react-toastify/dist/inject-style";

import { database } from '../config/firebase'

if (typeof window !== "undefined") {
    injectStyle();
}
// const ShopLocalCard = ({img, name, hours}) => {
// const ShopLocalCard = ({ ImageUrl, store, startTime, endTime, id, dropAddress, modalHandler }) => {
const ShopLocalCard = (props) => {
    let history = useHistory();

    var today = new Date()
    var today_Hour = today.getHours()
    var today_minute = today.getMinutes();
    var now_Mins = today_Hour * 60 + today_minute

    const [timeopentStatus, setTimeopentStatus] = useState(false);

    const [cartStoreId, setCartStoreId] = useState("")
    useEffect(() => {
        let userId = localStorage.getItem('userUid');

        var start_Time = props.startTime.split(" ")[0]
        var flag_start_Time = props.startTime.split(" ")[1]
        var end_Time = props.endTime.split(" ")[0]
        var flag_end_Time = props.endTime.split(" ")[1]
        var start_Time_Mins = flag_start_Time === "AM" ? parseInt(start_Time.split(":")[0]) * 60 + parseInt(start_Time.split(":")[1]) : (parseInt(start_Time.split(":")[0]) + 12) * 60 + parseInt(start_Time.split(":")[1])
        var end_Time_Mins = flag_end_Time === "PM" ? (parseInt(end_Time.split(":")[0]) + 12) * 60 + parseInt(end_Time.split(":")[1]) : parseInt(end_Time.split(":")[0]) * 60 + parseInt(end_Time.split(":")[1])
        if (now_Mins >= start_Time_Mins && now_Mins <= end_Time_Mins) {
            setTimeopentStatus(true)
        } else {
            setTimeopentStatus(false)
        }

        database
            .ref("Carts/" + userId)
            .once("value", async (snapshot) => {
                var data = []
                var row
                snapshot.forEach(element => {
                    row = {
                        "storeId": element.val().storeId,
                    }
                    data.push(row)
                });
                setCartStoreId(data)
            })
    }, [props])

    // useEffect(() => {
    //     props.reFresh();
    // }, [timeopentStatus])
    const storeOnline = () => {
        var touchFlag
        if (localStorage.getItem('loggedIn') == 'true') {
            if (localStorage.getItem('usertype') === 'consumer') {
                // return `/storeonline/${id}`
                if (props.dropAddress !== '') {
                    cartStoreId.length == 0 ? touchFlag = false : cartStoreId[0].storeId == props.id ? touchFlag = false : touchFlag = true

                    if (touchFlag == true) {
                        toast("Sorry, you're only able to add items from the same store. Please clear your cart if you'll like to shop at a different store.")
                    } else {
                        history.push(`/storeonline/${timeopentStatus}_${props.id}`);
                    }
                }
                else props.modalPress();
            } else {
                history.push('/login');
                // return `login`
            }
        } else {
            // history.push(`/storeonline/${timeopentStatus}_${props.id}`);
            history.push('login')
            // return `login`
        }

    }
    return (
        // <Link to={storeOnline}>
        // <button disabled={timeopentStatus === false ? true : false} onClick={storeOnline} style={{ backgroundColor: 'white', borderWidth: 0, opacity: timeopentStatus === false ? 0.5 : 1 }}>
        <button onClick={storeOnline} style={{ backgroundColor: 'white', borderWidth: 0 }}>
            <div className="shop-local-card">
                <h2 style={{ color: 'black' }}>{props.store.length >14? props.store.substr(0, 15)+"...": props.store}</h2>
                <div className="shop-local-card-wrapper">
                    <img src={props.ImageUrl} alt="" className="slideImg" />
                    <div className="shop-local-card-info">
                        {/* <span>Store’s Pricing: $</span> */}
                        <span>{props.openStatus === "Closed" ? "Shop after hours" : timeopentStatus === true ? `Hours Today: ${props.startTime} - ${props.endTime}` : "Shop after hours"}</span>
                    </div>
                </div>
            </div>
            {/* <ToastContainer /> */}
        </button>
    )
}

export default ShopLocalCard
