import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CartItems from '../components/CartItems'
import OnlineStoreProducts from '../components/OnlineStoreProducts_cart'
import { database } from '../config/firebase'
import { useHistory } from "react-router-dom";
import Geocode from "react-geocode";
import { getDistance, convertDistance } from 'geolib';

import Plus from '../images/plus-sign.svg'
import ShopLocal from '../components/ShopLocal'

Geocode.setApiKey("AIzaSyAUuy6Ir1exU6HybTu8H4j5ZH6ZG4MRFm0");

// set response language. Defaults to english.
Geocode.setLanguage("en");

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("es");

const CartScreen = () => {

    let userID = localStorage.getItem('userUid')


    const [storeData, setStoreData] = useState([])
    const [realData, setRealData] = useState([])
    const [opentStatus, setOpentStatus] = useState(false);
    var today = new Date()
    var today_Hour = today.getHours()
    var today_minute = today.getMinutes();
    var now_Mins = today_Hour * 60 + today_minute

    useEffect(() => {
        window.scrollTo(0, 0);

        var today = new Date()
        var day = today.getDay()
        let currentAddress = localStorage.getItem('disStreet')
        let currentlat = ""
        let currentlng = ""
        let storelat = ""
        let storelng = ""

        // Geting current delviery address coordinate
        if (currentAddress !== "" && currentAddress !== null && currentAddress !== undefined) {
            Geocode.fromAddress(currentAddress).then(
                (response) => {
                    const { lat, lng } = response.results[0].geometry.location;
                    currentlat = lat.toString();
                    currentlng = lng.toString();
                },
                (error) => {
                    console.error("currentAddress++++++++++++++++++++>", error);
                }
            );
        } else {
            console.log("currentAddress is not defined");
        }

        // Fetching store data
        database
            .ref("user")
            .on("value", async (snapshot) => {
                var data = []
                var realdata = []
                var openStoreData = []
                var row = {}
                var realDistance
                await snapshot.forEach(element => {
                    if (element.val().hasOwnProperty('dispensary')) {
                        let el = element.val().dispensary
                        row = {
                            id: element.key,
                            store: el.storeName,
                            ImageUrl: el.profileimage,
                            usertype: el.userType,
                            startTime: el.storeHours[day].startTime,
                            endTime: el.storeHours[day].endTime,
                            openStatus: el.storeHours[day].openStatus,
                            storeName: el.storeName,
                            storeStreetAdress: el.storeStreetAdress,
                        }
                        data.push(row)
                    }
                });
                // setStoreData(data)
                if (localStorage.getItem('loggedIn') === 'true') {
                    if (currentAddress !== "" && currentAddress !== null && currentAddress !== undefined) {
                        data.forEach((element) => {
                            database
                                .ref("Items/" + element.id)
                                .on("value", async (snapshot) => {
                                    var elementArray = [];
                                    if (snapshot.val() !== null && snapshot.val() !== undefined) {
                                        elementArray = Object.values(snapshot.val());
                                    }
                                    if (elementArray !== null && elementArray !== undefined && elementArray.length >= 3) {
                                        Geocode.fromAddress(element.storeStreetAdress).then(
                                            async (response) => {
                                                const { lat, lng } = response.results[0].geometry.location;
                                                storelat = lat.toString();
                                                storelng = lng.toString();
                                                if (storelat !== "" && storelat !== null && storelat !== undefined) {
                                                    let distance = await getDistance(
                                                        { latitude: currentlat, longitude: currentlng },
                                                        { latitude: storelat, longitude: storelng }
                                                    );
                                                    realDistance = convertDistance(distance, 'mi')
                                                    if (realDistance < 50) {
                                                        realdata.push(element)
                                                    }
                                                    var start_Time = element.startTime.split(" ")[0]
                                                    var flag_start_Time = element.startTime.split(" ")[1]
                                                    var end_Time = element.endTime.split(" ")[0]
                                                    var flag_end_Time = element.endTime.split(" ")[1]
                                                    var start_Time_Mins = flag_start_Time === "AM" ? parseInt(start_Time.split(":")[0]) * 60 + parseInt(start_Time.split(":")[1]) : (parseInt(start_Time.split(":")[0]) + 12) * 60 + parseInt(start_Time.split(":")[1])
                                                    var end_Time_Mins = flag_end_Time === "PM" ? (parseInt(end_Time.split(":")[0]) + 12) * 60 + parseInt(end_Time.split(":")[1]) : parseInt(end_Time.split(":")[0]) * 60 + parseInt(end_Time.split(":")[1])
                                                    openStoreData.push(element.id)
                                                    if (now_Mins >= start_Time_Mins && now_Mins <= end_Time_Mins) {
                                                        if (realDistance < 50) {
                                                            setOpentStatus(true)
                                                        }
                                                    } else {
                                                        console.log("closed");
                                                        setOpentStatus(false)
                                                    }

                                                    setStoreData(realdata)
                                                    // getOpenStoreData(openStoreData)
                                                } else {
                                                    console.log("betweendistance is null");
                                                }
                                            },
                                            (error) => {
                                                console.log("locationissue===>", error);
                                            }
                                        );
                                    }
                                })
                        })
                    } else {
                        data.forEach((element) => {
                            var start_Time = element.startTime.split(" ")[0]
                            var flag_start_Time = element.startTime.split(" ")[1]
                            var end_Time = element.endTime.split(" ")[0]
                            var flag_end_Time = element.endTime.split(" ")[1]
                            var start_Time_Mins = flag_start_Time === "AM" ? parseInt(start_Time.split(":")[0]) * 60 + parseInt(start_Time.split(":")[1]) : (parseInt(start_Time.split(":")[0]) + 12) * 60 + parseInt(start_Time.split(":")[1])
                            var end_Time_Mins = flag_end_Time === "PM" ? (parseInt(end_Time.split(":")[0]) + 12) * 60 + parseInt(end_Time.split(":")[1]) : parseInt(end_Time.split(":")[0]) * 60 + parseInt(end_Time.split(":")[1])
                            openStoreData.push(element.id)
                            if (now_Mins >= start_Time_Mins && now_Mins <= end_Time_Mins) {
                                setOpentStatus(true)
                            } else {
                                console.log("closed");
                                setOpentStatus(false)
                            }
                        })
                        setStoreData(data)
                        // getOpenStoreData(openStoreData)
                    }
                } else {
                    data.forEach((element) => {
                        var start_Time = element.startTime.split(" ")[0]
                        var flag_start_Time = element.startTime.split(" ")[1]
                        var end_Time = element.endTime.split(" ")[0]
                        var flag_end_Time = element.endTime.split(" ")[1]
                        var start_Time_Mins = flag_start_Time === "AM" ? parseInt(start_Time.split(":")[0]) * 60 + parseInt(start_Time.split(":")[1]) : (parseInt(start_Time.split(":")[0]) + 12) * 60 + parseInt(start_Time.split(":")[1])
                        var end_Time_Mins = flag_end_Time === "PM" ? (parseInt(end_Time.split(":")[0]) + 12) * 60 + parseInt(end_Time.split(":")[1]) : parseInt(end_Time.split(":")[0]) * 60 + parseInt(end_Time.split(":")[1])
                        openStoreData.push(element.id)
                        if (now_Mins >= start_Time_Mins && now_Mins <= end_Time_Mins) {
                            setOpentStatus(true)
                        } else {
                            setOpentStatus(false)
                            console.log("closed");
                        }
                    })
                    setStoreData(data)
                    // getOpenStoreData(openStoreData)
                }
            })

        database
            .ref("Carts/" + userID)
            .on("value", (snapshot) => {
                var data = []
                var row
                snapshot.forEach(element => {
                    row = {
                        "Description": element.val().Description,
                        "GpriceValue": element.val().GpriceValue,
                        "Tag": element.val().Tag,
                        "feeValue": element.val().feeValue,
                        "id": element.key,
                        "itemImage": element.val().itemImage,
                        "itemNum1": element.val().itemNum1,
                        "priceValue": element.val().priceValue,
                        "productName": element.val().productName,
                        "num": element.val().num,
                        "coaImage": element.val().coaImage,
                        "storeId": element.val().storeId,
                    }
                    data.push(row)
                });
                setRealData(data);
            })
        // loadData();
    }, [localStorage.getItem('disStreet')])

    let history = useHistory();
    const cart = () => {
        history.push("/");
    }

    const loadData = () => {
        database
            .ref("Carts/" + userID)
            .on("value", (snapshot) => {
                var data = []
                var row
                snapshot.forEach(element => {
                    row = {
                        "Description": element.val().Description,
                        "GpriceValue": element.val().GpriceValue,
                        "Tag": element.val().Tag,
                        "feeValue": element.val().feeValue,
                        "id": element.key,
                        "itemImage": element.val().itemImage,
                        "itemNum1": element.val().itemNum1,
                        "priceValue": element.val().priceValue,
                        "productName": element.val().productName,
                        "num": element.val().num,
                        "coaImage": element.val().coaImage,
                        "storeId": element.val().storeId,
                    }
                    data.push(row)
                });
                setRealData(data);
            })
    }

    return (
        <div>
            {realData == null || realData.length === 0 ?
                <div>
                    <Navbar />
                    <div className="empty-cart-cont">
                        <a href="/" onClick={cart} className="plus-btn"><img src={Plus} /></a>
                        <p className="empty-card-text">Shopping Cart Empty</p>
                    </div>
                    <ShopLocal data={storeData} />
                    <Footer />
                </div> :
                <div>
                    <Navbar />
                    <CartItems />
                    {/* <OnlineStoreProducts text="More Products from Cannabis Station " opentStatus={opentStatus} /> */}
                    <Footer />
                </div>
            }
        </div>
    )
}
export default CartScreen;