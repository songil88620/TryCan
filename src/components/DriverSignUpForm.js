import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import CustomInputLong from '../components/CustomInputLong'
import ProfileFormButton from '../components/ProfileFormButton'
import Footer from '../components/Footer'

import driverImg from '../images/driverImg.png'
import phoneIcon from '../images/phoneIcon.svg'
import licenseImg from '../images/licenseImg.svg'
import vehicleColor from '../images/vehicleColor.svg'
import agreement from '../images/agreement.svg'
import Password from '../images/password.svg';
import Email from '../images/email.svg'

const DriverSignUpForm = ({ ...props }) => {
  let history = useHistory();
  const submitHandler = e => {
    e.preventDefault();
    history.push("/profile");
  }
  const setHours = () => {
    history.push("/hourset");
  }
  const emailHandler = () => {
    history.push('/editemail');
  }
  const passwordHandler = () => {
    history.push('/editpassword');
  }

  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [birth, setBirth] = useState()
  const [license, setLicense] = useState()
  const [issued, setIssued] = useState()
  const [ownerEmail, setOwnerEmail] = useState()
  const [ownerPhone, setOwnerPhone] = useState()
  const [ownerPass, setOwnerPass] = useState()
  const [ownerCpass, setOwnerCpass] = useState()

  const [disName, setDisName] = useState()
  const [disPhone, setDisphone] = useState()
  const [disStreet, setDisStreet] = useState()
  const [disCard, setDisCard] = useState()
  const [provider, setProvider] = useState()
  const [insurance, setInsurance] = useState()
  const [insExp, setInsExp] = useState();
  const [businessName, setBusinessName] = useState();
  const [feinName, setFeinName] = useState();

  const setInformation = (val, order) => {
    if (order === 'first') {
      setFirstName(val)
    } else if (order === 'last') {
      setLastName(val)
    } else if (order === 'birth') {
      setBirth(val)
    } else if (order === 'license') {
      setLicense(val)
    } else if (order === 'issued') {
      setIssued(val)
    } else if (order === 'ownerEmail') {
      setOwnerEmail(val)
    } else if (order === 'ownerPhone') {
      setOwnerPhone(val)
    } else if (order === 'ownerPass') {
      setOwnerPass(val)
    } else if (order === 'ownerCpass') {
      setOwnerCpass(val)
    } else if (order === 'disName') {
      setDisName(val)
    } else if (order === 'disPhone') {
      setDisphone(val)
    } else if (order === 'disStreet') {
      setDisStreet(val)
    } else if (order === 'disCard') {
      setDisCard(val)
    } else if (order === 'provider') {
      setProvider(val)
    } else if (order === 'insurance') {
      setInsurance(val)
    } else if (order === 'insExp') {
      setInsExp(val)
    } else if (order === 'businessName') {
      setBusinessName(val)
    } else if (order === 'feinName') {
      setFeinName(val)
    }
  }

  const gotoTerms = () => {
    history.push("/termsconditions");
  }
  return (
    <>
      <div className="checkout-form-cont-driverinfo">
        <form className="checkout-form" onSubmit={submitHandler}>

          <div className="checkout-form-cont">
            <div className="row-array space-between">
              <CustomInputLong placeholder="First Name" type="text" iconType="user" onChange={(e) => setInformation(e.target.value, 'first')} val={firstName} half />
              <CustomInputLong placeholder="Last Name" type="text" iconType="user" onChange={(e) => setInformation(e.target.value, 'last')} val={lastName} half />
            </div>
            <div className="row-array space-between">
              <CustomInputLong placeholder="Date of Birth" type="text" iconType="user" onChange={(e) => setInformation(e.target.value, 'birth')} val={birth} third />
              <CustomInputLong placeholder="Driver's License" type="text" src={licenseImg} onChange={(e) => setInformation(e.target.value, 'license')} val={license} third />
              <CustomInputLong placeholder="State Issued" type="text" src={licenseImg} onChange={(e) => setInformation(e.target.value, 'issued')} val={issued} third />
            </div>
            {props.driverInfo ?
              <div style={{ width: '100%', marginTop: -20, marginBottom: 20 }} className="right-left-padding">
                <ProfileFormButton onclick={emailHandler} text="johndoe@gmail.com" src={Email} />
                <ProfileFormButton onclick={passwordHandler} text="Change Password" src={Password} />
              </div>
              :
              <>
                <CustomInputLong placeholder="Email Address" type="email" iconType="email" onChange={(e) => setInformation(e.target.value, 'ownerEmail')} val={ownerEmail} />
                <CustomInputLong placeholder="Password" type="password" iconType="password" onChange={(e) => setInformation(e.target.value, 'ownerPass')} val={ownerPass} />
                <CustomInputLong placeholder="Retype Password" type="password" iconType="password" onChange={(e) => setInformation(e.target.value, 'ownerCpass')} val={ownerCpass} />
              </>
            }
            <CustomInputLong placeholder="Mobile Number" type="number" src={phoneIcon} onChange={(e) => setInformation(e.target.value, 'ownerPhone')} val={ownerPhone} />
          </div>

          <div className="checkout-form-title-dispensary">
            <h1>Vehicle Information</h1>
          </div>
          <div className="checkout-form-cont">
            <CustomInputLong placeholder="Vehicle Name" type="text" iconType="user" onChange={(e) => setInformation(e.target.value, 'disName')} val={disName} />
            <CustomInputLong placeholder="Vehicle Model" type="text" iconType="user" onChange={(e) => setInformation(e.target.value, 'disPhone')} val={disPhone} />
            <CustomInputLong placeholder="Vehicle Color" type="email" src={vehicleColor} onChange={(e) => setInformation(e.target.value, 'disStreet')} val={disStreet} />
            <CustomInputLong placeholder="Vehicle License Plate Number" type="email" src={licenseImg} onChange={(e) => setInformation(e.target.value, 'disCard')} val={disCard} />
          </div>
          <div className="row-array space-between">
            <CustomInputLong placeholder="Insurance Provider" type="text" src={licenseImg} onChange={(e) => setInformation(e.target.value, 'provider')} val={provider} third />
            <CustomInputLong placeholder="Insurance #" type="text" src={licenseImg} onChange={(e) => setInformation(e.target.value, 'insurance')} val={insurance} third />
            <CustomInputLong placeholder="Insurance Exp" type="text" src={licenseImg} onChange={(e) => setInformation(e.target.value, 'insExp')} val={insExp} third />
          </div>

          <div className="checkout-form-title-dispensary">
            <h1>Tax Information</h1>
          </div>
          <CustomInputLong placeholder="1099 Agreement" type="text" src={agreement} onChange={(e) => setInformation(e.target.value, 'businessName')} val={businessName} />
          <div className="terms-conditions mt30">
            <input type="checkbox" id="agreeTerms" name="agreeTerms" />
            <label htmlFor="agreeTerms" id="agreeLabel"> By checking this I agree to CannaGo's <a onClick={gotoTerms}  style={{ color: '#61D273' }}> Terms & Conditions</a> </label>
          </div>
          {
            props.driverInfo ?
              <button className="checkout-form-update" type="submit">Update</button>
              :
              <button className="checkout-form-submit" type="submit">Create Account</button>
          }
        </form>
        <div className="large-img-cont-driver"><img src={driverImg} alt="transparent maple" className="transMaple" /></div>
      </div>
      <Footer />
    </>
  )
}
export default DriverSignUpForm;