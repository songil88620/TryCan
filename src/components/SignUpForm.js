import React, { useState, useEffect } from 'react'
import Profile from './Profile'
import CustomInput from './CustomInput'
import avatar from '../images/emptyUser.png'
import { useHistory } from 'react-router-dom'
import bcrypt from 'bcryptjs'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import arrow from '../images/arrow.svg'
import down_left from '../images/down-left.png'
import { AiOutlineMail } from 'react-icons/ai'
import { BsLock } from 'react-icons/bs'
import { AiOutlineUser } from 'react-icons/ai'
// integration module
import App, { database, storage } from '../config/firebase'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { injectStyle } from "react-toastify/dist/inject-style";
import Spinner from 'react-bootstrap/Spinner'
import User from '../images/user-green.svg'

import atl_zipCode from '../constants/zipCode'

if (typeof window !== "undefined") {
  injectStyle();
}

function SignUpForm(props) {

  const options = [
    'Male', 'Female', 'Gender Nonconforming', 'Prefer not to disclose'
  ];

  let history = useHistory();
  // const submitHandler = () => {
  //   localStorage.setItem('usertype', 'consumer')
  //   history.push("/");
  // }
  const [usertype, setUsertype] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthday, setBirthday] = useState('')
  const [zipCode, setZip] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [age, setAge] = useState(0)
  const [gender, setGender] = useState()
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState(avatar);
  const [buttonflag, setButtonflag] = useState(false);

  useEffect(() => {
    setUsertype(localStorage.getItem('usertype'))
  }, [])

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
              setLoading(false)
            });
        }
      );
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    let terms = document.getElementById("agreeTerms").checked
    // if (url === avatar) {
    //   toast("Please upload photo.");
    // } else 
    if (phoneNum.length < 10) {
      toast("Please enter valid phone number.");
    } else if (age < 21) {
      toast('Sorry, you have to be 21 or up!')
    } else if (!loading && terms) {
      if (password.length < 6) {
        toast('Password must be at least 6 letters')
      } else if (password != confirmPassword) {
        toast("Confirm password doesn't match password!")
      } else if (zipCode.length != 5 || atl_zipCode.zip.indexOf(zipCode) < 0) {
        toast('Sorry, CannaGo is not serving that area.')
      } else {
        setUploading(true)
        try {
          await App
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((res) => {
              localStorage.setItem('loggedIn', 'true')
              localStorage.setItem('username', firstName + ' ' + lastName.substr(0, 1))
              localStorage.setItem('userUid', res.user.uid)
              localStorage.setItem('age', age)
              // console.log('res=>',res.user.uid);
              database.ref('user/' + res.user.uid + `/${usertype}`).update({
                email: email,
                fristName: firstName,
                lastName: lastName,
                phoneNum: phoneNum,
                password: bcrypt.hashSync(password),
                profileimage: url,
                userType: usertype,
                availableBal: 0,
                birthday: birthday,
                zipCode: zipCode,
                age: age,
                gender: gender,
                displayName: firstName + lastName.substr(0, 1)
              })
              setUploading(false)
              history.push('/')
            })
            .catch(error => {
              setUploading(false)
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(errorMessage)
              if (errorCode === 'auth/email-already-in-use') {
                toast.warning(errorMessage)
                return false;
              } else {
                alert(error)
              }
            })
        } catch (error) {
          console.log(error);
          alert('Network error', error)
        }
      }
    }
  }

  const zipHandler = (e) => {
    const { value } = e.target;
    const message = value.slice(0, 6);
    setZip(message);
  }

  const birthdayHandler = async (e) => {
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
          setBirthday(value)
          setAge(yearDif)
        } else {
          setBirthday(value)
          setAge(yearDif - 1)
        }
      } else if (monDif < 0) {
        setBirthday(value)
        setAge(yearDif - 1)
      } else {
        setBirthday(value)
        setAge(yearDif)
      }
    } else if (yearDif == 21) {
      if (monDif == 0) {
        if (dateDif >= 0) {
          setBirthday(value)
          setAge(yearDif)
        } else {
          setBirthday(value)
          setAge(yearDif - 1)
        }
      } else if (monDif < 0) {
        setBirthday(value)
        setAge(yearDif - 1)
      } else {
        setBirthday(value)
        setAge(yearDif)
      }
    } else {
      setBirthday(value)
      setAge(yearDif)
    }

    // console.log('============', value.substr(8, 2));
    // console.log('============', value.substr(5, 2));
    // let age = currentYear - parseInt(value.substr(0, 4))

  }

  const _onSelect = (option) => {
    console.log(option);
    setGender(option)
  }

  const changebuttonstatus = () => {
    setButtonflag(true)
  }

  const gotoTerms = () => {
    history.push("/termsconditions");
  }

  return (
    <form className="in-section" onSubmit={submitHandler}>
      <Profile onClick={plusHandler} onChange={imageHandler} src={url} loading={loading} />
      <div className="align-row shortWidth">
        <CustomInput name="firstName" onChange={e => setFirstName(e.target.value)} val={firstName} placeholder="First Name" type="text" iconType="user" half />
        <CustomInput name="lastName" onChange={e => setLastName(e.target.value)} val={lastName} placeholder="Last Name" type="text" iconType="user" half />
      </div>
      <div className="align-row shortWidth">
        {/* <CustomInput name="birthday" onChange={birthdayHandler} val={birthday} placeholder="Date of Birth" type="date" iconType="user" half /> */}
        {buttonflag === false ?
          <div className="inputField-half profile-form-name-card" style={{ height: 60, marginTop: 10 }}>
            <img src={User} style={{ zIndex: 100 }}></img>
            <button onChange={birthdayHandler} className="timepickerButton" onClick={changebuttonstatus}>Date of Birth</button>
            <img src={down_left} alt="arrow" className="date-arrow" />
          </div>
          :
          <div className="inputField-half profile-form-name-card" style={{ height: 60, marginTop: 10 }}>
            <img src={User} style={{ zIndex: 100 }}></img>
            <input onChange={birthdayHandler} name="birthday" value={birthday} type="date" className="timepickerInput" placeholder="Date of Birth" />
            <img src={down_left} alt="arrow" className="date-arrow" />
          </div>
        }
        <CustomInput name="zipCode" onChange={zipHandler} val={zipCode} placeholder="Delivery Zip" type="number" iconType="user" half />
      </div>
      <div className="inputFieldLong">
        <Dropdown options={options}
          onChange={(val) => _onSelect(val)}
          value={gender}
          placeholder="Gender"
          arrowClosed={<img src={down_left} alt="arrow" className="arrow-closed2" />}
          arrowOpen={<img src={down_left} alt="arrow" className="arrow-opened2" />}
          className="gender-dropbox"
        />
        <AiOutlineUser color="#61D273" size={30} className="iconPos" />
      </div>
      <CustomInput name="email" onChange={e => setEmail(e.target.value)} val={email} placeholder="Email Address" type="email" iconType="email" />
      <CustomInput name="password" onChange={e => setPassword(e.target.value)} val={password} placeholder="Password" type="password" iconType="password" />
      <CustomInput name="confirmPassword" onChange={e => setConfirmPassword(e.target.value)} val={confirmPassword} placeholder="Retype password" type="password" iconType="password" />
      <CustomInput name="phoneNum" onChange={e => setPhoneNum(e.target.value)} val={phoneNum} placeholder="Mobile number" type="number" iconType="user" />

      <div className="terms-conditions pos-start">
        <input type="checkbox" id="agreeTerms" name="agreeTerms" required />
        <label htmlFor="agreeTerms" id="agreeLabel"> By checking this I agree to CannaGo's <a onClick={gotoTerms} style={{ color: '#61D273' }}> Terms & Conditions</a> </label>
      </div>
      {/* <input type="date" /> */}
      <button className="bt-primary" disabled={uploading}>Create Account</button>
      <ToastContainer />
      {uploading && <Spinner animation="border" variant="primary" className="loading-border" />}
    </form>
  )
}

export default SignUpForm
