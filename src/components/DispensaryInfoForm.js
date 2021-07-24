import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import App, { database, storage } from '../config/firebase'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { injectStyle } from "react-toastify/dist/inject-style";

import CustomInput from '../components/CustomInput'
import ProfileCard from '../components/ProfileCard'

import mapImg from '../images/mapImg.png'
import transMaple from '../images/profile-left.png'
import station from '../images/station.svg'
import FEINchecked from '../images/FEINchecked.svg'
import Password from '../images/password.svg';
import Email from '../images/email.svg'
import ProfileFormButton from './ProfileFormButton';

if (typeof window !== "undefined") {
  injectStyle();
}

const DispensarySignUpForm = () => {
  let history = useHistory();
  const submitHandler = e => {
    e.preventDefault();
    try {
      database
        .ref('user/' + userId + `/${usertype}`)
        .update({
          email: ownerEmail,
          fristName: firstName,
          lastName: lastName,
          phoneNum: ownerPhone,
          password: ownerPass,
          storeName: disName,
          storePhoneNum: disPhone,
          storeStreetAdress: disStreet,
          city: city,
          GA: GA,
          zipCode: zip,
          storeHours: storeHours,
          companyName: businessName,
          fein: feinName,
        });
      toast('Profile informations are updated.')
      setTimeout(() => {

      }, 3000)
    } catch (error) {
      console.log(error)
    }
    localStorage.setItem('storeName', disName)
    setAutoNum(autoNum + 1)
    // history.push("/dispensarylanding");
  }

  let userId = localStorage.getItem('userUid')

  const [usertype, setUsertype] = useState('')
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [ownerEmail, setOwnerEmail] = useState()
  const [ownerPhone, setOwnerPhone] = useState()
  const [ownerPass, setOwnerPass] = useState()

  const [disName, setDisName] = useState()
  const [disEmail, setDisEmail] = useState()
  const [disPhone, setDisphone] = useState()
  const [disStreet, setDisStreet] = useState()
  const [city, setCity] = useState()
  const [GA, setGA] = useState()
  const [zip, setZip] = useState();
  const [businessName, setBusinessName] = useState();
  const [feinName, setFeinName] = useState();
  const [storeHours, setStoreHours] = useState();
  const [autoNum, setAutoNum] = useState();

  const goToSetHours = () => {
    history.push("/hourupdate");
  }

  useEffect(() => {
    setUsertype(localStorage.getItem('usertype'))
    // Fetching user info from firebase DB
    database
      .ref('user/' + userId + '/dispensary')
      .once("value", async (snapshot) => {
        let user_data = {
          ownerEmail: snapshot.val().email,
          firstName: snapshot.val().fristName,
          lastName: snapshot.val().lastName,
          ownerPhone: snapshot.val().phoneNum,
          ownerPass: snapshot.val().password,
          disName: snapshot.val().storeName,
          disPhone: snapshot.val().storePhoneNum,
          disStreet: snapshot.val().storeStreetAdress,
          city: snapshot.val().city,
          GA: snapshot.val().GA,
          zip: snapshot.val().zipCode,
          storeHours: snapshot.val().storeHours,
          businessName: snapshot.val().companyName,
          feinName: snapshot.val().fein,
          profileimage: snapshot.val().profileimage,
          userType: snapshot.val().userType,
          availableBal: snapshot.val().availableBal
        };
        // localStorage.setItem('password', user_data.ownerPass)
        console.log(user_data);
        setFirstName(user_data.firstName)
        setLastName(user_data.lastName)
        setOwnerEmail(user_data.ownerEmail)
        setOwnerPhone(user_data.ownerPhone)
        setOwnerPass(user_data.ownerPass)
        setDisName(user_data.disName)
        setDisphone(user_data.disPhone)
        setDisStreet(user_data.disStreet)
        setCity(user_data.city)
        setGA(user_data.GA)
        setZip(user_data.zip)
        setBusinessName(user_data.businessName)
        setFeinName(user_data.feinName)
        setStoreHours(user_data.storeHours)
      })
  }, [])

  const setInformation = (val, order) => {
    if (order === 'first') {
      setFirstName(val)
    } else if (order === 'last') {
      setLastName(val)
    } else if (order === 'ownerEmail') {
      setOwnerEmail(val)
    } else if (order === 'ownerPhone') {
      setOwnerPhone(val)
    } else if (order === 'ownerPass') {
      setOwnerPass(val)
    } else if (order === 'disName') {
      setDisName(val)
    } else if (order === 'disEmail') {
      setDisEmail(val)
    } else if (order === 'disPhone') {
      setDisphone(val)
    } else if (order === 'disStreet') {
      setDisStreet(val)
    } else if (order === 'city') {
      setCity(val)
    } else if (order === 'GA') {
      setGA(val)
    } else if (order === 'zip') {
      setZip(val)
    } else if (order === 'businessName') {
      setBusinessName(val)
    } else if (order === 'feinName') {
      val = val.replace("-", "")
      if (val === "") {
        setFeinName(val)
        localStorage.setItem('feinName', val);
      } else {
        if (val.length >= 3) {
          var str = val.slice(0, 2) + '-' + val.slice(2)
          if (str[str.length - 1] <= '9' && str[str.length - 1] >= '0') {
            setFeinName(str)
            localStorage.setItem('feinName', str);

          }
        } else {
          if (val[val.length - 1] <= '9' && val[val.length - 1] >= '0') {
            setFeinName(val)
            localStorage.setItem('feinName', val);

          }
        }
      }
    }
  }
  const zipHandler = e => {
    const { value, maxLength } = e.target;
    const message = value.slice(0, maxLength);
    setZip(message);
  }

  const passwordHandler = () => {
    // history.push({
    //   pathname: '/changepassword',
    //   password: ownerPass,
    // });
    history.push(`/changepassword/${ownerPass}`);
  }

  const emailHandler = () => {
    history.push({
      pathname: '/changeemail',
      password: ownerPass,
      email: ownerEmail
    });
  }

  return (
    <>
      <div className="checkout-form-cont mt90 checkout-form-cont-spacing">
        <form className="checkout-form" onSubmit={submitHandler}>
          <h1 className="greyTxt">Store Information</h1>
          <div className="checkout-form-title-dispensary">
            <h2>Owner's Information</h2>
          </div>
          <div className="checkout-form-cont">
            <CustomInput placeholder="First Name" type="text" iconType="user" onChange={(e) => setInformation(e.target.value, 'first')} val={firstName} />
            <CustomInput placeholder="Last Name" type="text" iconType="user" onChange={(e) => setInformation(e.target.value, 'last')} val={lastName} />
            <CustomInput disabled={true} placeholder="Owner's Email Address" type="email" iconType="email" onChange={(e) => setInformation(e.target.value, 'ownerEmail')} val={ownerEmail} />
            {/* <ProfileCard logout={false} disabled={true} onClick={emailHandler} text={`${ownerEmail}`} src={Email} /> */}
            <CustomInput placeholder="Owner's Phone Number" type="text" iconType="user" onChange={(e) => setInformation(e.target.value, 'ownerPhone')} val={ownerPhone} />
            {/* <CustomInput placeholder="Change Password" type="password" iconType="password" onChange={(e) => setInformation(e.target.value, 'ownerPass')} val={ownerPass} /> */}
            <ProfileCard onClick={passwordHandler} text="Change Password" src={Password} />
          </div>

          <div className="checkout-form-title-dispensary">
            <h2>Store Information</h2>
          </div>
          <div className="checkout-form-cont">
            <CustomInput placeholder="Store Name" type="text" src={station} onChange={(e) => setInformation(e.target.value, 'disName')} val={disName} />
            {/* <CustomInput placeholder="Dispensary Email Address" type="email" iconType="email" onChange={(e) => setInformation(e.target.value, 'disEmail')} val={disEmail} /> */}
            <CustomInput placeholder="Store's Phone Number" type="text" iconType="user" onChange={(e) => setInformation(e.target.value, 'disPhone')} val={disPhone} />
            <CustomInput placeholder="Store's Street Address" type="text" src={mapImg} onChange={(e) => setInformation(e.target.value, 'disStreet')} val={disStreet} />
          </div>

          <div className="checkout-form-address-dispensary">
            <input placeholder="City" value={city} onChange={(e) => setInformation(e.target.value, 'city')} type="text" />
            <input placeholder="GA" value={GA} onChange={(e) => setInformation(e.target.value, 'GA')} type="text" />
            <input placeholder="Zip Code" value={zip} onChange={(e) => setInformation(e.target.value, 'zip')} type="number" maxLength={6} />
          </div>
          {/* <CustomInput placeholder="Dispensay's Hours" type="text" src={mapImg} /> */}
          <ProfileCard onClick={goToSetHours} text="Store's Hours" src={mapImg} />
          {/* <div className="terms-conditions pos-start">
            <input type="checkbox" id="auth" name="auth" width={40} />
            <label htmlFor="auth" id="agreeLabel">By checking I am an authorized signatory of this business, with the power to commit to binding agreements</label>
          </div> */}

          <div className="checkout-form-title-dispensary">
            <h1>Tax Information</h1>
          </div>
          <div className="checkout-form-cont">
            <CustomInput placeholder="Business entity/Company name" type="text" src={station} onChange={(e) => setInformation(e.target.value, 'businessName')} val={businessName} />
            <h5 className="mt10 mb30 greyTxt">Ensure this matches the offical tax focuments for your business.</h5>
            <CustomInput placeholder="FEIN(Fedral Employer Identification Number)" type="text" src={FEINchecked} onChange={(e) => setInformation(e.target.value, 'feinName')} val={feinName} maxLength={10} />
            {/* <div className="terms-conditions pos-start">
              <input type="checkbox" id="agreeTerms" name="agreeTerms" />
              <label htmlFor="agreeTerms" id="agreeLabel"> By checking this I agree to CannaGo's <a href='#' style={{ color: '#61D273' }}> Terms & Conditions</a> </label>
            </div> */}
          </div>
          <button className="checkout-form-update" type="submit">Update</button>
          <div className="large-img-cont-dispensary"><img src={transMaple} alt="transparent maple" className="transMaple" /></div>
        </form>
        <ToastContainer />
      </div>
    </>
  )
}
export default DispensarySignUpForm;