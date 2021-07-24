import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'

const OrderConfirmModal = (props) => {

    const confirm = () => {
        props.onHide()
        props.onConfirm()
    }

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
                {/* <Modal.Header closeButton></Modal.Header> */}
                <Modal.Body>
                    <div className="location-modal-message">
                        <div className="modal-message-cont">
                            <p style={{ alignSelf: 'center', textAlign: "center", paddingTop: 30, paddingBottom: 30, fontSize: 15}} className="p-text">
                                Are you sure {props.userData.firstName} {props.lastName}.'s order ready for pick up?
                            </p>
                            <div className="location-modal-buttons">
                                <button onClick={() => props.onHide()} style={{ textAlign: 'center', marginTop: -30, width: 150, backgroundColor: "white", borderWidth: 0, color: "#CD5C5C" }}>No</button>
                                <button onClick={() => confirm()} className="modal-send" style={{ textAlign: 'center', marginTop: -30, width: 150 }}>Yes</button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
export default OrderConfirmModal;