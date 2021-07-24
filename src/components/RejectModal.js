import React from 'react'
import Modal from 'react-bootstrap/Modal'
import orderImg from '../images/order.svg'

function RejectModal({ ...props }) {
    return (
        <div className="scoped-bootstrap">
            <Modal
                keyboard="false"
                backdrop="static"
                show={props.show}
                onHide={props.onHide}
                backdropClassName="scoped-bootstrap"
                // size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                {/* <Modal.Header closeButton></Modal.Header> */}
                <Modal.Body>
                    <div className="modal-message">
                        <div className="modal-message-cont">
                            <div style={{ marginBottom: -40 }}>
                                <h1 style={{ textAlign: 'center' }}>Sorry, your order was rejected.</h1>
                            </div>
                            <div className="modal-buttons">
                                <button onClick={props.acceptmode} className="modal-send">OK</button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default RejectModal
