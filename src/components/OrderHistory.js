import React, { useEffect, useState } from 'react'
import GoBackButton from './GoBackButton'
import OrderHistoryCard from './OrderHistoryCard'

import { database } from '../config/firebase'

const OrderHistory = (props) => {
    const [orderData, setOrderData] = useState('')
    useEffect(() => {
        let userId = localStorage.getItem('userUid')
        console.log(userId);
        database
            .ref("OrderItems")
            .on("value", async (snapshot) => {
                console.log("snapshot=====>", snapshot);
                var orderedData = []
                snapshot.forEach((element) => {
                    var orderId = element.key
                    if (element.val().hasOwnProperty(userId)) {
                        // orderedData.push(row)
                        var orderStoreId = element.val()[userId]
                        // console.log("orderStoreId=====>", orderStoreId);
                        var result = []
                        Object.keys(orderStoreId).forEach((key) => result.push({ key: orderStoreId[key] }));
                        console.log("result=====>", result);
                        result.forEach((el) => {
                            // console.log("el=====>", el.key);
                            // console.log("orderStoreId====>", orderStoreId);
                            if (el.key.dropStatus == true) {
                                orderedData.push(el.key)
                                console.log("dsadadas===>", orderedData);
                            }
                        })
                    }
                })
                setOrderData(orderedData);
            })
    }, [])

    return (
        <div className="order-history-cont pt-5">

            <div className="order-history-body">
                <div className="order-history-scroll">
                    <h1 className="order-history-title">Order History</h1>
                    <div className="back-cont pt-5"><GoBackButton /></div>
                    {orderData && orderData.map(el => (<OrderHistoryCard key={el.orderId} {...el} />))}
                </div>
            </div>
        </div>
    )
}
export default OrderHistory;