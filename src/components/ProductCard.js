import React, { useEffect, useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { injectStyle } from "react-toastify/dist/inject-style";
import { FaAngleRight } from 'react-icons/fa'

import { database } from '../config/firebase'

if (typeof window !== "undefined") {
    injectStyle();
}

// const ProductCard = ({ price, img, name }) => {
const ProductCard = (props) => {
    let history = useHistory();
    let logedin = localStorage.getItem('loggedIn')
    const [userType, setUserType] = useState('')
    const [cartStoreId, setCartStoreId] = useState("")
    const [openStatus, setOpenStatus] = useState("")
    useEffect(() => {

        var today = new Date()
        var day = today.getDay()
        let userId = localStorage.getItem('userUid');
        setUserType(localStorage.getItem('usertype'))
        database
            .ref("user/" + props.storeId)
            .once("value", async (snapshot) => {
                var data = []
                var row = {}
                snapshot.forEach(element => {
                    row = {
                        "openStatus": element.val().storeHours[day].openStatus,
                    }
                    data.push(row)
                });
                data.push(row)
                setOpenStatus(data[0].openStatus)
            })

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
    // check login status, navigate to detail page
    const selectedItem = () => {
        window.scrollTo(0, 0);
        var touchFlag
        if (localStorage.getItem('loggedIn') === 'true') {
            if (localStorage.getItem('usertype') === 'consumer') {
                if (props.dropAddress !== '') {
                    cartStoreId.length == 0 ? touchFlag = false : cartStoreId[0].storeId == props.storeId ? touchFlag = false : touchFlag = true

                    if (touchFlag == true) {
                        toast("Sorry, you're only able to add items from the same store. Please clear your cart if you'll like to shop at a different store.")
                    } else {
                        history.push(`/selecteditem/${props.opentStatus}_${props.storeId}_${props.id}`);
                    }
                }
                else props.modalPress();
            } else if (localStorage.getItem('usertype') === 'dispensary') {
                console.log("props.id====>", props.id)
                history.push(`/updatestore/${props.id}`);
            } else {
                history.push('/login');
            }
        } else {
            history.push(`/selecteditem/${props.opentStatus}_${props.storeId}_${props.id}`);
            // history.push('/login');
        }
    }
    return (
        // <Link to={`/selecteditem/${props.id}_${props.storeId}`}>
        // <Link to={logedin == 'true' ? userType === "consumer" ? `/selecteditem/${props.storeId}_${props.id}` : '/updatestore' : '/login'}>
        <button disabled={userType === "dispensary" ? false : openStatus === "Closed" || props.itemNum1 === 0 ? true : false} className="sliderButton" onClick={selectedItem} style={{ borderWidth: 0, backgroundColor: 'rgba(52, 52, 52, 0)', alignItems: 'center', opacity: props.itemNum1 === 0 ? 0.5 : userType === "dispensary" ? 1 : openStatus === "Closed" ? 0.5 : 1 }} >
            <div className="product-card">
                <div className="product-card-img">
                    {props.itemNum1 <= 5 ?
                        props.itemNum1 === 0 ? "" :
                            <div className="leftText">Only {props.itemNum1} left</div> :
                        ""
                    }
                    <img src={props.itemImage} alt="" className="productImg" />
                    {/* <span className="product-price">$ {props.priceValue}</span> */}
                    <span className="product-price">
                        {props.itemNum1 === 0 ? "Sold Out" : `$ ${props.priceValue}`}
                    </span>
                </div>
                <div className="product-card-info">
                    <h3>{props.productName}</h3>
                    <span className="product-btn">
                        <FaAngleRight />
                    </span>
                </div>
            </div>
        </button >

    )
}

export default ProductCard
