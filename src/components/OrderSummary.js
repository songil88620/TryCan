import React, { useEffect, useState } from 'react'
import { database } from '../config/firebase'
import atl_zipCode from '../constants/zipCode'
const OrderSummary = () => {
    const [total, setTotal] = useState(0);
    const [items, setItems] = useState([])
    const [zip, setZip] = useState([])
    const [taxFee, setTaxFee] = useState(0)
    useEffect(() => {
        let userID = localStorage.getItem('userUid')
        // localStorage.getItem('zip') && setZip(localStorage.getItem('zip'))
        let zipCode = localStorage.getItem('zip')
        if (atl_zipCode.zip700.indexOf(zipCode) >= 0) {
            setTaxFee(0.07)
        } else if (atl_zipCode.zip775.indexOf(zipCode) >= 0) {
            setTaxFee(0.0775)
        } else if (atl_zipCode.zip800.indexOf(zipCode) >= 0) {
            setTaxFee(0.08)
        } else {
            setTaxFee(0.089)
        }
        database
            .ref("Carts/" + userID)
            .on("value", (snapshot) => {
                var data = []
                var row
                snapshot.forEach(element => {
                    row = {
                        "Description": element.val().Description,
                        "GpriceValue": element.val().GpriceValue,
                        "Tag": element.val().Tag,
                        "feeValue": element.val().feeValue,
                        "id": element.key,
                        "itemImage": element.val().itemImage,
                        "itemNum1": element.val().itemNum1,
                        "priceValue": element.val().priceValue,
                        "productName": element.val().productName,
                        "num": element.val().num,
                        "coaImage": element.val().coaImage,
                        "storeId": element.val().storeId,
                    }
                    data.push(row)
                });
                // console.log("_____________+++++++++++++_________________");
                // console.log(data)
                setItems(data)
                let totalAmount = 0;
                data
                    .map((item) => {
                        totalAmount = totalAmount + (item.priceValue * item.num);
                        setTotal(totalAmount)
                    })
            })
    }, [])
    return (
        <div className="order-summary-cont">
            <div className="order-summary-head">
                <p>Order Summary</p>
            </div>
            <div className="order-summary-body">
                {items
                    .map((item) => <div key={item.id} className="order-summary-order">
                        <p>{item.productName} x{item.num}</p>
                        <p>${parseFloat(item.priceValue * item.num).toFixed(2)}</p>
                    </div>)}
                <div className="order-summary-order">
                    <p>Service Fee</p>
                    <p>$5.00</p>
                </div>
                <div className="order-summary-order">
                    <p>Delivery Fee</p>
                    <p>$5.00</p>
                </div>
                <div className="order-summary-order">
                    <p>State and Sales Tax</p>
                    <p>${((total) * taxFee).toFixed(2)}</p>
                </div>
            </div>
            <div className="order-summary-total">
                <div className="order-summary-order">
                    <p>Total Amount</p>
                    <p className="total-amount">${parseFloat(total + total * taxFee + 10).toFixed(2)}</p>
                </div>
            </div>
        </div>
    )
}
export default OrderSummary;
