import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { injectStyle } from "react-toastify/dist/inject-style";
import { useHistory } from 'react-router-dom'

if (typeof window !== "undefined") {
    injectStyle();
}

const SearchModal = (props) => {

    const history = useHistory()

    const [searchTerm, setSearchTerm] = useState("")

    // const setInformation = (val) => {
    //         setSearchTerm(val.target.value)
    // }

    useEffect(() => {
    }, [])

    const searchHandler = () => {
        if (props.dropAddress === '') {
            props.onHide();
            toast("Please enter your delivery address. So, you can shop stores local to you.")
        } else if(searchTerm== '') {
            toast("Please input search item")
        }
        else {
            history.push(`/searchresult/${searchTerm}`);
            props.onHide();
        }
    }

    const handleKeypress = (event) => {
        if (event.key === 'Enter') {
            searchHandler();
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
                            <h1 style={{ alignSelf: 'center' }}>Item Search</h1>
                            <p style={{ alignSelf: 'center', marginTop: -10, textAlign: "center" }} className="p-text">
                                Please enter the term you want to search
                            </p>
                            <div className="checkout-form-address-dispensary1">
                                <input className="searchItem" placeholder="Search Term" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} type="text" onKeyPress={handleKeypress} style={{ backgroundColor:'white', borderWidth:0.5, borderColor:'gray' }}/>
                            </div>
                            <div className="location-modal-buttons">
                                <button onClick={searchHandler} className="modal-send" style={{ textAlign: 'center', marginTop: -30 }}>Search</button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <ToastContainer />
        </div>
    )
}
export default SearchModal;