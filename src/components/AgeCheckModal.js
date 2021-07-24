import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { injectStyle } from "react-toastify/dist/inject-style";
import { useHistory } from 'react-router-dom'

if (typeof window !== "undefined") {
    injectStyle();
}

const AgeCheckModal = (props) => {

    const history = useHistory()

    const [searchTerm, setSearchTerm] = useState("")

    const setInformation = (val, order) => {
        if (order === 'searchItem') {
            setSearchTerm(val)
        }
    }

    useEffect(() => {
    }, [])

    const searchHandler = () => {
        history.push(`/searchresult/${searchTerm}`);
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
                            <p style={{ alignSelf: 'center', textAlign: "center", paddingTop: 30, paddingBottom: 30, fontSize: 15, color: '#61D273' }} className="p-text">
                                Are you 21 years or older?
                            </p>
                            <div className="location-modal-buttons">
                                <button onClick={()=>props.onAgeErrorHandler()} style={{ textAlign: 'center', marginTop: -30, width: 150, backgroundColor: "white", borderWidth: 0, color: "#CD5C5C" }}>No</button>
                                <button onClick={() => props.onHide()} className="modal-send" style={{ textAlign: 'center', marginTop: -30, width: 150 }}>Yes</button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <ToastContainer />
        </div>
    )
}
export default AgeCheckModal;