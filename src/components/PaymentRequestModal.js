import React, { useEffect, useState, useCallback } from 'react'
import Modal from 'react-bootstrap/Modal'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { injectStyle } from "react-toastify/dist/inject-style";
import { database } from '../config/firebase'

import CustomInputLong from './CustomInputLong'

import CurrencyInput from './CurrencyInput.js'
import warningIcon from '../images/warningIcon.png'

if (typeof window !== "undefined") {
    injectStyle();
}

const PaymentRequestModal = (props) => {

    const [disStreet, setDisStreet] = useState()
    const [city, setCity] = useState()
    const [GA, setGA] = useState()
    const [zip, setZip] = useState();
    const [fundAmountRequested, setFundAmountRequested] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [routingNumber, setRoutingNumber] = useState("");
    const [value, setValue] = useState(0);
    const [select, setSelect] = useState(false);
    const [checked, setChecked] = useState(false);

    useEffect(() => {

        const initialVal = async () => {
            const street = await localStorage.getItem('disStreet')
            const city = await localStorage.getItem('disCity')
            const zip = await localStorage.getItem('disZipe')
            setCity(city)
            setZip(zip)
            setDisStreet(street)
        }

        initialVal();
    }, [])


    const setInformation = (val, order) => {
        if (order === 'disStreet') {
            setDisStreet(val)
        } else if (order === 'city') {
            setCity(val)
        } else if (order === 'GA') {
            setGA(val)
        } else if (order === 'FundAmountRequested') {
            setFundAmountRequested(val)
        }
    }

    const zipHandler = e => {
        const { value, maxLength } = e.target;
        const message = value.slice(0, maxLength);
        setZip(message);
    }
    const accountHandler = e => {
        const { value, maxLength } = e.target;
        const message = value.slice(0, maxLength);
        setAccountNumber(message);
    }
    const routingHandler = e => {
        const { value, maxLength } = e.target;
        const message = value.slice(0, maxLength);
        setRoutingNumber(message);
    }

    const saveAddress = () => {
        let userID = localStorage.getItem('userUid')
        // props.autoNum();
        if (disStreet === "" || city === "" || zip === "" || fundAmountRequested == "" || accountNumber == "" || routingNumber == "" || checked == false) {
            toast('Please fill all fields!')
        } else if (fundAmountRequested > props.userData.availableBal) {
            toast("Sorry, Your store does not have the amount you have chosen.")
        } else {
            var requestId = database.ref().child('PaymentRequest').push().key;
            var newValue = props.userData.availableBal - fundAmountRequested
            database.ref(`PaymentRequest/${userID}/${requestId}`).update({
                email: props.userData.email,
                storeName: props.userData.storeName,
                fundAmountRequested: fundAmountRequested,
                accountNumber: accountNumber,
                routingNumber: routingNumber,
                disStreet: disStreet,
                city: city,
                zip: zip,
                GA: "GA"
            })
            database.ref(`user/${userID}/dispensary`).update({
                availableBal: newValue
            })
            props.onHide();
            props.onSubmit();
            // toast("Your request has been successful.")
        }
    }

    const handleValueChange = useCallback(val => {
        setValue(val);
        setFundAmountRequested(parseFloat(val / 100).toFixed(2));
    }, []);

    return (
        <div className="scoped-bootstrap">
            <Modal
                {...props}
                backdropClassName="scoped-bootstrap"
                // size="lg"
                // aria-labelledby="contained-modal-title-vcenter"
                dialogClassName="modal-50w"
                centered
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <div className="location-modal-message">
                        <div className="modal-message-cont">
                            <h1 style={{ alignSelf: 'center' }}>Request Payment</h1>
                            <p style={{ alignSelf: 'center', marginTop: -30, textAlign: "center", fontSize: 13 }} className="p-text">
                                Funds are sent via ACH, please allow a few days for fund transfer.
                            </p>
                            <div className="paymentAlert" style={{ maginTop: -30, width: '100%' }}>
                                <img src={warningIcon} alt="" style={{ width: 15, height: 15 }} />
                                <p style={{ textAlign: "center", padding: 0, fontSize: 12 }}>Once funds are requested and sent, we can’t reverse it.</p>
                            </div>
                            <div className="payment-form-cont" style={{ marginTop: 10 }}>
                                {/* <input className="input-el" style={{ paddingLeft: 30 }} placeholder="Fund Amount Requested" type="number" onChange={(e) => setInformation(e.target.value, 'FundAmountRequested')} val={fundAmountRequested} /> */}
                                {
                                    select == false ?
                                        <button className="fundArea" style={{ paddingLeft: 30, paddingTop: 18, margin: "0 !important" }} onClick={() => { setSelect(true) }}>Fund Amount Requested</button> :
                                        <CurrencyInput
                                            // max={100000000}
                                            placeholder="Fund Amount Requested"
                                            className="input-el"
                                            onValueChange={handleValueChange}
                                            style={{ paddingLeft: 30 }}
                                            value={value}
                                            required
                                        />
                                }
                            </div>
                            <div className="payment-form-cont" style={{ marginTop: 10 }}>
                                <input required className="input-el" style={{ paddingLeft: 30 }} placeholder="Account Number" type="number" onChange={accountHandler} value={accountNumber} maxLength="12" />
                            </div>
                            <div className="payment-form-cont" style={{ marginTop: 10 }}>
                                <input required className="input-el" style={{ paddingLeft: 30 }} placeholder="Routing Number" type="number" onChange={routingHandler} value={routingNumber} maxLength="9" />
                            </div>
                            {/* <div className="payment-form-cont">
                                <CustomInputLong placeholder="Retype Routing Number" type="number"  onChange={(e) => setInformation(e.target.value, 'RetypeRoutingNumber')} val={retypeRoutingNumber} />
                            </div> */}
                            <div className="payment-form-cont">
                                <CustomInputLong placeholder="Street Address" type="text" onChange={(e) => setDisStreet(e.target.value)} val={disStreet} />
                            </div>
                            <div style={{ alignSelf: 'center' }} className="payment-form-address-dispensary1">
                                <input placeholder="City" required value={city} onChange={(e) => setCity(e.target.value)} type="text" />
                                <input placeholder="GA" required value={GA} onChange={(e) => setInformation(e.target.value, 'GA')} type="text" disabled={true} />
                                <input placeholder="Zip Code" required value={zip} onChange={zipHandler} type="number" maxLength="5" />
                            </div>
                            <div className="terms-conditions pos-start">
                                <input type="checkbox" defaultChecked={checked} onChange={(e) => { setChecked(e.target.value) }} id="agreeTerms" name="agreeTerms" required />
                                <label htmlFor="agreeTerms" id="agreeLabel"> By checking this I certify the information above is correct. </label>
                            </div>
                            <div className="payment-modal-buttons">
                                {/* <button className="modal-back" onClick={props.onHide}>
                                    <u>Back</u>
                                </button> */}
                                <button type="submit" onClick={saveAddress} className="modal-send" style={{ textAlign: 'center' }}>Submit</button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <ToastContainer />
        </div>
    )
}
export default PaymentRequestModal;