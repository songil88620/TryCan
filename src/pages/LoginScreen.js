import React, { useState, useEffect } from 'react'
import GoBackButton from '../components/GoBackButton'
import LogoWithUserType from '../components/LogoWithUserType'
import CustomInput from '../components/CustomInput1'
import WhiteButton from '../components/WhiteButton'
import clip from '../images/clip.png'
import greenPhone from '../images/greenPhone.png'
import maple from '../images/maple.png'
import { useHistory, Link } from "react-router-dom";

import consumers_logo from '../images/consumers_logo.png'
import dispensaries_logo from '../images/dispensaries_logo.png'
import drivers_logo from '../images/drivers_logo.png'

// Integration module
import App, { database } from '../config/firebase'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { injectStyle } from "react-toastify/dist/inject-style";
import Spinner from 'react-bootstrap/Spinner'

import DispensaryRequestModal from '../components/DispensaryRequestModal'

var usertype = "consumer";

if (typeof window !== "undefined") {
    injectStyle();
}

let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


export default function LoginScreen() {
    const [isConsumers, setIsConsumers] = useState(true)
    const [usertype, setUsertype] = useState("consumer")
    const [isDriver, setIsDriver] = useState(false)
    const [isDispensaries, setIsDispensaries] = useState(false)
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const [loading, setLoading] = useState(false);
    const [requestModalShow, setRequestModalShow] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setUsertype("consumer")
        localStorage.setItem('usertype', "consumer")
    }, [])

    useEffect(() => {
        if (localStorage.getItem('loggedIn') === 'true' && localStorage.getItem('usertype') === "consumer") {
            history.push('/')
        } else if (localStorage.getItem('loggedIn') === 'true' && localStorage.getItem('usertype') === "dispensary") {
            history.push('/dispensarylanding')
        } else if (localStorage.getItem('loggedIn') === 'true' && localStorage.getItem('usertype') === "driver") {
            history.push('/profile')
        } else {
            localStorage.setItem('usertype', "consumer")
            localStorage.setItem('loggedIn', 'false')
        }
    }, [])
    let history = useHistory();
    const login = async () => {
        if (email == "" || pwd == "") {
            toast('Please fill all fields!')
        } else if (reg.test(email) === false) {
            toast('Please enter vaild email!')
        } else {
            setLoading(true)
            try {
                await App
                    .auth()
                    .signInWithEmailAndPassword(email, pwd)
                    .then((res) => {
                        setLoading(false)
                        database
                            .ref('user/' + res.user.uid)
                            .once("value", (snapshot) => {
                                let data = snapshot.val()
                                var keys = [];
                                for (var k in data) keys.push(k)
                                console.log("====usertype=====>", usertype);
                                if (usertype === keys[0]) {
                                    localStorage.setItem('userUid', res.user.uid)
                                    localStorage.setItem('loggedIn', 'true')
                                    history.push('/')
                                } else {
                                    toast('Sorry, this email is already in use.')
                                }
                            })
                    })
                    .catch((error) => {
                        setLoading(false)
                        console.log('error=>', error.message)
                        if (error.message == "A network error (such as timeout, interrupted connection or unreachable host) has occurred.") {
                            toast('Your internet Connection is failed')
                        }
                        if (error.message == "There is no user record corresponding to this identifier. The user may have been deleted.") {
                            toast('This email does not exist. Please create an account.')
                        }
                        if (error.message == "The password is invalid or the user does not have a password.") {
                            toast('You have entered the wrong email or password. Please try again.')
                        }
                    })
            } catch (error) {
                alert(error)
            }
        }
        // await localStorage.setItem('loggedIn', 'true')
        // isConsumers ?
        //     localStorage.setItem('usertype', 'consumer')
        //     : isDispensaries ?
        //         localStorage.setItem('usertype', 'dispensary')
        //         :
        //         localStorage.setItem('usertype', 'driver')
        // history.push(isConsumers ? "/" : isDispensaries ? "/dispensarylanding" : "/profile");
    }
    // function changeFirst() {
    //     if (isConsumers) {
    //         switchUser(3)
    //     } else {
    //         switchUser(1)
    //     }
    // }
    // function changeSecond() {
    //     if (isDispensaries) {
    //         switchUser(3)
    //     } else {
    //         switchUser(2)
    //     }
    // }
    function changeFirst() {
        switchUser(1)
    }
    function changeSecond() {
        switchUser(2)
    }
    async function switchUser(id) {
        // eslint-disable-next-line default-case
        switch (id) {
            case 1:
                setIsConsumers(true)
                setIsDispensaries(false)
                setIsDriver(false)
                setUsertype("consumer")
                await localStorage.setItem('usertype', "consumer")
                break;
            case 2:
                setIsConsumers(false)
                setIsDispensaries(true)
                setIsDriver(false)
                setUsertype("dispensary")
                await localStorage.setItem('usertype', "dispensary")
                break;
            case 3:
                setIsConsumers(false)
                setIsDispensaries(false)
                setIsDriver(true)
                setUsertype("dispensary")
                await localStorage.setItem('usertype', "driver")
                break;
        }
        // usertype = localStorage.getItem("usertype")
        console.log('--------usertype--------', usertype)
    }

    const onSubmit = () => {
        setRequestModalShow(false)
    }

    const handleKeypress = (event) => {
        if (event.key === 'Enter') {
            login();
        }
    }

    return (
        <section className="section">
            <DispensaryRequestModal show={requestModalShow} onSubmit={onSubmit} onHide={() => setRequestModalShow(false)} />
            <div className="back-cont-login"><GoBackButton login /></div>
            <div className="checkout-form-cont">
                <LogoWithUserType
                    userType={isConsumers ? "for Consumers" : isDispensaries ? "for Stores" : "for drivers"}
                    logo={isConsumers ? consumers_logo : isDispensaries ? dispensaries_logo : drivers_logo}
                />
                <CustomInput placeholder={isDispensaries ? "Owner's Email Address" : "Email Address"} type="email" iconType="email" onChange={(e) => setEmail(e.target.value)} val={email}  onKeyPress={handleKeypress} />
                <CustomInput placeholder="Password" type="password" iconType="password" onChange={(e) => setPwd(e.target.value)} val={pwd} onKeyPress={handleKeypress} />
                <div className="forgot-password-txt-pos">
                    <Link to={loading ? "#" : "/forgot"} className="forgot-pwd-txt">Forgot Password?</Link>
                </div>
                <button onClick={login} className="bt-primary mt50" type="submit" disabled={loading}>Sign in</button>

                <p className="greyText s31 mt90">Don't have an account?</p>
                {isConsumers ?
                    <Link to={loading ? "#" : "/signup"} className="main s32 mb90 z-index-1">Sign up</Link> :
                    <button onClick={() => setRequestModalShow(true)} className="main s32 mb90 z-index-1 signupModal">Sign up</button>
                }
                {/* <WhiteButton
                    title={isConsumers ? "Want to drive with us?" : "Want to buy from us?"}
                    onClick={changeFirst}
                    disabled={loading}
                />
                <WhiteButton
                    title={isDispensaries ? "Want to drive with us?" : "Want to sell with us?"}
                    onClick={changeSecond}
                    disabled={loading}
                /> */}
                <WhiteButton
                    title="Want to buy from us?"
                    onClick={changeFirst}
                    disabled={loading}
                />
                <WhiteButton
                    title="Want to sell with us?"
                    onClick={changeSecond}
                    disabled={loading}
                />
            </div>
            <div className="clipArea"><img src={clip} alt="clip" className="clip" /></div>
            <div className={isDriver ? "greenAreaDriver" : "greenArea"}>
                <img src={greenPhone} alt="green" className={isDriver ? "greenPhoneDriver" : "greenPhone"} />
            </div>
            <div className={isConsumers ? "greenAreaCopy" : isDispensaries ? "greenAreaCopyDispensaries" : "greenAreaCopyDriver"}>
                <img src={greenPhone} alt="green" className={isConsumers ? "greenPhoneCopy" : isDispensaries ? "greenPhoneCopyDispensaries" : "greenPhoneCopyDriver"} />
            </div>
            <div className={isConsumers ? "mapleArea" : isDispensaries ? "mapleAreaDispensaries" : "mapleAreaDriver"}>
                <img src={maple} alt="green" className="maple" />
            </div>
            <ToastContainer />
            {loading && <Spinner animation="border" variant="primary" className="loading-border" />}
        </section>
    )
}
