import React, { useState, useEffect } from 'react'
import ImageRight from '../images/profile-right.png';
import ImageLeft from '../images/profile-left.png';
// import App, { database, storage } from '../config/firebase'
import firebase from 'firebase'

import forgEmailImage from '../images/forgpwdImage.png'

import ChangePasswordLogo from './ChangePasswordLogo'
import CustomInput from './CustomInput'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { injectStyle } from "react-toastify/dist/inject-style";
import Spinner from 'react-bootstrap/Spinner'
import { useHistory, useLocation } from "react-router-dom";

if (typeof window !== "undefined") {
    injectStyle();
}

const ChangePassword = (props) => {
    let history = useHistory();
    let location = useLocation()
    const [currentEmail, setCurrentEmail] = useState('')
    const [currentPwd, setCurrentPwd] = useState('')
    const [oldEmail, setOldEmail] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [retypeEmail, setRetypeEmail] = useState('')
    const [userType, setUserType] = useState('')
    const [userId, setUserId] = useState('')
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("props.email", location.email);
        setCurrentEmail(localStorage.getItem('email'));
        setCurrentPwd(localStorage.getItem('password'));
        setUserType(localStorage.getItem('usertype'));
        setUserId(localStorage.getItem('userUid'));
    }, [])

    const oldEmailHandler = e => {
        setOldEmail(e.target.value)
    }
    const newEmailHandler = e => {
        setNewEmail(e.target.value)
    }
    const retypeEmailHandler = e => {
        setRetypeEmail(e.target.value)
    }

    const reauthenticate = (oldEmail) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, oldEmail);
        return user.reauthenticateWithCredential(cred);
    }

    const storeEmail = (email) => {
        console.log("change stage");
        try {
            firebase
                .database()
                .ref('user/' + userId + '/' + userType).update({
                    email: email,
                });
        } catch (error) {
            console.log(error)
        }

    }

    const changeEmail = () => {
        console.log(currentEmail)
        if (oldEmail === "" || newEmail === "" || retypeEmail === "") {
            toast('Please fill all fields!')
        } else if (oldEmail != currentEmail) {
            toast("Please input your current email correctly.")
        } else if (newEmail !== retypeEmail) {
            toast("Email doesn't match")
        } else {
            setLoading(true)
            reauthenticate(currentPwd).then(() => {
                var user = firebase.auth().currentUser;
                user.updateEmail(newEmail).then(() => {
                    setLoading(false)
                    storeEmail(newEmail);
                    toast("Email changed successfully!")
                    // setTimeout(() => {
                    //     history.push('/profileinfo');
                    // }, 2000)
                }).catch((error) => {
                    setLoading(false)
                    console.log(error);
                    if (error.message == "A network error (such as timeout, interrupted connection or unreachable host) has occurred.") {
                        toast('Your internet Connection is failed')
                    }
                    if (error.message == "The email address is already in use by another account.") {
                        toast('The email address is already in use by another account.')
                    }
                });
            }).catch((error) => {
                setLoading(false)
                console.log(error);
            });
        }
    }

    return (
        <div>
            <div className="profile-img-right"><img src={ImageRight} /></div>
            <div className="profile-body-cont">
                <div className="profile-form-cont">
                    <h1>Change Email</h1>
                    <div className="forgot-main">
                        {/* <div className="checkout-form-cont"> */}
                        <ChangePasswordLogo
                            userType={"You are changing your account email"}
                            logo={forgEmailImage}
                        />
                        <CustomInput onChange={oldEmailHandler} val={oldEmail} placeholder="Enter Old Email" type="email" width={'46rem'} iconType="User" />
                        <CustomInput onChange={newEmailHandler} val={newEmail} placeholder="Enter New Email" type="email" width={'46rem'} iconType="User" />
                        <CustomInput onChange={retypeEmailHandler} val={retypeEmail} placeholder="Re-Type New Email" type="email" width={'46rem'} iconType="User" />
                        {/* </div> */}
                        <button onClick={changeEmail} className="bt-primary" style={{ backgroundColor: '#3EA5E1', marginTop: 30, height: 60, width: 200, boxShadow: 'none' }}>Update</button>
                    </div>

                </div>
            </div>
            <div style={{ marginTop: -170 }} className="profile-img-left"><img src={ImageLeft} /></div>
            <ToastContainer />
            {loading && <Spinner animation="border" variant="primary" className="loading-border" />}
        </div>
    )
}
export default ChangePassword;