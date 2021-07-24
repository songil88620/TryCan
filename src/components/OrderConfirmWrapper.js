import React, { useState, useEffect } from 'react'
import OrderConfirm from './OrderConfirm'

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from 'react-bootstrap/Spinner'
import { injectStyle } from "react-toastify/dist/inject-style";

import { database } from '../config/firebase'

if (typeof window !== "undefined") {
  injectStyle();
}

function OrderConfirmWrapper(props) {
  const [orderData, setOrderData] = useState('')
  const [completedData, setCompletedData] = useState('')
  const [userData, setuserData] = useState('')
  let userId = localStorage.getItem('userUid')
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    let oderId
    console.log(userId);
    database
      .ref("OrderItems/" + userId)
      .on("value", async (snapshot) => {
        setLoading(false)
        var orderedData = []
        var completedData = []
        var row
        await snapshot.forEach((element) => {
          let orderUserId = element.key
          element.forEach((el) => {
            // console.log("el=====>", el.val());
            row = {
              "firstName": el.val().firstName,
              "lastName": el.val().lastName,
              "email": el.val().email,
              "phoneNum": el.val().phoneNum,
              "confirmDate": el.val().confirmDate,
              "confirmStatus": el.val().confirmStatus,
              "deliveryDate": el.val().deliveryDate,
              "deliveryStatus": el.val().deliveryStatus,
              "dropDate": el.val().dropDate,
              "dropStatus": el.val().dropStatus,
              "placeDate": el.val().placeDate,
              "placeStatus": el.val().placeStatus,
              "allPrice": el.val().AllPrice,
              "oderId": el.key,
              "orderItem": el.val().orderItem,
              "totalPrice": el.val().totalPrice,
              "refId": el.val().refId,
              "pendingStatus": el.val().pendingStatus,
              "refTransID": el.val().refTransID,
              "dropStreet": el.val().dropStreet,
              "dropCity": el.val().dropCity,
              "dropZip": el.val().dropZip,
              "promo": el.val().promo,
              "specialIns": el.val().specialIns,
            };
            row.orderUserId = orderUserId
            var dropStatus = row.dropStatus
            var placeStatus = row.placeStatus
            var pendingStatus = row.pendingStatus
            oderId = row.oderId
            // console.log("oderId===>", oderId);
            if (dropStatus == false && placeStatus == true && pendingStatus == "Authorized") {
              orderedData.push(row)
            } else if (dropStatus == true && placeStatus == true && pendingStatus == "Captured") {
              completedData.push(row)
            }
          })
        })
        setOrderData(orderedData);
        setCompletedData(completedData);
      })
  }, [])

  return (
    <div className="order-cont-wrapper">
      {
        loading ?
          <Spinner animation="border" variant="primary" className="loading-border" />
          :
          <div>
            <div className="order-cont" id="orderHistory">
              <div className="addToStore mt90">
                <h1 className="mb10">Orders to Confirm</h1>
              </div>
              {orderData !== '' && orderData !== null && orderData.length !== 0 ? orderData.map(el => (<OrderConfirm key={el.oderId} {...el} qty2={1} usertype={props.usertype} userData={userData} />)) :
                <div className="mt90">
                  <h2 className="mb10" style={{ color: '#61D270' }}>There is no order to confirm</h2>
                </div>}
              <div className="addToStore mt90">
                <h1 className="mb10">Order History</h1>
              </div>
              {orderData !== '' && completedData !== null && completedData.length !== 0 ? completedData.map(el => (<OrderConfirm key={el.oderId} {...el} price1='$12.55' paid usertype={props.usertype} userData={userData} />))
                : <div className="mt90">
                  <h2 className="mb10" style={{ color: '#61D270' }}>There is no order history</h2>
                </div>
              }
            </div>
            <ToastContainer />
          </div>
      }
    </div>
  )
}

export default OrderConfirmWrapper
