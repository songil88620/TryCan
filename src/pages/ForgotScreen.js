import React, { useState, useEffect } from 'react'
import { enteremail, checkemail } from '../constants/LongText'
import CustomInput from '../components/CustomInput'
import Modal from 'react-bootstrap/Modal'
// import "bootstrap/dist/css/bootstrap.min.css";

import forgotlogo from '../images/forgotlogo.png'
import forgot1 from '../images/forgot1.png'
import forgot2 from '../images/forgot2.png'
import forgot3 from '../images/forgot3.png'
import forgot4 from '../images/greenPhone.png'
import checkemailImg from '../images/checkemail.svg'
import Spinner from 'react-bootstrap/Spinner'
import App from '../config/firebase'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { injectStyle } from "react-toastify/dist/inject-style";

if (typeof window !== "undefined") {
  injectStyle();
}

function MyVerticallyCenteredModal(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
}, [])
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="modal-container">
          <img src={checkemailImg} alt="checkemail" className="checkemail" />
          <h2 className="normal-text">{checkemail}</h2>
        </div>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

function ForgotScreen() {
  const [modalShow, setModalShow] = useState(false);
  const [userType, setUserType] = useState('consumer')
  const [email, setEmail] = useState('')
  const [uploading, setUploading] = useState(false);
  useEffect(() => {
    setUserType(localStorage.getItem('usertype'))
  }, [])
  const _onResetEmail = e => {
    setEmail(e.target.value)
  }
  const forgotPassword = (e) => {
    e.preventDefault()
    setUploading(true)
    App.auth().sendPasswordResetEmail(email).then(res => {
      console.log(res)
      setUploading(false)
      setModalShow(true)
    })
      .catch((error) => {
        setUploading(false)
        if (error.message == "A network error (such as timeout, interrupted connection or unreachable host) has occurred.") {
          toast('Your internet Connection is failed')
        }
        if (error.message == "There is no user record corresponding to this identifier. The user may have been deleted.") {
          toast('This email does not exist. Please create an account.')
        }
      })
  }
  return (
    <div className="forgot-container">
      <form className="forgot-main" onSubmit={forgotPassword}>
        <img src={forgotlogo} alt="Forgot password" className="forgotlogo" />
        <h2 className="normal-text">{enteremail}</h2>
        <CustomInput onChange={_onResetEmail} val={email} placeholder="Email Address" type="email" iconType="email" width={'46rem'} mt={30} mb={30} />
        <button className="bt-primary" type="submit" style={{ marginTop: 30 }}>Submit</button>
        {
          userType === 'consumer' &&
          <>
            <img src={forgot1} alt="fruit" className="forgotImg1" />
            <div className="forgot2-wrapper"><img src={forgot2} alt="fruit" className="forgotImg2" /></div>
            <div className="forgot3-wrapper"><img src={forgot3} alt="fruit" className="forgotImg3" /></div>
            <div className="forgot4-wrapper"><img src={forgot4} alt="fruit" className="forgotImg4" /></div>
          </>
        }
        {
          userType === 'dispensary' &&
          <>
            <img src={forgot4} alt="fruit" className="forgotImg4-dispensaries" />
            <img src={forgot3} alt="fruit" className="forgotImg3-dispensaries" />
          </>
        }
        {
          userType === 'driver' &&
          <>
            <img src={forgot4} alt="fruit" className="forgotImg1-driver" />
            <div className="forgot3-driver-wrapper"><img src={forgot3} alt="fruit" className="forgotImg3-driver" /></div>
            <div className="forgot4-driver-wrapper"><img src={forgot4} alt="fruit" className="forgotImg4-driver" /></div>
          </>
        }
      </form>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      {uploading && <Spinner animation="border" variant="primary" className="loading-border" />}
      <ToastContainer />
    </div>
  )
}

export default ForgotScreen
