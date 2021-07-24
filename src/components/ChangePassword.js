import React, { useState, useEffect } from 'react'
import ImageRight from '../images/profile-right.png';
import ImageLeft from '../images/profile-left.png';
// import App, { database, storage } from '../config/firebase'
import firebase from 'firebase'
import bcrypt from 'bcryptjs'

import forgpwdImage from '../images/forgpwdImage.png'

import ChangePasswordLogo from '../components/ChangePasswordLogo'
import CustomInput from '../components/CustomInput'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { injectStyle } from "react-toastify/dist/inject-style";
import Spinner from 'react-bootstrap/Spinner'
import { useHistory } from "react-router-dom";

if (typeof window !== "undefined") {
    injectStyle();
}

const ChangePassword = (props) => {
    // let password = props.match.params.id;
    let history = useHistory();
    const [currentPwd, setCurrentPwd] = useState('')
    const [oldPwd, setOldPwd] = useState('')
    const [newPwd, setNewPwd] = useState('')
    const [retypePwd, setRetypePwd] = useState('')
    const [userType, setUserType] = useState('')
    const [userId, setUserId] = useState('')
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // console.log(password);
        // setCurrentPwd(localStorage.getItem('password'));
        setUserType(localStorage.getItem('usertype'));
        setUserId(localStorage.getItem('userUid'));
    }, [])

    const oldPassword = e => {
        setOldPwd(e.target.value)
    }
    const newPassword = e => {
        setNewPwd(e.target.value)
    }
    const retypePassword = e => {
        setRetypePwd(e.target.value)
    }

    const reauthenticate = (oldPwd) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, oldPwd);
        return user.reauthenticateWithCredential(cred);
    }

    const storePassword = (password) => {
        console.log("change stage");
        try {
            firebase
                .database()
                .ref('user/' + userId + '/' + userType).update({
                    password: bcrypt.hashSync(password),
                });
        } catch (error) {
            console.log(error)
        }

    }

    const changePwd = () => {
        if (oldPwd === "" || newPwd === "" || retypePwd === "") {
            toast('Please fill all fields!')
            // } else if (oldPwd != currentPwd) {
        } else if (newPwd !== retypePwd) {
            toast("Password doesn't match")
        } else {
            setLoading(true)
            reauthenticate(oldPwd).then(() => {
                var user = firebase.auth().currentUser;
                user.updatePassword(newPwd).then(() => {
                    setLoading(false)
                    storePassword(newPwd);
                    toast("Password changed successfully!")
                    // setTimeout(() => {
                    //     history.push('/profileinfo');
                    // }, 2000)
                }).catch((error) => {
                    setLoading(false)
                    console.log(error);
                    if (error.message == "A network error (such as timeout, interrupted connection or unreachable host) has occurred.") {
                        toast('Your internet Connection is failed')
                    }
                    if (error.message == "There is no user record corresponding to this identifier. The user may have been deleted.") {
                        toast('This email does not exist. Please create an account.')
                    }
                    if (error.message == "The password is invalid or the user does not have a password.") {
                        toast('You have entered the wrong email or password. Please try again.')
                    }
                });
            }).catch((error) => {
                setLoading(false)
                console.log(error);
            });
        }
        // else if (bcrypt.compareSync(oldPwd, currentPwd)) {
        //     if (newPwd !== retypePwd) {
        //         toast("Password doesn't match")
        //     } else {
        //         setLoading(true)
        //         reauthenticate(oldPwd).then(() => {
        //             var user = firebase.auth().currentUser;
        //             user.updatePassword(newPwd).then(() => {
        //                 setLoading(false)
        //                 storePassword(newPwd);
        //                 toast("Password changed successfully!")
        //                 // setTimeout(() => {
        //                 //     history.push('/profileinfo');
        //                 // }, 2000)
        //             }).catch((error) => {
        //                 setLoading(false)
        //                 console.log(error);
        //                 if (error.message == "A network error (such as timeout, interrupted connection or unreachable host) has occurred.") {
        //                     toast('Your internet Connection is failed')
        //                 }
        //                 if (error.message == "There is no user record corresponding to this identifier. The user may have been deleted.") {
        //                     toast('This email does not exist. Please create an account.')
        //                 }
        //                 if (error.message == "The password is invalid or the user does not have a password.") {
        //                     toast('You have entered the wrong email or password. Please try again.')
        //                 }
        //             });
        //         }).catch((error) => {
        //             setLoading(false)
        //             console.log(error);
        //         });

        //     }
        // } else {
        //     toast("Please input your current password correctly.")
        // }

    }

    return (
        <div>
            <div className="profile-img-right"><img src={ImageRight} /></div>
            <div className="profile-body-cont">
                <div className="profile-form-cont">
                    <h1>Change Password</h1>
                    <div className="forgot-main">
                        {/* <div className="checkout-form-cont"> */}
                        <ChangePasswordLogo
                            userType={"You are changing your account password"}
                            logo={forgpwdImage}
                        />
                        <CustomInput onChange={oldPassword} val={oldPwd} placeholder="Enter Old Password" type="password" width={'46rem'} iconType="User" />
                        <CustomInput onChange={newPassword} val={newPwd} placeholder="Enter New Password" type="password" width={'46rem'} iconType="User" />
                        <CustomInput onChange={retypePassword} val={retypePwd} placeholder="Re-Type New Password" type="password" width={'46rem'} iconType="User" />
                        {/* </div> */}
                        <button onClick={changePwd} className="bt-primary" style={{ backgroundColor: '#3EA5E1', marginTop: 30, height: 60, width: 200, boxShadow: 'none' }}>Update</button>
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