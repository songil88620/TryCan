import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import { database } from '../config/firebase'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { injectStyle } from "react-toastify/dist/inject-style";

if (typeof window !== "undefined") {
    injectStyle();
}

const ProfileModal = (props) => {

    let userId = localStorage.getItem('userUid')
    const [reportContent, setReportContent] = useState('')

    const contentHandler = (e) => {
        let content = e.target.value
        setReportContent(content)
    }
    const sendReport = () => {
        console.log(props.userData)
        if (reportContent == "") {
            toast('Please fill report content!')
        } else {
            var newItemKey = database.ref().child('Reports').push().key;
            database.ref('Reports/' + userId + '/' + newItemKey).update({
                reportContent: reportContent,
                reportId: newItemKey,
                email: props.userData.email,
                firstName: props.userData.firstName,
                lastName: props.userData.lastName,
              });
            props.onHide();
        }
    }
    return (
        <div className="scoped-bootstrap">
            <Modal
                {...props}
                backdropClassName="scoped-bootstrap"
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <div className="modal-message">
                        <div className="modal-message-cont">
                            <h1>Message:</h1>
                            <textarea value={reportContent} onChange={(e) => { contentHandler(e) }} placeholder="Order Reference #FG1735UIWH7&#10;Type here…." />
                            <div className="modal-buttons">
                                <button className="modal-back" onClick={props.onHide}>
                                    <u>Back</u>
                                </button>
                                <button onClick={() => { sendReport() }} className="modal-send">Send</button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <ToastContainer />
            </Modal>
        </div>
    )
}
export default ProfileModal;