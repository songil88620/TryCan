import React, { useCallback, useEffect, useState } from 'react'
import DispensaryStations from '../components/DispensaryStations'
import User from '../images/user-green.svg'
import Cart from '../images/cart.svg'
import Hist from '../images/messageImg.png'
import ProfileCard from './ProfileCard'
import { useHistory } from "react-router-dom";
import ProfileModal from './ProfileModal'
import Switch from "react-switch";
import dayjs from 'dayjs';

// Modules for Image crop function
import Cropper from 'react-easy-crop'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { getOrientation } from 'get-orientation/browser'
import Modal from 'react-bootstrap/Modal'
import { getCroppedImg, getRotatedImage } from './canvasUtils'
import PaymentRequestModal from '../components/PaymentRequestModal'
import RequestReceivedModal from '../components/RequestReceivedModal'
import avatar from '../images/avatar.png'

import App, { database, storage } from '../config/firebase'

const ORIENTATION_TO_ANGLE = {
    '3': 180,
    '6': 90,
    '8': -90,
}

const StoreSettings = (props) => {
    const [online, setOnline] = useState(true)
    const [modalShow, setModalShow] = useState(false);
    const [paymentModalShow, setPaymentModalShow] = useState(false);
    const [requestReceivedModalShow, setRequestReceivedModalShow] = useState(false);
    const [profileImage, setProfileImage] = useState(avatar);
    const [availableBal, setAvailableBal] = useState(0);
    const [loading, setLoading] = useState(false);
    let history = useHistory();
    let userId = localStorage.getItem('userUid')
    const [userType, setUserType] = useState()
    const [userUid, setUserUid] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    // const [url, setUrl] = useState(avatar);

    const [imageSrc, setImageSrc] = React.useState(null)
    const [rotation, setRotation] = useState(0)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedImage, setCroppedImage] = useState(null)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [autoNum, setAutoNum] = useState(1)
    const [userData, setUserData] = useState("")

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    let today_Hour = '';
    let today_minute = '';
    let now_Mins = ''
    var checked = false;

    useEffect(() => {
        var today = new Date()
        var day = today.getDay()
        // console.log("day=>", day);
        // Fetching user info from firebase DB
        setUserType(localStorage.getItem('usertype'))
        setUserUid(localStorage.getItem('userUid'))
        database
            .ref('user/' + userId + '/dispensary')
            .on("value", (snapshot) => {
                let user_data = {
                    profileimage: snapshot.val().profileimage,
                    availableBal: snapshot.val().availableBal,
                    email: snapshot.val().email,
                    storeName: snapshot.val().storeName,
                    city: snapshot.val().city,
                    storeStreetAdress: snapshot.val().storeStreetAdress,
                    zipCode: snapshot.val().zipCode,
                    startTime: snapshot.val().storeHours[day].startTime,
                    online: snapshot.val().storeHours[day].online,
                    endTime: snapshot.val().storeHours[day].endTime,
                    // data.push(row)
                };
                localStorage.setItem('disStreet', user_data.storeStreetAdress)
                localStorage.setItem('disCity', user_data.city)
                localStorage.setItem('disZipe', user_data.zipCode)
                setUserData(user_data)
                setAvailableBal(user_data.availableBal)
                setProfileImage(user_data.profileimage)
                setStartTime(user_data.startTime)
                setOnline(user_data.online)
                checked = user_data.online
                setEndTime(user_data.endTime)
                myFunction(user_data.startTime, user_data.endTime);
            })
    }, [])

    const myFunction = (start, end) => {
        var today = new Date()
        today_Hour = today.getHours()
        today_minute = today.getMinutes();
        now_Mins = today_Hour * 60 + today_minute
        // console.log("now_Mins===>", now_Mins)
        var start_Time = start.split(" ")[0]
        var flag_start_Time = start.split(" ")[1]
        var end_Time = end.split(" ")[0]
        var flag_end_Time = end.split(" ")[1]
        var start_Time_Mins = flag_start_Time === "AM" ? parseInt(start_Time.split(":")[0]) * 60 + parseInt(start_Time.split(":")[1]) : (parseInt(start_Time.split(":")[0]) + 12) * 60 + parseInt(start_Time.split(":")[1])
        var end_Time_Mins = flag_end_Time === "PM" ? (parseInt(end_Time.split(":")[0]) + 12) * 60 + parseInt(end_Time.split(":")[1]) : parseInt(end_Time.split(":")[0]) * 60 + parseInt(end_Time.split(":")[1])
        // console.log(start_Time_Mins)
        // console.log(end_Time_Mins)
        // if (now_Mins >= start_Time_Mins && now_Mins <= end_Time_Mins) {
        //     setChecked(false)
        //     // checked=false;
        // } else {
        //     setChecked(true)
        //     // checked=true;
        // }
    }

    const logout = () => {
        localStorage.setItem('loggedIn', false)
        localStorage.removeItem('usertype')
        localStorage.removeItem('userUid')
        localStorage.removeItem('username')
        localStorage.removeItem('age')
        localStorage.removeItem('url')
        localStorage.removeItem('profileImage')
        localStorage.removeItem('password')
        localStorage.removeItem('email')
        // localStorage.removeItem('ageFlag')
        history.push("/");
    }
    const modalHandler = () => {
        // setModalShow(true)
        history.push("/contactus")
    }
    const storeFront = () => {
        history.push("/shopdispensary");
    }
    const DispensaryInfo = () => {
        history.push('/dispensaryinfo');
    }
    const iconStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontSize: 15,
        color: "#878787",
        paddingRight: 2
    }

    const plusHandler = () => {
        !loading &&
            document.getElementById("input").click()
    }

    const imageHandler = (croppedImage) => {

        // Firebase image upload
        if (croppedImage) {
            var newItemKey = database.ref().child('user').push().key;
            var _name = newItemKey + 'img.png';
            setLoading(true)
            const uploadTask = storage.ref(`ProfileImages/${_name}`).put(croppedImage);
            uploadTask.on(
                "state_changed",
                snapshot => {
                    // const progress = Math.round(
                    //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    // );
                    // setProgress(progress);
                    // console.log('snapshot=>', snapshot)
                },
                error => {
                    // console.log('error=>', error);
                },
                () => {
                    storage
                        .ref("ProfileImages")
                        .child(_name)
                        .getDownloadURL()
                        .then(url => {
                            setProfileImage(url);
                            localStorage.setItem('profileImage', url)
                            database.ref('user/' + userUid + `/${userType}`).update({
                                profileimage: url,
                            })
                            setLoading(false)
                        });
                }
            );
        }
    };

    const onFileChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            let imageDataUrl = await readFile(file)

            // apply rotation if needed
            const orientation = await getOrientation(file)
            const rotation = ORIENTATION_TO_ANGLE[orientation]
            if (rotation) {
                imageDataUrl = await getRotatedImage(imageDataUrl, rotation)
            }

            // console.log("imageDataUrl====>", imageDataUrl);

            // var image = new Image();
            // image.src = 'data:image/png;base64,iVBORw0K...';

            setImageSrc(imageDataUrl)
        }
    }

    const showCroppedImage = useCallback(async () => {
        setImageSrc("")
        try {
            const croppedImage = await getCroppedImg(
                imageSrc,
                croppedAreaPixels,
                rotation
            )
            // console.log('donee', { croppedImage })
            setCroppedImage(croppedImage)
            imageHandler(croppedImage)
        } catch (e) {
            console.error(e)
        }
    }, [imageSrc, croppedAreaPixels, rotation])

    const setImageModalShow = () => {
        setImageSrc("")
    }

    // useEffect(() => {
    //     var now = new Date()
    //     var day = now.getDay()
    //     if (online == true) {
    //         database
    //             .ref('user/' + userId + '/dispensary/storeHours/' + day)
    //             .update({
    //                 online: true
    //             });
    //     } else {
    //         database
    //             .ref('user/' + userId + '/dispensary/storeHours/' + day)
    //             .update({
    //                 online: false
    //             });
    //     }
    // }, [online])

    const storeOpenStatusChange = async () => {
        await setOnline(!online);
        checked = !checked
        console.log(online);
        // onlinestatusUpdate()
        var now = new Date()
        var day = now.getDay()
        if (online == false) {
            database
                .ref('user/' + userId + '/dispensary/storeHours/' + day)
                .update({
                    online: true
                });
        } else if (online == true) {
            database
                .ref('user/' + userId + '/dispensary/storeHours/' + day)
                .update({
                    online: false
                });
        }
    }
    const onlinestatusUpdate = () => {
        alert(online)
        var now = new Date()
        var day = now.getDay()
        if (online == true) {
            database
                .ref('user/' + userId + '/dispensary/storeHours/' + day)
                .update({
                    online: true
                });
        } else if (online == false) {
            database
                .ref('user/' + userId + '/dispensary/storeHours/' + day)
                .update({
                    online: false
                });
        }
    }

    const showPaymentModal = () => {
        setPaymentModalShow(true)
    }

    return (
        <div className="dispensary-settings">
            <ProfileModal show={modalShow} onHide={() => setModalShow(false)} />
            <PaymentRequestModal show={paymentModalShow} onSubmit={() => setRequestReceivedModalShow(true)} userData={userData} onHide={() => setPaymentModalShow(false)} />
            <RequestReceivedModal show={requestReceivedModalShow} onHide={() => setRequestReceivedModalShow(false)} />
            <div className="dispensary-cont">
                <div className="switchArea">
                    <Switch
                        onChange={() => { storeOpenStatusChange() }}
                        checked={online}
                        width={100}
                        height={40}
                        uncheckedIcon={<div style={iconStyle}>Offline</div>}
                        // uncheckedIcon={<div style={iconStyle}>Online</div>}
                        checkedIcon={<div style={iconStyle}>Online</div>}
                        offColor="#fff"
                        onColor="#fff"
                        offHandleColor="#CD5C5C"
                        // offHandleColor="#61D273"
                        onHandleColor="#61D273"
                        handleDiameter={30}
                        activeBoxShadow="0 0 2px 3px #3bf"
                    />
                </div>
                <DispensaryStations onClick={plusHandler} src={profileImage} onChange={onFileChange} loading={loading} />
                <button onClick={showPaymentModal} className="priceArea mb30 paymentvalue">
                    <h1 className="mt30">${parseFloat(availableBal).toFixed(2)}</h1>
                    <h5 className="mt10 mb30 greyTxt">Available Balance</h5>
                </button>

                <ProfileCard onClick={storeFront} text="Your Store Front" src={Cart} />
                <ProfileCard onClick={DispensaryInfo} text="Store Information" src={Hist} />
                <ProfileCard onClick={modalHandler} text="Contact Support" src={User} />
                <ProfileCard onClick={logout} logout={true} text="Log Out" src={User} />
                <Modal
                    show={imageSrc != null && imageSrc != "" && imageSrc != undefined ? true : false}
                    backdropClassName="scoped-bootstrap"
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    dialogClassName="modal-50w"
                    centered
                    onHide={() => setImageModalShow()}
                >
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        <div className="ImageSelectArea">
                            <div className="ImageCropView">
                                <Cropper
                                    image={imageSrc}
                                    crop={crop}
                                    rotation={rotation}
                                    zoom={zoom}
                                    aspect={6 / 3}
                                    onCropChange={setCrop}
                                    onRotationChange={setRotation}
                                    onCropComplete={onCropComplete}
                                    onZoomChange={setZoom}
                                />
                            </div>
                            <div className="CropImageController">
                                <div className="sliderContainer">
                                    <Typography
                                        variant="overline"
                                    >
                                        Zoom
                                    </Typography>
                                    <Slider
                                        value={zoom}
                                        min={1}
                                        max={3}
                                        step={0.1}
                                        aria-labelledby="Zoom"
                                        onChange={(e, zoom) => setZoom(zoom)}
                                        className="slider"
                                    />
                                </div>
                                <Button
                                    onClick={showCroppedImage}
                                    variant="contained"
                                    color="primary"
                                    className="cropButton"
                                >
                                    Show Result
                                </Button>
                            </div>
                            {/* <ImgDialog img={croppedImage} onClose={onClose} /> */}
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    )
}

function readFile(file) {
    return new Promise((resolve) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => resolve(reader.result), false)
        reader.readAsDataURL(file)
    })
}

export default StoreSettings;