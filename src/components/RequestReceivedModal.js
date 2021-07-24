import React, { useEffect, useState, useCallback } from 'react'
import Modal from 'react-bootstrap/Modal'
import { database } from '../config/firebase'

import CustomInputLong from './CustomInputLong'

import CurrencyInput from './CurrencyInput.js'
import warningIcon from '../images/warningIcon.png'
import checkimage from '../images/checkimage.png'


const RequestReceivedModal = (props) => {

    const [disStreet, setDisStreet] = useState("")
    const [city, setCity] = useState("")
    const [GA, setGA] = useState()
    const [zip, setZip] = useState("");
    const [fundAmountRequested, setFundAmountRequested] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [routingNumber, setRoutingNumber] = useState("");
    const [value, setValue] = useState(0);
    const [select, setSelect] = useState(false);



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
                            <h1 style={{ alignSelf: 'center', fontSize: 20, marginTop: -20 }}>Request Payment</h1>
                            <p style={{ alignSelf: 'center', marginTop: -30, textAlign: "center", fontSize: 13 }} className="p-text">
                                Funds are sent via ACH, please allow a few days for fund transfer.
                            </p>
                            <div className="paymentAlert" style={{ maginTop: -30, width: '100%' }}>
                                <img src={warningIcon} alt="" style={{ width: 15, height: 15 }} />
                                <p style={{ textAlign: "center", padding: 0, fontSize: 12 }}>Once funds are requested and sent, we can’t reverse it.</p>
                            </div>
                            <p style={{ alignSelf: 'center', marginTop: 20, textAlign: "center", fontSize: 13 }} className="p-text">
                                CannaGo has received your payment request.
                            </p>
                            <div className="modalImage">
                                <img src={checkimage} width="100" height="100" style={{ marginTop: 20, marginBottom: 20 }} />
                                <p style={{ alignSelf: 'center', marginTop: 10, textAlign: "center", fontSize: 13 }} className="p-text">
                                    We’re working as fast as possible to get your funds sent.
                                </p>
                                <p style={{ alignSelf: 'center', marginTop: 0, textAlign: "center", fontSize: 13 }} className="p-text">
                                    Please be on the look out via email for updates.
                                </p>
                                <h1 style={{ alignSelf: 'center', fontSize: 18, marginTop: 20, color: '#60D273' }}>Thanks for being the best part of CannaGo</h1>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
export default RequestReceivedModal;