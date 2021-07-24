import React, { useState, useEffect, useReducer } from 'react'
import App, { database, storage } from '../config/firebase'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { injectStyle } from "react-toastify/dist/inject-style";
import Spinner from 'react-bootstrap/Spinner'


import GoBackButton from '../components/GoBackButton'
import clip from '../images/clip.png'
import greenPhone from '../images/greenPhone.png'
import maple from '../images/maple.png'
import arrow from '../images/arrow.svg'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useHistory } from 'react-router-dom';

if (typeof window !== "undefined") {
  injectStyle();
}

export default function HourUpdateScreen() {
  const options = [
    'Closed', 'Open'
  ];
  const [autoRender, setAutoRender] = useState(0)

  let history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const [dayData, setDayData] = useState([
    { id: 1, day: 'Sun', openStatus: '', startTime: '', endTime: '', storeStartTime: '', storeEndTime: '', online: true },
    { id: 2, day: 'Mon', openStatus: '', startTime: '', endTime: '', storeStartTime: '', storeEndTime: '', online: true },
    { id: 3, day: 'Tues', openStatus: '', startTime: '', endTime: '', storeStartTime: '', storeEndTime: '', online: true },
    { id: 4, day: 'Wed', openStatus: '', startTime: '', endTime: '', storeStartTime: '', storeEndTime: '', online: true },
    { id: 5, day: 'Thurs', openStatus: '', startTime: '', endTime: '', storeStartTime: '', storeEndTime: '', online: true },
    { id: 6, day: 'Fri', openStatus: '', startTime: '', endTime: '', storeStartTime: '', storeEndTime: '', online: true },
    { id: 7, day: 'Sat', openStatus: '', startTime: '', endTime: '', storeStartTime: '', storeEndTime: '', online: true }
  ])
  const [timeflag, setTimeflag] = useState(false)
  const _onSelect = (option, i) => {
    console.log('option===>', option);
    // console.log('==i==>', i);
    // let copy = [...dayData];
    // copy[i]['openStatus']=option.value;
    // setDayData(copy)
    let copy = [...dayData];
    copy[i]['openStatus'] = option.value
    setDayData(copy)
    if (copy[i].openStatus === "Closed") {
      copy[i].startTime = ""
      copy[i].endTime = ""
      copy[i].storeStartTime = ""
      copy[i].storeEndTime = ""
    }
  }

  const startTimeHandler = (val, i) => {
    const { name, value } = val.target
    console.log(value)
    var timeSplit = value.split(':'),
      hours,
      minutes,
      meridian;
    hours = timeSplit[0];
    minutes = timeSplit[1];
    if (hours > 12) {
      meridian = 'PM';
      hours -= 12;
      var var1 = "0";
      if (hours < 10) {
        hours = var1.concat(hours);
      }
    } else if (hours < 12) {
      meridian = 'AM';
      if (hours == 0) {
        hours = 12;
      }
    } else {
      meridian = 'PM';
    }
    let copy = [...dayData];
    copy[i]['storeStartTime'] = value;
    copy[i]['startTime'] = hours + ":" + minutes + " " + meridian;
    setDayData(copy)
  }

  const endTimeHandler = (val, i) => {
    const { name, value } = val.target
    console.log(value)
    var timeSplit = value.split(':'),
      hours,
      minutes,
      meridian;
    hours = timeSplit[0];
    minutes = timeSplit[1];
    if (hours > 12) {
      meridian = 'PM';
      hours -= 12;
      var var1 = "0";
      if (hours < 10) {
        hours = var1.concat(hours);
      }
    } else if (hours < 12) {
      meridian = 'AM';
      if (hours == 0) {
        hours = 12;
      }
    } else {
      meridian = 'PM';
    }
    let copy = [...dayData];
    copy[i]['storeEndTime'] = value;
    copy[i]['endTime'] = hours + ":" + minutes + " " + meridian;
    setDayData(copy)
  }

  const SaveHours = () => {
    console.log("dayData++++++++++++++", dayData);
    var i
    var ban = true;
    for (i in dayData) {
      console.log(i)
      if (dayData[i].openStatus === "") {
        setTimeflag(false)
        ban = false;
        break
      } else if (dayData[i].openStatus == "Open") {
        if (dayData[i].startTime === "" || dayData[i].endTime === "") {
          ban = false;
          setTimeflag(false)
          break
        } else { ban = true }
      } else {
        ban = true
      }
    }
    gotoNext(ban)
  }

  const gotoNext = async (ban) => {
    let userId = localStorage.getItem('userUid')
    console.log(timeflag);
    if (ban === false) {
      toast("Please put in your dispensary's daily hours.");
    } else {
      try {
        database
          .ref('user/' + userId + '/dispensary')
          .update({
            storeHours: dayData,
          });
        toast('Profile informations are updated.')
        setTimeout(() => {

        }, 3000)
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    let userId = localStorage.getItem('userUid')
    database
      .ref('user/' + userId + '/dispensary')
      .once("value", async (snapshot) => {
        let user_data = {
          storeHours: snapshot.val().storeHours,
        };
        setDayData(user_data.storeHours)
      })
  }, [])


  return (
    <section className="sethour-section">
      <div className="checkout-form-cont">
        <div className="back-cont goback-position"><GoBackButton /></div>
      </div>
      <h2 className="mt90 mb90">Please enter your daily hours of operation</h2>
      <div className="time-container-box">
        {
          dayData.map((item, index) => (
            <div key={index} className="time-container">
              <Dropdown options={options}
                onChange={(val) => _onSelect(val, index)}
                value={item.openStatus}
                placeholder="Select"
                arrowClosed={<img src={arrow} alt="arrow" className="arrow-closed" />}
                arrowOpen={<img src={arrow} alt="arrow" className="arrow-opened" />}
                className="dropdown-body"
              />
              <h2>{item.day}</h2>
              <div className="time-item">
                <input onChange={(val) => startTimeHandler(val, index)} value={item.storeStartTime} style={{ color: item.openStatus === 'Closed' ? 'red' : 'black' }} type="time" className="timepicker" disabled={item.openStatus === 'Closed' && true} />
                <img src={arrow} alt="arrow" className="arrow-closed1" />
              </div>
              <h2>To</h2>
              <div className="time-item">
                <input onChange={(val) => endTimeHandler(val, index)} value={item.storeEndTime} style={{ color: item.openStatus === 'Closed' ? 'red' : 'black' }} type="time" className="timepicker" disabled={item.openStatus === 'Closed' && true} />
                <img src={arrow} alt="arrow" className="arrow-closed1" />
              </div>
            </div>
          ))
        }

      </div>
      <button onClick={SaveHours} className="checkout-form-submit" type="submit" style={{ width: 300 }}>Save Store Hours</button>
      <div className="clipArea"><img src={clip} alt="clip" className="clip" /></div>
      <div className="greenArea">
        <img src={greenPhone} alt="green" className="greenPhone-rotate" />
      </div>
      <div className="greenAreaCopyDispensaries">
        <img src={greenPhone} alt="green" className="greenPhoneCopyDispensaries-rotate" />
      </div>
      <div className="mapleAreaDispensaries">
        <img src={maple} alt="green" className="maple" />
      </div>
      <ToastContainer />
    </section>
  )
}
