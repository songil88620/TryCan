import React, { useEffect, useState } from 'react'
import OrderHistoryCardItem from './OrderHistoryCardItem'
import capturePreviouslyAuthorizedAmount from '../payment/PaymentTransactions/capture-previously-authorized-amount';
import voidTransaction from '../payment/PaymentTransactions/void-transaction';
import ProfileModal from './ProfileModal'
import dayjs from 'dayjs';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { database } from '../config/firebase'


import OrderConfirmModal from './OrderConfirmModal'
import OrderRejectModal from './OrderRejectModal'
import OrderDenineModal from './OrderDenineModal'

function WebViewOrderConfirm(props) {

  const [userData, setuserData] = useState('')
  const [orderUserData, setOrderUserData] = useState('')
  const [lastName, setLastName] = useState('')
  const [loading, setLoading] = useState(false)
  const [availableBal, setAvailableBal] = useState(0)
  const [orderConfirmModalShow, setOrderConfirmModalShow] = useState(false);
  const [orderRejectModalShow, setOrderRejectModalShow] = useState(false);
  const [orderDenineModalShow, setOrderDenineModalShow] = useState(false);
  useEffect(() => {
    database
      .ref("user/" + props.orderUserId + "/consumer")
      .on("value", async (snapshot) => {
        var row
        row = {
          firstName: snapshot.val().fristName,
          lastName: snapshot.val().lastName,
          email: snapshot.val().email,
        }
        var lastName = row.lastName.substr(0, 1)
        setLastName(lastName)
        setOrderUserData(row)
      })

    let userId = localStorage.getItem('userUid')

    database
      .ref("user/" + userId + "/dispensary")
      .on("value", async (snapshot) => {
        var row
        row = {
          firstName: snapshot.val().fristName,
          lastName: snapshot.val().lastName,
          email: snapshot.val().email,
          phoneNum: snapshot.val().phoneNum,
          city: snapshot.val().city,
          storeStreetAdress: snapshot.val().storeStreetAdress,
          zipCode: snapshot.val().zipCode,
          availableBal: snapshot.val().availableBal,
          storeName: snapshot.val().storeName,
        }
        setuserData(row)
        setAvailableBal(row.availableBal)
      })
  }, [])

  const result = (res) => {
    setLoading(false);
    let resultCode = res.messages.resultCode
    console.log(res);

    // saving order data into firebase 
    if (resultCode == "Ok") {
      database
        .ref(`user/${props.orderUserId}/consumer`)
        .on("value", async (snapshot) => {
          var value = snapshot.val()
          var row
          row = {
            firstName: value.fristName,
            lastName: value.lastName,
            email: value.email,
          }
          console.log("props.row===", row)
          uploadConfirmData(row);
        })
      let today = dayjs(new Date()).format('hh:mm A MM/DD/YYYY');
      let userId = localStorage.getItem('userUid')
      let shopValue = ""
      if (userId == "0SDcLRbvhXd9WBLZJaGeTSViHFr1") {
        shopValue = availableBal + props.totalPrice * 0.775
      } else {
        shopValue = availableBal + props.totalPrice * 0.7
      }
      // if (props.usertype === 'dispensary') {
      var newOrderListKey = database.ref().child('OrderLists').push().key;
      var storeAddress = `${userData.storeStreetAdress}, ${userData.city}, GA, ${userData.zipCode}`
      var deliveryAddres = `${props.dropStreet}, ${props.dropCity}, GA, ${props.dropZip}`
      database
        .ref(`OrderLists/${newOrderListKey}`)
        .update({
          storeAddress: storeAddress,
          storeFirstName: userData.firstName,
          storeLastName: userData.lastName,
          storeEmail: userData.email,
          storePhoneNum: userData.phoneNum,
          deliveryAddres: deliveryAddres,
          consumerFirstName: props.firstName,
          consumerLastName: props.lastName,
          consumerEmail: props.email,
          consumerPhoneNum: props.phoneNum,
          specialIns: props.specialIns,
          placeDate: props.placeDate,
          confirmDate: today,
        })
      database
        .ref(`OrderItems/${userId}/${props.orderUserId}/${props.oderId}/`)
        .update({
          dropStatus: true,
          confirmStatus: true,
          dropDate: today,
          pendingStatus: "Captured",
        })
      database
        .ref(`user/${userId}/dispensary/`)
        .update({
          availableBal: shopValue,
        })
      console.log("props.orderItem====>", props.orderItem);
      props.orderItem.forEach(element => {
        var remainItemNum = element.itemNum1 - element.num
        if (element.variantRealArray === undefined || element.variantRealArray === null || element.variantRealArray.length === 0) {
          database
            .ref(`Items/${userId}/${element.itemId}/`)
            .update({
              itemNum1: remainItemNum,
            })
        } else {
          database
            .ref(`Items/${userId}/${element.itemId}/variantItemValues/${element.variantIndex}`)
            .update({
              count: remainItemNum,
            })
        }
      });
      console.log("after====", orderRejectModalShow);
      toast(`Thank you, CannaGo and ${orderUserData.firstName} ${orderUserData.lastName}. Have been notified. Please keep ${orderUserData.firstName} ${orderUserData.lastName}. in a safe place until a driver arrives.`)
      // setOrderRejectModalShow(true);
      // } else {
      //   history.push('driverorderstatus')
      // }
    } else {
      toast('Transaction Failed. Please try again.')
    }
  }

  const pickup = () => {
    // console.log(props.refTransID, props.refId);
    setOrderConfirmModalShow(true)
  }

  const orderConfirmHandler = () => {
    let data = { "refTransID": props.refTransID, "refId": props.refId }
    capturePreviouslyAuthorizedAmount.capturePreviouslyAuthorizedAmount(result, data);
  }

  const uploadConfirmData = (data) => {
    database.ref(`ConfirmedOrder/${props.orderUserId}/${props.oderId}`).update({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      storeName: userData.storeName,
      confirmedStatus: true
    });
  }

  const voidResult = (res) => {
    setLoading(false);
    let resultCode = res.messages.resultCode
    console.log(res);

    // saving order data into firebase 
    if (resultCode == "Ok") {
      let userId = localStorage.getItem('userUid')
      database
        .ref(`user/${props.orderUserId}/consumer`)
        .on("value", async (snapshot) => {
          var value = snapshot.val()
          var row
          row = {
            firstName: value.fristName,
            lastName: value.lastName,
            email: value.email,
          }
          console.log("props.row===", row)
          uploadReportData(row);
        })
      // alert('deny')
      database.ref('OrderItems/' + userId + "/" + props.orderUserId + "/" + props.oderId).update({
        placeStatus: false,
        pendingStatus: "Voided"
      });
      toast(`Thank you, CannaGo and ${userData.firstName} ${lastName}. have been notified of order cancelation.`)
    } else {
      toast('Transaction Failed. Please try again.')
    }
  }

  const deny = () => {
    setOrderDenineModalShow(true)
  }

  const orderDenineHandler = () => {
    let data = { "refTransID": props.refTransID, "refId": props.refId }
    voidTransaction.voidTransaction(voidResult, data)
  }

  const uploadReportData = (data) => {
    database.ref('RejectedOrder/' + props.orderUserId).update({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      storeName: userData.storeName,
      rejectedStatus: true
    });
  }

  const [modalShow, setModalShow] = useState(false);
  const modalHandler = () => {
    setModalShow(true)
  }
  return (
    <div className="order-confirm">
      <OrderConfirmModal show={orderConfirmModalShow} userData={orderUserData} lastName={lastName} onConfirm={() => orderConfirmHandler()} onHide={() => setOrderConfirmModalShow(false)} />
      <OrderDenineModal show={orderDenineModalShow} userData={orderUserData} lastName={lastName} onConfirm={() => orderDenineHandler()} onHide={() => setOrderDenineModalShow(false)} />
      <OrderRejectModal show={orderRejectModalShow} userData={orderUserData} lastName={lastName} onHide={() => setOrderRejectModalShow(false)} />
      <div className="order-confirm-wrapper">
        <div className="order-item-area">
          {props.orderItem && props.orderItem.map(el => (<OrderHistoryCardItem key={el.id} {...el} img={props.img1} price={props.price1} qty={props.qty1} confirm />))}
        </div>
        <div className="order-desc-area">
          <div className="row-array space-between">
            <h2 className="mb50">Order Placed {props.placeDate}</h2>
            {/* {
              !props.paid &&
              <div>
                <img src={msg} alt="msg" />
                <img src={phone} alt="phone" />
              </div>
            } */}
          </div>
          <div className="full-width">
            <h2>{orderUserData.firstName} {lastName}. order #{props.oderId}</h2>
            {
              props.usertype === 'dispensary' ?
                <>
                  <div className="row-array space-between">
                    <h3>Delivery Address:</h3>
                    <h3>{props.dropStreet}, {props.dropCity}, GA {props.dropZip}</h3>
                  </div>
                  <div className="row-array space-between">
                    <h3>Product Total</h3>
                    <h3>${props.totalPrice}</h3>
                  </div>
                  <div className="row-array space-between">
                    <h3>CannaGo's Service Fee</h3>
                    <h3>-${(props.totalPrice * 0.3).toFixed(2)}</h3>
                  </div>
                </>
                : props.paid ?
                  <>
                    <div className="row-array space-between">
                      <h3>Delivery Address:</h3>
                      <h3>{props.dropStreet}, {props.dropCity}, GA {props.dropZip}</h3>
                    </div>
                    <div className="row-array space-between">
                      <h3>Product Total</h3>
                      <h3>${props.totalPrice}</h3>
                    </div>
                    <div className="row-array space-between">
                      <h3>CannaGo's Service Fee</h3>
                      <h3>-${(props.totalPrice * 0.3).toFixed(2)}</h3>
                    </div>
                  </>
                  :
                  <>
                    <div className="row-array space-between">
                      <h3>Delivery Address:</h3>
                      <h3>{props.dropStreet}, {props.dropCity}, GA {props.dropZip}</h3>
                    </div>
                    <div className="row-array space-between">
                      <h3>Product Total</h3>
                      <h3>${props.totalPrice}</h3>
                    </div>
                    <div className="row-array space-between">
                      <h3>CannaGo's Service Fee</h3>
                      <h3>-${(props.totalPrice * 0.3).toFixed(2)}</h3>
                    </div>
                  </>
            }

          </div>
          <div className="row-array space-between full-width">
            <h2>Your payout:</h2>
            {
              props.usertype === 'dispensary' ?
                <h1 className="payout-price">${(props.totalPrice * 0.7).toFixed(2)}</h1>
                :
                <h1 className="payout-price">${(props.totalPrice * 0.7).toFixed(2)}</h1>
            }
          </div>
          <ProfileModal userData={userData} show={modalShow} onHide={() => setModalShow(false)} />
          {
            props.paid ?
              <div className="slipte-border">
                <button onClick={modalHandler} className="report" >Report an Issue</button>
                <h2 className="orderCompletedTxt">Order Completed {props.dropDate}</h2>
              </div>
              :
              <div className="space-between slipte-border">
                <button onClick={pickup} className="btn-pickup"> Order Ready For PickUp</button>
                <button onClick={deny} className="modal-cancel"> Don't have Item</button>
              </div>
          }
        </div>
      </div>
    </div >
  )
}

export default WebViewOrderConfirm
