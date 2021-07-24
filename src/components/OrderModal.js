import React from 'react'
import Modal from 'react-bootstrap/Modal'
import orderImg from '../images/order.svg'

const OrderModal = ({...props}) => {
    return (
        <div className="scoped-bootstrap">
            <Modal
                show={props.show}
                onHide={props.onHide}
                backdropClassName="scoped-bootstrap"
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <div className="modal-message">
                        <div className="modal-message-cont">
                            <div className="flex-dir-row">
                                <img src={orderImg} alt="" />
                                <h1>Order John H.</h1>
                            </div>
                            <div className="modal-buttons">
                                <button onClick={props.hidemode} className="modal-cancel">Decline</button>
                                <button onClick={props.acceptmode} className="modal-send">Accept</button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
export default OrderModal;