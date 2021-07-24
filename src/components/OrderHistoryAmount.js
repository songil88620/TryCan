import React, { useEffect, useState } from 'react'
import ProfileModal from './ProfileModal'

import { database } from '../config/firebase'

const OrderHistoryAmount = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const [userData, setuserData] = useState('')
    const modalHandler = () => {
        setModalShow(true)
    }
    useEffect(() => {
        let userId = localStorage.getItem('userUid')

        database
            .ref("user/" + userId + "/consumer")
            .on("value", async (snapshot) => {
                var row
                row = {
                    firstName: snapshot.val().fristName,
                    lastName: snapshot.val().lastName,
                    email: snapshot.val().email,
                }
                setuserData(row)
            })
    }, [])

    return (
        <div className="order-history-amount">
            <h1>Delivered {props.data.placeDate}</h1>
            <div className="order-history-fees">
                <div>
                    <p>Product Total</p>
                    <p className="total-price">${props.data.totalPrice}</p>
                </div>
                <div>
                    <p>Service Fee</p>
                    <p className="total-price">$5.00</p>
                </div>
                <div>
                    <p>Delivery Fee</p>
                    <p className="total-price">$5.00</p>
                </div>
                <div>
                    <p>Sales Tax</p>
                    <p className="total-price">${props.data.salesTax}</p>
                </div>
                <div className="total-amount-paid">
                    <h1>Total Amount Paid:</h1>
                    <h2 className="total-price">${props.data.AllPrice}</h2>
                </div>
            </div>
            <ProfileModal userData={userData} show={modalShow} onHide={() => setModalShow(false)} />
            <button onClick={modalHandler}>Report an issue</button>
        </div>
    )
}
export default OrderHistoryAmount;