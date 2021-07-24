import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import ProfileModal from './ProfileModal'
import Profile from './Profile'
import ProfileCard from './ProfileCard'
import Switch from "react-switch";

import avatar from '../images/avatar.png'
import User from '../images/user-green.svg'
import Hist from '../images/history.svg'
import BG from '../images/profile-bg.svg'
import licenseImg from '../images/licenseImg.svg'
// Firebase Integration module
import { database, storage } from '../config/firebase'

const ProfileSettings = (props) => {
    let history = useHistory();
    const [modalShow, setModalShow] = useState(false);
    const [checked, setChecked] = useState(false)
    const [userType, setUserType] = useState(props.role)
    const [userUid, setUserUid] = useState('')
    // const [url] = useState(localStorage.getItem('url'))
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState(avatar);
    useEffect(() => {
        console.log('role====>', props.role);
        setUserType(localStorage.getItem('usertype'))
        setUserUid(localStorage.getItem('userUid'))
    }, [])
    useEffect(() => {
        setUrl(localStorage.getItem('url'))
    }, [localStorage.getItem('url')])
    const logout = () => {
        localStorage.setItem('loggedIn', false);
        localStorage.removeItem('usertype')
        localStorage.removeItem('userUid')
        localStorage.removeItem('username')
        localStorage.removeItem('age')
        localStorage.removeItem('url')
        localStorage.removeItem('profileImage')
        localStorage.removeItem('password')
        localStorage.removeItem('email')
        // localStorage.removeItem('ageFlag')
        console.log('logout btn clicked=>', localStorage.getItem('usertype'));
        history.push("/");
    }
    const modalHandler = () => {
        // setModalShow(true)
        history.push("/contactus")
    }
    const profile = () => {
        userType === 'consumer' ?
            history.push("/profileinfo")
            :
            history.push("/driverprofileinfo")
    }
    const orderhistory = () => {
        userType === 'consumer' ?
            history.push('/orderhistory')
            :
            console.log('driver history');
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

    const imageHandler = async e => {
        // image preview on avatar area
        // const reader = new FileReader();
        // reader.onload = () => {
        //   if (reader.readyState === 2) {
        //     setProfileImg(reader.result)
        //   }
        // };
        // reader.onerror = function (e) {
        //   alert('Image picker error');
        // }
        // if (e.target.files[0]) {
        //   reader.readAsDataURL(e.target.files[0]);
        //   setImage(e.target.files[0])
        // }

        // Firebase image upload
        if (e.target.files[0]) {
            var newItemKey = database.ref().child('user').push().key;
            var _name = newItemKey + 'img.png';
            setLoading(true)
            const uploadTask = storage.ref(`ProfileImages/${_name}`).put(e.target.files[0]);
            uploadTask.on(
                "state_changed",
                snapshot => {
                    // const progress = Math.round(
                    //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    // );
                    // setProgress(progress);
                    console.log('snapshot=>', snapshot)
                },
                error => {
                    console.log('error=>', error);
                },
                () => {
                    storage
                        .ref("ProfileImages")
                        .child(_name)
                        .getDownloadURL()
                        .then(url => {
                            setUrl(url);
                            localStorage.setItem('url', url)
                            database.ref('user/' + userUid + `/${userType}`).update({
                                profileimage: url,
                            })
                            setLoading(false)
                        });
                }
            );
        }
    };

    return (
        <div className="profile-settings">
            <ProfileModal show={modalShow} onHide={() => setModalShow(false)} />
            <div className="profile-cont">
                {userType === 'driver' && <h1 className="driver-profile-title">Profile</h1>}
                <div className="profile-avatar">
                    <Profile src={url} onClick={plusHandler} onChange={imageHandler} loading={loading} />
                    {
                        userType === 'consumer' ?
                            <p>{localStorage.getItem('username')}.</p>
                            :
                            <div className="driver-avatar-desc">
                                <div className="driver-avatar-info">
                                    <h3>Larry W, 33</h3>
                                    <h1>$275.77</h1>
                                    <h5>Available Balance</h5>
                                </div>
                                <div className="switchArea-driver">
                                    <Switch
                                        onChange={() => setChecked(!checked)}
                                        checked={checked}
                                        width={100}
                                        height={40}
                                        uncheckedIcon={<div style={iconStyle}>Online</div>}
                                        checkedIcon={<div style={iconStyle}>Offline</div>}
                                        offColor="#fff"
                                        onColor="#fff"
                                        offHandleColor="#61D273"
                                        onHandleColor="#878787"
                                        handleDiameter={30}
                                        activeBoxShadow="0 0 2px 3px #3bf"
                                    />
                                </div>
                            </div>
                    }
                </div>
                <ProfileCard onClick={profile} text={userType === 'driver' ? "Drive Information" : "Profile Information"} src={userType === 'driver' ? licenseImg : User} />
                <ProfileCard onClick={orderhistory} text={userType === 'driver' ? "Driver History" : "Order History"} src={Hist} />
                <ProfileCard onClick={modalHandler} text="Contact Support" src={User} />
                <ProfileCard onClick={logout} logout={true} text="Log Out" src={User} />
            </div>
            <div className="profile-bg">
                {userType === 'consumer' && <img src={BG} />}
            </div>

        </div>
    )
}
export default ProfileSettings;