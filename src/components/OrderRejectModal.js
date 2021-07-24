import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'

const OrderRejectModal = (props) => {


    return (
        <div className="scoped-bootstrap">
            <Modal
                backdrop="static"
                keyboard="false"
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
                            <p style={{ alignSelf: 'center', textAlign: "center", fontSize: 15, color:'black' }} className="p-text">
                                Thank you, CannaGo and {props.userData.firstName} {props.lastName}. Have been notified.
                            </p>
                            <p style={{ alignSelf: 'center', textAlign: "center", paddingTop: 5, paddingBottom: 30, fontSize: 15, color:'black' }} className="p-text">
                                Please keep {props.userData.firstName} {props.lastName}. in a safe place until a driver arrives.
                            </p>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
export default OrderRejectModal;