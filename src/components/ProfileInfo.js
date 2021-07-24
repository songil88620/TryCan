import React, { useState, useEffect } from 'react'
import ImageRight from '../images/profile-right.png';
import ImageLeft from '../images/profile-left.png';
import User from '../images/user-green.svg'
import Contact from '../images/contact.svg'
import Email from '../images/email.svg'
import Password from '../images/password.svg';
import ProfileFormNameCard from './ProfileFormNameCard'
import ProfileFormButton from './ProfileFormButton'
import { useHistory } from "react-router-dom";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { AiOutlineUser } from 'react-icons/ai'
import down_left from '../images/down-left.png'
import App, { database, storage } from '../config/firebase'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { injectStyle } from "react-toastify/dist/inject-style";
import Spinner from 'react-bootstrap/Spinner';
import CustomInput from './CustomInput'

if (typeof window !== "undefined") {
    injectStyle();
}


const ProfileInfo = () => {
    const options = [
        'Male', 'Female', 'Gender Nonconforming', 'Prefer not to disclose'
    ];
    const [userData, setUserData] = useState({})
    let userId = localStorage.getItem('userUid')
    const [autoNum, setAutoNum] = useState(0)
    const [age, setAge] = useState(0)
    const [uploading, setUploading] = useState(false);
    let history = useHistory();
    const submitHandler = e => {
        e.preventDefault();
    }
    const phoneHandler = () => {
        history.push('/editcontact');
    }
    const emailHandler = () => {
        history.push('/changeemail', { password: userData.password, email: userData.email });
    }
    const passwordHandler = () => {
        // history.push('/changepassword', { password: userData.password });
        history.push(`/changepassword/${userData.password}`);
    }
    const deactivateHandler = () => {
        var user = App.auth().currentUser;
        var userUid = App.auth().currentUser.uid
        var result = window.confirm("Do you really want to deactivate account?");
        let userID = localStorage.getItem('userUid')
        if (result) {
            user.delete().then(function () {
                localStorage.removeItem('loggedIn');
                localStorage.removeItem('usertype')
                localStorage.removeItem('userUid')
                localStorage.removeItem('username')
                localStorage.removeItem('age')
                localStorage.removeItem('url')
                localStorage.removeItem('dropAddress')
                database.ref('user/' + userUid).remove();
                database.ref('Carts/' + userUid).remove();
                toast("Your CannaGo account was deactivated successfully. Thanks for using our app.")
                setTimeout(() => {
                    history.push("/");
                }, 1500);
            }, function (error) {
                console.log(error);
                if (error.message == "This operation is sensitive and requires recent authentication. Log in again before retrying this request.") {
                    toast("This operation is sensitive and requires recent authentication. Log in again before retrying this request.")
                }
            });

        } else {
            console.log("Undeleted");
        }
    }
    useEffect(() => {
        console.log('userData=>', userData);
        // Fetching user info from firebase DB
        database
            .ref('user/' + userId + '/consumer')
            .once("value", async (snapshot) => {
                let user_data = {
                    email: snapshot.val().email,
                    firstName: snapshot.val().fristName,
                    lastName: snapshot.val().lastName,
                    password: snapshot.val().password,
                    phoneNum: snapshot.val().phoneNum,
                    profileimage: snapshot.val().profileimage,
                    userType: snapshot.val().userType,
                    zipCode: snapshot.val().zipCode,
                    age: snapshot.val().age,
                    gender: snapshot.val().gender,
                    birthday: snapshot.val().birthday,
                    // data.push(row)
                };

                setUserData(user_data)
                // localStorage.setItem('password', user_data.password)
                localStorage.setItem('email', user_data.email)
                setAge(user_data.age)
                setTimeout(() => {
                    console.log('1sec===', user_data);
                }, 1000);
            })
    }, [])

    const changeFirstName = e => {
        userData.firstName = e.target.value
        setAutoNum(autoNum + 1)
    }
    const changeLastName = e => {
        userData.lastName = e.target.value
        setAutoNum(autoNum + 1)
    }
    const changeBirthday = e => {
        // userData.birthday = e.target.value
        console.log(e.target.value);
        const { name, value } = e.target
        console.log('++++++++++++', value);
        let currentDay = new Date();
        let currentYear = currentDay.getFullYear();
        let currentMonth = currentDay.getMonth();
        let currentDate = currentDay.getDate();

        // difference between birthday and current day

        var yearDif = currentYear - parseInt(value.substr(0, 4))
        var monDif = currentMonth + 1 - parseInt(value.substr(5, 2))
        var dateDif = currentDate - parseInt(value.substr(8, 2))

        if (yearDif >= 22) {
            if (monDif == 0) {
                if (dateDif >= 0) {
                    userData.birthday = value
                    setAge(yearDif)
                } else {
                    userData.birthday = value
                    setAge(yearDif - 1)
                }
            } else if (monDif < 0) {
                userData.birthday = value
                setAge(yearDif - 1)
            } else {
                userData.birthday = value
                setAge(yearDif)
            }
        } else if (yearDif == 21) {
            if (monDif == 0) {
                if (dateDif >= 0) {
                    userData.birthday = value
                    setAge(yearDif)
                } else {
                    userData.birthday = value
                    setAge(yearDif - 1)
                }
            } else if (monDif < 0) {
                userData.birthday = value
                setAge(yearDif - 1)
            } else {
                userData.birthday = value
                setAge(yearDif)
            }
        } else {
            userData.birthday = value
            setAge(yearDif)
        }
        setAutoNum(autoNum + 1)
    }
    const changePhoneNum = e => {
        userData.phoneNum = e.target.value
        setAutoNum(autoNum + 1)
    }



    const update = async () => {
        if (age < 21) {
            toast('Sorry, you have to be 21 or up!')
        } else {
            setUploading(true)
            try {
                await database
                    .ref('user/' + userId + '/consumer')
                    .update({
                        fristName: userData.firstName,
                        lastName: userData.lastName,
                        phoneNum: userData.phoneNum,
                        age: age,
                        birthday: userData.birthday,
                        gender: userData.gender,
                    });
                setUploading(false)
                toast('Profile informations are updated.')
                localStorage.setItem('username', userData.firstName + ' ' + userData.lastName.substr(0, 1))
                setTimeout(() => {

                }, 3000)
            } catch (error) {
                setUploading(false)
                console.log(error)
            }
        }
    }

    const _onSelect = (option) => {
        userData.gender = option
        setAutoNum(autoNum + 1)
    }

    return (
        <div>
            <div className="profile-img-right"><img src={ImageRight} /></div>
            <div className="profile-body-cont">
                <div className="profile-form-cont">
                    <div className="profile-form">
                        <h1>Profile Information</h1>
                        {/* <p>Welcome {userData.firstName || ''} {userData.lastName.substr(0, 1) || ''}, {userData.age || ''}</p> */}
                        <div className="profile-form-name">
                            {/* <ProfileFormNameCard type="text" src={User} text={"aaaa"} placeholder="First name" /> */}
                            <div className="profile-form-name-card">
                                <img src={User}></img>
                                <input onChange={changeFirstName} name="firstName" className="date-input" value={userData.firstName || ''} type='text' placeholder="First name" />
                            </div>
                            <div className="profile-form-name-card">
                                <img src={User}></img>
                                <input onChange={changeLastName} name="lastName" className="date-input" value={userData.lastName || ''} type='text' placeholder="Last name" />
                            </div>
                            <div className="profile-form-name-card">
                                <img src={User}></img>
                                <input disabled={true} onChange={changeBirthday} name="birthday" className="date-input" value={userData.birthday || ''} type='text' placeholder="Birthday" />
                            </div>
                        </div>
                        <div className="profile-cards">
                            <div className="profile-form-card2 profile-button">
                                <img src={Contact} ></img>
                                <input onChange={changePhoneNum} name="phoneNum" className="date-input" value={userData.phoneNum || ''} type='number' placeholder="Phone Number" />
                            </div>
                            <div className="profile-form-card2 profile-button">
                                <Dropdown options={options}
                                    onChange={(val) => _onSelect(val)}
                                    value={userData.gender}
                                    placeholder="Gender"
                                    arrowClosed={<img src={down_left} alt="arrow" className="arrow-closed3" />}
                                    arrowOpen={<img src={down_left} alt="arrow" className="arrow-opened3" />}
                                    className="profile-gender-box"
                                />
                                <AiOutlineUser color="#61D273" size={30} className="iconPos1" />
                            </div>
                            <ProfileFormButton disabled={true} onclick={emailHandler} text={`Email:  ${userData.email}`} src={Email} />
                            <ProfileFormButton onclick={passwordHandler} text="Change Password" src={Password} />
                            <ProfileFormButton onclick={deactivateHandler} isDeactive={true} text="Deactivate Account" src={User} />
                        </div>
                        <div className="form-submit">
                            <button onClick={update}>Update</button>
                        </div>
                    </div>

                </div>
            </div>
            <div className="profile-img-left"><img src={ImageLeft} /></div>
            <ToastContainer />
            {uploading && <Spinner animation="border" variant="primary" className="loading-border" />}
        </div>
    )
}
export default ProfileInfo