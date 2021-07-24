import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { database } from '../config/firebase'
import dayjs from 'dayjs';
import authorizeCreditCard from '../payment/PaymentTransactions/authorize-credit-card';
import Spinner from 'react-bootstrap/Spinner'

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { injectStyle } from "react-toastify/dist/inject-style";
import atl_zipCode from '../constants/zipCode'

import warningIcon from '../images/warningIcon.png'

if (typeof window !== "undefined") {
    injectStyle();
}
const CheckoutForm = () => {
    let history = useHistory();
    const submitHandler = e => {
        e.preventDefault();
        history.push("/orderstatus");
    }
    const [cvc, setCvc] = useState("");
    const [card, setCard] = useState("");
    const [exp, setExp] = useState("");
    const [zip, setZip] = useState("");
    const [cardZip, setCardZip] = useState("");
    const [city, setCity] = useState("");
    const [disStreet, setDisStreet] = useState("");
    const [total, setTotal] = useState(0);
    const [items, setItems] = useState([]);
    const [placeDate, setPlaceDate] = useState("");
    const [placeStatus, setPlaceStatus] = useState(true);
    const [confirmDate, setConfirmDate] = useState("");
    const [confirmStatus, setConfirmStatus] = useState(false);
    const [deliveryDate, setDeliveryDate] = useState("");
    const [deliveryStatus, setDeliveryStatus] = useState(false);
    const [dropDate, setDropDate] = useState("");
    const [dropStatus, setDropStatus] = useState(false);
    const [taxFee, setTaxFee] = useState(0)
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [promo, setPromo] = useState('')
    const [specialIns, setSpecialIns] = useState('')

    let dispensaryEmail = ""
    let disOwnerName = ""
    let storeZipCode = ""

    const result = (res) => {
        setLoading(false);
        let resultCode = res.messages.resultCode
        console.log(resultCode);
        let refTransID
        if (res.transactionResponse.refTransID == "") {
            refTransID = res.transactionResponse.transId
        } else {
            refTransID = res.transactionResponse.refTransID
        }
        console.log("refTransID======>", res.transactionResponse.transId);
        let refId = res.refId
        //getting place date
        let today = dayjs(new Date()).format('hh:mm A MM/DD/YYYY');
        setPlaceDate(dayjs(today).format('hh:mm A MM/DD/YYYY'));

        // saving order data into firebase 
        if (resultCode == "Ok") {
            var newOrderKey = database.ref().child('OrderItems').push().key;
            if (localStorage.getItem('openStatus') == "false") {
                database.ref(`CheckoutedOrder/${userID}/${newOrderKey}`).update({
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    checkoutedStatus: true,
                    orderId: newOrderKey,
                    orderDate: today,
                    openStatus: false,
                    dispensaryEmail: dispensaryEmail,
                    disOwnerName: disOwnerName,
                    AllPrice: parseFloat(total + total * taxFee + 10).toFixed(2),
                    orderItem: items,
                    salesTax: (total * taxFee).toFixed(2),
                    delivereyStreet: disStreet,
                    devliveryCity: city,
                    devliveryZip: zip,
                });
            } else {
                database.ref(`CheckoutedOrder/${userID}/${newOrderKey}`).update({
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    checkoutedStatus: true,
                    orderId: newOrderKey,
                    orderDate: today,
                    openStatus: true,
                    dispensaryEmail: dispensaryEmail,
                    disOwnerName: disOwnerName,
                    AllPrice: parseFloat(total + total * taxFee + 10).toFixed(2),
                    orderItem: items,
                    salesTax: (total * taxFee).toFixed(2),
                    delivereyStreet: disStreet,
                    devliveryCity: city,
                    devliveryZip: zip,
                });
            }
            database.ref('Carts/' + userID).remove();
            const id = parseFloat(total + total * taxFee + 10).toFixed(2)
            database
                .ref('OrderItems/' + items[0].storeId)
                .update({
                    checked: false,
                });
            database
                .ref('OrderItems/' + items[0].storeId + '/' + userID + '/' + newOrderKey)
                .update({
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    phoneNum: userData.phoneNum,
                    dropStreet: userData.dropStreet,
                    dropCity: userData.dropCity,
                    dropZip: userData.dropZip,
                    orderId: newOrderKey,
                    orderItem: items,
                    placeDate: today,
                    placeStatus: placeStatus,
                    confirmDate: confirmDate,
                    confirmStatus: confirmStatus,
                    deliveryDate: deliveryDate,
                    deliveryStatus: deliveryStatus,
                    dropDate: dropDate,
                    dropStatus: dropStatus,
                    AllPrice: parseFloat(total + total * taxFee + 10).toFixed(2),
                    salesTax: (total * taxFee).toFixed(2),
                    totalPrice: total.toFixed(2),
                    refTransID: refTransID,
                    refId: refId,
                    pendingStatus: "Authorized",
                    promo: promo,
                    specialIns: specialIns,
                });
            history.push(`/orderstatus/${id}_${items[0].storeId}_${newOrderKey}`);
        } else {
            toast('Oops, something went wrong. Please check card information again!')
        }
    }

    const userID = localStorage.getItem('userUid')
    useEffect(() => {
        database
            .ref("user/" + userID + "/consumer")
            .on("value", async (snapshot) => {
                var row
                row = {
                    firstName: snapshot.val().fristName,
                    lastName: snapshot.val().lastName,
                    email: snapshot.val().email,
                    dropStreet: snapshot.val().dropStreet,
                    dropCity: snapshot.val().dropCity,
                    dropZip: snapshot.val().dropZip,
                    phoneNum: snapshot.val().phoneNum,
                }
                console.log("row--------->", row)
                setZip(row.dropZip)
                setDisStreet(row.dropStreet)
                setCity(row.dropCity)
                setUserData(row)
            })

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
            .once("value", (snapshot) => {
                var data = []
                var row
                snapshot.forEach(element => {
                    if (element.val().variantRealArray != null) {
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
                            "itemId": element.val().itemId,
                            "variantRealArray": element.val().variantRealArray,
                            "variantIndex": element.val().variantIndex,
                            "addValue": element.val().addValue,
                        }
                    } else {
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
                            "itemId": element.val().itemId,
                            "addValue": element.val().addValue,
                        }
                    }
                    data.push(row)
                });
                setItems(data)
                let totalAmount = 0;
                data
                    .map((item) => {
                        totalAmount = totalAmount + (item.priceValue * item.num);
                        setTotal(totalAmount)
                    })
            })
    }, [])

    const expHandler = e => {
        let value = e.nativeEvent.data;
        if ((value >= 0 && value <= 9)) {
            if (e.target.value.length === 2 && !e.target.value.includes('/')) {
                e.target.value += "/"
            }
            else if (e.target.value.length === 1 && e.target.value.includes('/')) {
                e.target.value = "";
            }
            setExp(e.target.value)

        }
    }
    const cvcHandler = e => {
        const { value, maxLength } = e.target;
        const message = value.slice(0, maxLength);
        setCvc(message);
    }
    
    const cardInput = e => {
        let value = e.nativeEvent.data;
        if ((value >= 0 && value <= 9) || value === " ") {
            setCard(e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim());
        }
    }

    const checkOut = () => {
        database.ref('user/' + items[0].storeId + '/dispensary')
            .on("value", (snapshot) => {
                console.log("snapshot.val()======>", snapshot.val());
                console.log("snapshot.val().email======>", snapshot.val().email);
                dispensaryEmail = snapshot.val().email;
                disOwnerName = snapshot.val().fristName;
                storeZipCode = snapshot.val().zipCode;
                // await setDispensaryEmail(dispensaryEmail)
            })
        if (card === "" || cvc === "" || exp === "") {
            toast('Please fill all fields.')
        } else {
            setLoading(true)
            let uid = userID.substr(0, 10)
            let today = dayjs(new Date()).format('hh:mmA');
            let refId = uid + today;
            let cardNum = card.replace(/\s/g, '').trim()
            let expDate = exp.replace(/\//g, '').trim()
            var allPrice = total + total * taxFee + 10;
            var data = {
                "productAmount": parseFloat(allPrice).toFixed(2),
                "cardNum": cardNum,
                "expDate": expDate,
                "cvc": cvc,
                "refId": refId,
                "firstName": firstName,
                "lastName": lastName,
                "zipCode": cardZip,
                "delivereyStreet": disStreet,
                "devliveryCity": city,
                "devliveryZip": zip,
                "storeZipCode": storeZipCode
            };
            authorizeCreditCard.authorizeCreditCard(result, data);
        }
    }

    const changgZip = (val) => {
        let zip = val.target.value
        setZip(zip)
        if (atl_zipCode.zip700.indexOf(zip) >= 0) {
            setTaxFee(0.07)
        } else if (atl_zipCode.zip775.indexOf(zip) >= 0) {
            setTaxFee(0.0775)
        } else if (atl_zipCode.zip800.indexOf(zip) >= 0) {
            setTaxFee(0.08)
        } else {
            setTaxFee(0.089)
        }
    }
    return (
        <div className="checkout-form-cont">
            <div className="checkout-form">
                <div className="checkout-form-title">
                    <p>Order Summary</p>
                </div>
                <div className="checkout-form-detailed">
                    {/* <div className="checkout-form-details">
                        <p>Just CBD Wax x 2</p>
                        <p>$25.10</p>
                    </div>
                    <div className="checkout-form-details">
                        <p>Just CBD Wax 10ml</p>
                        <p>$15.00</p>
                    </div> */}
                    {items
                        .map((item) => <div key={item.id} className="checkout-form-details">
                            <p>{item.productName} x{item.num}</p>
                            <p>${parseFloat(item.priceValue * item.num).toFixed(2)}</p>
                        </div>)}
                    <div className="checkout-form-details">
                        <p>Service Fee</p>
                        <p>$5.00</p>
                    </div>
                    <div className="checkout-form-details">
                        <p>Delivery Fee</p>
                        <p>$5.00</p>
                    </div>
                    <div className="checkout-form-details">
                        <p>State and Sales Tax</p>
                        <p>${(total * taxFee).toFixed(2)}</p>
                    </div>
                </div>
                <div className="checkout-form-details">
                    <p>Total Amount</p>
                    <p className="total-amount">${parseFloat(total + total * taxFee + 10).toFixed(2)}</p>
                </div>
                {/* <p className="checkout-form-text">Promo Code</p> */}
                <div className="checkout-form-pr">
                    <div className="checkout-form-promo">
                        <input placeholder="Promo Code" value={promo} onChange={(e) => setPromo(e.target.value)} />
                        <button type="button">Apply</button>
                    </div>
                </div>
                <p className="checkout-form-text margin-top-2">Payment</p>
                <div className="checkout-form-cardd">
                    <div className="checkout-form-card">
                        {/* <p >Expiration Date</p> */}
                        <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" type="text" />
                    </div>
                    <div className="checkout-form-card">
                        {/* <p>CVC</p> */}
                        <input placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} type="text" />
                    </div>
                </div>
                <div className="checkout-form-pr">
                    <div className="checkout-form-promo">
                        <input
                            onChange={e => cardInput(e)}
                            maxLength={19}
                            value={card}
                            placeholder="Credit/Debit Card Number" />
                    </div>
                </div>
                <div className="checkout-form-address">
                    <input value={exp} onChange={e => expHandler(e)} placeholder="MM/YY" maxLength={5} type="text" />
                    <input placeholder="CVC" value={cvc} onChange={cvcHandler} type="number" maxLength="3" />
                    <input value={cardZip} onChange={e => setCardZip(e.target.value)} placeholder="Zip code" maxLength={5} type="text" />
                </div>
                <p className="checkout-form-text margin-top-2">Confirm Delivery Address</p>
                <div className="checkout-form-pr">
                    <div className="checkout-form-promo">
                        <input placeholder="Street Address" value={disStreet} onChange={(e) => setDisStreet(e.target.value)} />
                    </div>
                </div>
                <div className="checkout-form-address">
                    <input placeholder="City" value={city} />
                    <input placeholder="GA" disabled={true} />
                    <input placeholder="Zip Code" value={zip} onChange={(val) => changgZip(val)} type="number" maxLength={5} />
                </div>
                <p className="checkout-form-text margin-top-2">Special Instructions</p>
                <div className="checkout-form-specialr">
                    <div className="checkout-form-special-request">
                        <textarea placeholder="The gate code is #1234" value={specialIns} onChange={(e) => setSpecialIns(e.target.value)} />
                    </div>
                </div>
                {
                    localStorage.getItem('openStatus') == "false" ?
                        <div className="timeAlert" style={{ maginTop: 0 }}>
                            <img src={warningIcon} alt="" style={{ width: 18, height: 18 }} />
                            <p style={{ textAlign: "center", padding: 0, fontSize: 12 }}>You’re shopping after hours. Please allow a two day window for your product(s) to be delivered.</p>
                        </div> : ""
                }
                <button className="checkout-form-submit" type="submit" onClick={checkOut}>Check Out</button>
            </div>
            <ToastContainer />
            {loading && <Spinner animation="border" variant="primary" className="loading-border" />}
        </div>
    )
}
export default CheckoutForm;