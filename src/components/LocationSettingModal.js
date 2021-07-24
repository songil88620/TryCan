import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { injectStyle } from "react-toastify/dist/inject-style";
import CustomInputLong from '../components/CustomInputLong'
import atl_zipCode from '../constants/zipCode'
import { database } from '../config/firebase'

if (typeof window !== "undefined") {
    injectStyle();
}

const LocationSettingModal = (props) => {

    const [disStreet, setDisStreet] = useState("")
    const [city, setCity] = useState("")
    const [GA, setGA] = useState()
    const [zip, setZip] = useState("");

    let userId = localStorage.getItem('userUid')

    const setInformation = (val, order) => {
        if (order === 'disStreet') {
            setDisStreet(val)
        } else if (order === 'city') {
            setCity(val)
        } else if (order === 'GA') {
            setGA(val)
        }
    }

    useEffect(() => {
        database
            .ref("user/" + userId + "/consumer")
            .on("value", async (snapshot) => {
                if(snapshot.val() !== null){
                    if(snapshot.val().dropStreet !== null && snapshot.val().dropCity !== null && snapshot.val().dropZip !== null)
                    var row = {
                        dropStreet: snapshot.val().dropStreet,
                        dropCity: snapshot.val().dropCity,
                        dropZip: snapshot.val().dropZip,
                    }
                    setZip(row.dropZip)
                    setDisStreet(row.dropStreet)
                    setCity(row.dropCity)
                }
            })
    }, [])

    const zipHandler = e => {
        const { value, maxLength } = e.target;
        const message = value.slice(0, maxLength);
        setZip(message);
    }

    const saveAddress = () => {
        // props.autoNum();
        if (disStreet === "" || city === "" || zip === "") {
            toast('Please fill all fields!')
        } else if (zip.length != 5 || atl_zipCode.zip.indexOf(zip) < 0) {
            toast('Sorry, CannaGo is not serving that area.')
        } else {
            let dropAddress = "Delivering to " + disStreet + ", " + city + ", GA, " + zip
            database
                .ref('user/' + userId + '/' + "consumer")
                .update({
                    dropAddress: dropAddress,
                    dropStreet: disStreet,
                    dropCity: city,
                    dropZip: zip,
                });
            localStorage.setItem('dropAddress', "Delivering to " + disStreet + ", " + city + ", GA, " + zip);
            localStorage.setItem('disStreet', disStreet);
            localStorage.setItem('city', city);
            localStorage.setItem('zip', zip);
            props.onHide();
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
                            <h1 style={{ alignSelf: 'center' }}>Delivery Address</h1>
                            <p style={{ alignSelf: 'center', marginTop: -10, textAlign: "center" }} className="p-text">
                                Please enter your delivery address. So, you can shop stores local to you.
                            </p>
                            <div className="checkout-form-cont">
                                <CustomInputLong placeholder="Street Address" type="text" iconType="email" onChange={(e) => setInformation(e.target.value, 'disStreet')} val={disStreet} />
                            </div>
                            <div style={{ alignSelf: 'center' }} className="checkout-form-address-dispensary1">
                                <input placeholder="City" value={city} onChange={(e) => setInformation(e.target.value, 'city')} type="text" style={{ backgroundColor:'white', borderWidth:0.5, borderColor:'gray' }}/>
                                <input placeholder="GA" value={GA} onChange={(e) => setInformation(e.target.value, 'GA')} type="text" disabled={true} style={{ backgroundColor:'white', borderWidth:0.5, borderColor:'gray' }}/>
                                <input placeholder="Zip Code" value={zip} onChange={zipHandler} type="number" maxLength="5" style={{ backgroundColor:'white', borderWidth:0.5, borderColor:'gray' }}/>
                            </div>
                            <div className="location-modal-buttons">
                                {/* <button className="modal-back" onClick={props.onHide}>
                                    <u>Back</u>
                                </button> */}
                                <a href="" onClick={saveAddress} className="modal-send" style={{ textAlign: 'center' }}>SAVE</a>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <ToastContainer />
        </div>
    )
}
export default LocationSettingModal;