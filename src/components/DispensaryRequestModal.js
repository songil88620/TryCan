import React, { useEffect, useState, useCallback } from 'react'
import Modal from 'react-bootstrap/Modal'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { injectStyle } from "react-toastify/dist/inject-style";
import { database } from '../config/firebase'


if (typeof window !== "undefined") {
    injectStyle();
}

const DispensaryRequestModal = (props) => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [role, setRole] = useState('')
    const [email, setEmail] = useState("");
    const [phoneNumer, setPhoneNumer] = useState("");
    const [zip, setZip] = useState('');
    const [ein, setEin] = useState('');
    const [checked, setChecked] = useState(false);

    const zipHandler = e => {
        const { value, maxLength } = e.target;
        const message = value.slice(0, maxLength);
        setZip(message);
    }
    const phoneHandler = e => {
        const { value, maxLength } = e.target;
        const message = value.slice(0, maxLength);
        setPhoneNumer(message);
    }

    const saveAddress = () => {
        if (firstName == "" || lastName == "" || role == "" || email == "" || zip == "" || ein == "" || phoneNumer == "" || checked == false) {
            toast('Please fill all fields!')
        } else {
            var newOrderKey = database.ref().child('ShopRequest').push().key;
            database.ref(`ShopRequest/${newOrderKey}`).update({
                firstName: firstName,
                lastName: lastName,
                role: role,
                email: email,
                zip: zip,
                ein: ein,
                phoneNumer: phoneNumer
            })
            props.onSubmit();
            toast("Your request has been successful.")
        }
    }

    const einHandler = (val) => {
        val = val.replace("-", "")
        if (val === "") {
            setEin(val)
            localStorage.setItem('feinName', val);
        } else {
            if (val.length >= 3) {
                var str = val.slice(0, 2) + '-' + val.slice(2)
                if (str[str.length - 1] <= '9' && str[str.length - 1] >= '0') {
                    setEin(str)
                    localStorage.setItem('feinName', str);

                }
            } else {
                if (val[val.length - 1] <= '9' && val[val.length - 1] >= '0') {
                    setEin(val)
                    localStorage.setItem('feinName', val);

                }
            }
        }
    }


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
                            <h1 style={{ alignSelf: 'center' }}>Store Request</h1>
                            <p style={{ alignSelf: 'center', marginTop: -30, textAlign: "center", fontSize: 13 }} className="p-text">
                                If you’re interested in selling products on our platform, please fill out the fields below and someone from the CannaGo team will reach out as soon as possible!
                            </p>
                            <div style={{ alignSelf: 'center' }} className="dispensary-form-address-dispensary1">
                                <input placeholder="First Name" required value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" />
                                <input placeholder="Last Name" required value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" />
                            </div>
                            <div className="payment-form-cont" style={{ marginTop: 10 }}>
                                <input required className="input-el" style={{ paddingLeft: 30 }} placeholder="What is your role?" type="text" onChange={(e) => setRole(e.target.value)} value={role} />
                            </div>
                            <div className="payment-form-cont" style={{ marginTop: 10 }}>
                                <input required className="input-el" style={{ paddingLeft: 30 }} placeholder="Email Address" type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                            </div>
                            <div className="payment-form-cont" style={{ marginTop: 10 }}>
                                <input required className="input-el" style={{ paddingLeft: 30 }} placeholder="Phone Number" type="number" value={phoneNumer} onChange={phoneHandler} maxLength="10" />
                            </div>
                            <div className="payment-form-cont" style={{ marginTop: 10 }}>
                                <input required className="input-el" style={{ paddingLeft: 30 }} placeholder="Store’s Zip Code" type="number" onChange={zipHandler} value={zip} maxLength="5" />
                            </div>
                            <div className="payment-form-cont" style={{ marginTop: 10 }}>
                                <input required className="input-el" style={{ paddingLeft: 30 }} placeholder="Store’s Employer Identification Number" type="text" onChange={(e) => einHandler(e.target.value)} value={ein} maxLength="10" />
                            </div>
                            <div className="terms-conditions pos-start">
                                <input type="checkbox" defaultChecked={checked} onChange={(e) => { setChecked(e.target.value) }} id="agreeTerms" name="agreeTerms" required />
                                <label htmlFor="agreeTerms" id="agreeLabel"> By checking this I certify the information is above is correct. </label>
                            </div>
                            <div className="payment-modal-buttons">
                                <button type="submit" onClick={saveAddress} className="modal-send" style={{ textAlign: 'center' }}>Submit</button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
export default DispensaryRequestModal;