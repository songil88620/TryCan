import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import Blog from '../components/Blog'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import ShopLocal from '../components/ShopLocal'
import ShopProducts from '../components/ShopProducts'
import LocationSettingModal from '../components/LocationSettingModal'
// Firebase Integration Module
import { database } from '../config/firebase'
import Spinner from 'react-bootstrap/Spinner'

import Geocode from "react-geocode";
import { getDistance, convertDistance } from 'geolib';
import { date } from 'yup';
import SearchModal from '../components/SearchModal';
import AgeCheckModal from '../components/AgeCheckModal';
import AgeErrorModal from '../components/AgeErrorModal';

// if (typeof window !== "undefined") {
//     injectStyle();
// }

Geocode.setApiKey("AIzaSyAUuy6Ir1exU6HybTu8H4j5ZH6ZG4MRFm0");

// set response language. Defaults to english.
Geocode.setLanguage("en");

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("es");

const LandingScreen = () => {
    let history = useHistory()
    const [username, setUsername] = useState('')
    const [dropAddress, setDropAddress] = useState('')
    const [storeData, setStoreData] = useState([])
    const [openStoreID, setOpenStoreID] = useState([])
    const [product, setProduct] = useState([])
    const [modalShow, setModalShow] = useState(false);
    const [searchModalShow, setSearchModalShow] = useState(false);
    const [ageModalShow, setEgeModalShow] = useState(true);
    const [ageErrorModalShow, setEgeErrorModalShow] = useState(false);
    const [num, setNum] = useState(0);
    const [opentStatus, setOpentStatus] = useState(false);
    const [storeFlag, setStoreFlag] = useState(true);
    const [distanceFlat, setDistanceFlat] = useState(false)
    const [recongFlat, setRecongFlat] = useState(1)

    var today = new Date()
    var today_Hour = today.getHours()
    var today_minute = today.getMinutes();
    var now_Mins = today_Hour * 60 + today_minute

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {

        let userId = localStorage.getItem('userUid')

        var today = new Date()
        var day = today.getDay()
        let currentAddress = ""
        let currentCity = ""
        let currentZip = ""
        let currentlat = ""
        let currentlng = ""
        let storelat = ""
        let storelng = ""

        database
            .ref('user/' + userId + '/' + "consumer")
            .on("value", (snapshot) => {
                if (snapshot.val() !== null) {
                    if (snapshot.val().dropStreet !== null) {
                        currentAddress = snapshot.val().dropStreet
                        currentCity = snapshot.val().dropCity
                        currentZip = snapshot.val().dropZip
                        localStorage.setItem('disStreet', currentAddress);
                        localStorage.setItem('city', currentCity);
                        localStorage.setItem('zip', currentZip);
                    }
                    console.log("currentAddress+++++++++==========>", currentAddress);
                    // Geting current delviery address coordinate

                    // if (currentAddress !== "" && currentAddress !== null && currentAddress !== undefined) {
                    //     Geocode.fromAddress(currentAddress).then(
                    //         (response) => {
                    //             const { lat, lng } = response.results[0].geometry.location;
                    //             console.log("currentAddress==========>", lat, lng);
                    //             currentlat = lat.toString();
                    //             currentlng = lng.toString();
                    //         },
                    //         (error) => {
                    //             console.error("currentAddress++++++++++++++++++++>", error);
                    //         }
                    //     );
                    // } else {
                    //     console.log("currentAddress is not defined");
                    // }
                }
            })

        // Fetching store data
        database
            .ref("user")
            .on("value", async (snapshot) => {
                var data = []
                var realdata = []
                var openStoreData = []
                var storeIdList = []
                var row = {}
                var realDistance
                await snapshot.forEach((element) => {
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
                            online: el.storeHours[day].online,
                            storeName: el.storeName,
                            storeStreetAdress: el.storeStreetAdress,
                        }
                        data.push(row)
                        console.log("data====>", data);
                    }
                });

                if (localStorage.getItem('loggedIn') === 'true') {
                    if (currentAddress !== "" && currentAddress !== null && currentAddress !== undefined) {
                        Geocode.fromAddress(currentAddress).then(
                            (response) => {
                                const { lat, lng } = response.results[0].geometry.location;
                                console.log("currentAddress==========>", lat, lng);
                                currentlat = lat.toString();
                                currentlng = lng.toString();
                                data.forEach((element) => {
                                    console.log("element.id====>", element.id);
                                    database
                                        .ref("Items/" + element.id)
                                        .on("value", async (snapshot) => {
                                            console.log("element.id11111====>", element.id);
                                            console.log("snapshot11111====>", snapshot.val());
                                            var elementArray = [];
                                            if (snapshot.val() !== null && snapshot.val() !== undefined) {
                                                elementArray = Object.values(snapshot.val());
                                                console.log("elementArray====>", elementArray);
                                            }
                                            if (elementArray !== null && elementArray !== undefined && elementArray.length >= 3) {
                                                console.log("currentAddress=+++++++====>", currentAddress);
                                                console.log("element.storeStreetAdress=+++++++====>", element.storeStreetAdress);
                                                Geocode.fromAddress(element.storeStreetAdress).then(
                                                    async (response) => {
                                                        setRecongFlat(0)
                                                        const { lat, lng } = response.results[0].geometry.location;
                                                        storelat = lat.toString();
                                                        storelng = lng.toString();
                                                        console.log("currentAddresswww==========>", storelat, storelng);
                                                        if (storelat !== "" && storelat !== null && storelat !== undefined) {
                                                            let distance = await getDistance(
                                                                { latitude: currentlat, longitude: currentlng },
                                                                { latitude: storelat, longitude: storelng }
                                                            );
                                                            realDistance = convertDistance(distance, 'mi')
                                                            console.log("betweendistance=====>", realDistance);
                                                            if (element.online == true) {
                                                                if (realDistance < 50 && storeIdList.indexOf(elementArray[0].storeId) < 0) {
                                                                    storeIdList.push(elementArray[0].storeId);
                                                                    console.log("storeIdList====>", storeIdList);
                                                                    openStoreData.push(element.id)
                                                                    realdata.push(element)
                                                                    setDistanceFlat(true)
                                                                }
                                                            }
                                                            var start_Time = element.startTime.split(" ")[0]
                                                            var flag_start_Time = element.startTime.split(" ")[1]
                                                            var end_Time = element.endTime.split(" ")[0]
                                                            var flag_end_Time = element.endTime.split(" ")[1]
                                                            var start_Time_Mins = flag_start_Time === "AM" ? parseInt(start_Time.split(":")[0]) * 60 + parseInt(start_Time.split(":")[1]) : (parseInt(start_Time.split(":")[0]) + 12) * 60 + parseInt(start_Time.split(":")[1])
                                                            var end_Time_Mins = flag_end_Time === "PM" ? (parseInt(end_Time.split(":")[0]) + 12) * 60 + parseInt(end_Time.split(":")[1]) : parseInt(end_Time.split(":")[0]) * 60 + parseInt(end_Time.split(":")[1])

                                                            if (element.online == true) {
                                                                if (now_Mins >= start_Time_Mins && now_Mins <= end_Time_Mins) {
                                                                    setOpentStatus(true)
                                                                } else {
                                                                    setOpentStatus(false)
                                                                    console.log("closed");
                                                                }
                                                            }

                                                            setStoreData(realdata)
                                                            console.log("realdata==========>", realdata)
                                                            getOpenStoreData(openStoreData)
                                                        } else {
                                                            console.log("betweendistance is null");
                                                        }
                                                    },
                                                    (error) => {
                                                        console.log("response error");
                                                    }
                                                );
                                            } else {
                                                console.log("elementarray is empty");
                                                // setRecongFlat(0)
                                                // setDistanceFlat(false)
                                            }
                                        })
                                })
                            },
                            (error) => {
                                console.error("currentAddress++++++++++++++++++++>", error);
                                setRecongFlat(0)
                                setDistanceFlat(false)
                            }
                        );
                    } else {
                        setDistanceFlat(true)
                        console.log("The currentAddress is not defined");
                        data.forEach((element) => {
                            var start_Time = element.startTime.split(" ")[0]
                            var flag_start_Time = element.startTime.split(" ")[1]
                            var end_Time = element.endTime.split(" ")[0]
                            var flag_end_Time = element.endTime.split(" ")[1]
                            var start_Time_Mins = flag_start_Time === "AM" ? parseInt(start_Time.split(":")[0]) * 60 + parseInt(start_Time.split(":")[1]) : (parseInt(start_Time.split(":")[0]) + 12) * 60 + parseInt(start_Time.split(":")[1])
                            var end_Time_Mins = flag_end_Time === "PM" ? (parseInt(end_Time.split(":")[0]) + 12) * 60 + parseInt(end_Time.split(":")[1]) : parseInt(end_Time.split(":")[0]) * 60 + parseInt(end_Time.split(":")[1])
                            if (element.online == true) {
                                openStoreData.push(element.id)
                                realdata.push(element)
                            }
                            if (element.online == true) {
                                if (now_Mins >= start_Time_Mins && now_Mins <= end_Time_Mins) {
                                    console.log("element.id========>", element.id);
                                    setOpentStatus(true)
                                } else {
                                    console.log("closed");
                                    setOpentStatus(false)
                                }
                            }
                            setStoreData(realdata)
                        })
                        getOpenStoreData(openStoreData)
                    }
                } else {
                    console.log("The user is logout");
                    data.forEach((element) => {
                        var start_Time = element.startTime.split(" ")[0]
                        var flag_start_Time = element.startTime.split(" ")[1]
                        var end_Time = element.endTime.split(" ")[0]
                        var flag_end_Time = element.endTime.split(" ")[1]
                        var start_Time_Mins = flag_start_Time === "AM" ? parseInt(start_Time.split(":")[0]) * 60 + parseInt(start_Time.split(":")[1]) : (parseInt(start_Time.split(":")[0]) + 12) * 60 + parseInt(start_Time.split(":")[1])
                        var end_Time_Mins = flag_end_Time === "PM" ? (parseInt(end_Time.split(":")[0]) + 12) * 60 + parseInt(end_Time.split(":")[1]) : parseInt(end_Time.split(":")[0]) * 60 + parseInt(end_Time.split(":")[1])
                        if (element.online == true) {
                            openStoreData.push(element.id)
                            realdata.push(element)
                        }
                        if (element.online == true) {
                            if (now_Mins >= start_Time_Mins && now_Mins <= end_Time_Mins) {
                                console.log("element.id========>", element.id);
                                setOpentStatus(true)
                            } else {
                                console.log("closed");
                                setOpentStatus(false)
                            }
                        }
                        setStoreData(realdata)
                    })
                    getOpenStoreData(openStoreData)
                }

            })

        // checking login status
        if (localStorage.getItem('loggedIn') === 'true') {
            console.log("usertype+++++++++", localStorage.getItem('usertype'));
            let userId = localStorage.getItem('userUid')
            let usertype = localStorage.getItem('usertype')
            if (localStorage.getItem('usertype') === "dispensary") {
                database
                    .ref('user/' + userId + '/' + usertype)
                    .once("value", async (snapshot) => {
                        let user_data = {
                            firstName: snapshot.val().fristName,
                            lastName: snapshot.val().lastName,
                            profileimage: snapshot.val().profileimage,
                            storeName: snapshot.val().storeName,
                        };
                        localStorage.setItem('url', user_data.profileimage)
                        localStorage.setItem('storeName', user_data.storeName)
                    })
                history.push('/dispensarylanding')
            } else if (localStorage.getItem('usertype') === "driver") {
                database
                    .ref('user/' + userId + '/' + usertype)
                    .once("value", async (snapshot) => {
                        let user_data = {
                            firstName: snapshot.val().fristName,
                            lastName: snapshot.val().lastName,
                            profileimage: snapshot.val().profileimage,
                        };
                        localStorage.setItem('url', user_data.profileimage)
                        localStorage.setItem('username', user_data.firstName + ' ' + user_data.lastName.substr(0, 1))
                        setUsername(user_data.firstName + ' ' + user_data.lastName.substr(0, 1))
                    })
                history.push('/profile')
            } else if (localStorage.getItem('usertype') === "consumer") {
                database
                    .ref('user/' + userId + '/' + usertype)
                    .once("value", async (snapshot) => {
                        let user_data = {
                            firstName: snapshot.val().fristName,
                            lastName: snapshot.val().lastName,
                            profileimage: snapshot.val().profileimage,
                        };
                        localStorage.setItem('url', user_data.profileimage)
                        localStorage.setItem('username', user_data.firstName + ' ' + user_data.lastName.substr(0, 1))
                        setUsername(user_data.firstName + ' ' + user_data.lastName.substr(0, 1))
                    })
                history.push('/')
            }
            // Fetching userinfo(username, profile image)
        } else {
            history.push('/')
        }
    }, [])

    const getOpenStoreData = async (storeData) => {
        console.log("storeData", storeData);
        database
            .ref("Items")
            .on("value", async (snapshot) => {
                console.log("snapshot.val", snapshot.val());
                let productArray = []
                storeData.forEach(item => {
                    // console.log("item==>", item);
                    snapshot.forEach(element => {
                        // productArray = []
                        // console.log("element===>>>>>>", element.key)
                        if (element.key === item) {
                            // console.log(element.key);
                            console.log("element.key", element.key);
                            if (element.val() !== '' && element.val() !== null && element.val() !== undefined) {
                                let temp = element.val()
                                // console.log("item.val()=>", temp);
                                // Loop on object->temp
                                Object.keys(temp).forEach(val => {
                                    let value = temp[val];
                                    productArray.push(value)
                                    console.log("productArray===>>>>>>", productArray);
                                });
                            }
                        } else {
                        }
                    })
                })
                setProduct(productArray)
            })
    }

    useEffect(() => {
        console.log('This is Navbar loggedIn=>', localStorage.getItem('loggedIn'))
        if (localStorage.getItem('dropAddress') !== "" && localStorage.getItem('dropAddress') !== null && localStorage.getItem('dropAddress') !== undefined)
            setDropAddress(localStorage.getItem('dropAddress'))
    }, [localStorage.getItem('dropAddress')])

    const modalHandler = () => {
        setModalShow(true)
    }
    const searchModalPress = () => {
        setSearchModalShow(true)
    }

    const autoRefresh = () => {
        setNum(num + 1)
    }

    const ageCloseHandler = () => {
        setEgeModalShow(false)
        localStorage.setItem("ageFlag", "true")
    }

    return (
        <>
            <LocationSettingModal show={modalShow} onHide={() => setModalShow(false)} />
            <SearchModal show={searchModalShow} dropAddress={dropAddress} onHide={() => setSearchModalShow(false)} />
            <AgeErrorModal show={ageErrorModalShow} onHide={() => setEgeErrorModalShow(false)} />
            {localStorage.getItem("ageFlag") !== "true" && <AgeCheckModal show={ageModalShow} onHide={ageCloseHandler} onAgeErrorHandler={() => setEgeErrorModalShow(true)} />}
            <Navbar username={username} modalPress={modalHandler} searchModalPress={searchModalPress} />
            {localStorage.getItem('loggedIn') === 'true' ? "" : <Header />}
            {/* {!(username && product && storeData) ?
                localStorage.getItem('loggedIn') === 'true' ? '' :
                    <div>
                        <ShopLocal data={storeData} dropAddress={dropAddress} modalPress={modalHandler} reFresh={autoRefresh} />
                        <ShopProducts data={product} opentStatus={opentStatus} dropAddress={dropAddress} modalPress={modalHandler} />
                        <Blog />
                        <Footer />
                    </div> :
                storeData === [] || storeData === null || storeData === undefined || storeData.length < 1 ?
                    <div className="emptyErea">
                        <p className="emptyEearTitle">
                            Shop Local Stores
                        </p>
                        <p className="emptyEearText">
                            Sorry Bud, they're currently no stores in your area. We're working to expand our reach.
                        </p>
                        <Blog />
                        <Footer />
                    </div> :
                    <div>
                        <ShopLocal data={storeData} dropAddress={dropAddress} modalPress={modalHandler} reFresh={autoRefresh} />
                        <ShopProducts data={product} opentStatus={opentStatus} dropAddress={dropAddress} modalPress={modalHandler} />
                        <Blog />
                        <Footer />
                    </div>
            } */}
            {
                localStorage.getItem('loggedIn') === 'true' ?
                    distanceFlat == false ?
                        recongFlat == 1 ?
                            <Spinner animation="border" variant="primary" className="loading-border" /> :
                            <div className="emptyErea">
                                <p className="emptyEearTitle">
                                    Shop Local Stores
                                </p>
                                <p className="emptyEearText">
                                    Sorry Bud, they're currently no stores in your area. We're working to expand our reach.
                                </p>
                                <Blog />
                                <Footer />
                            </div> :
                        (username == "" || product.length == 0) ?
                            <Spinner animation="border" variant="primary" className="loading-border" />
                            :
                            <div>
                                <ShopLocal data={storeData} dropAddress={dropAddress} modalPress={modalHandler} reFresh={autoRefresh} />
                                <ShopProducts data={product} opentStatus={opentStatus} dropAddress={dropAddress} modalPress={modalHandler} />
                                <Blog />
                                <Footer />
                            </div>
                    : !(product && storeData) ?
                        <Spinner animation="border" variant="primary" className="loading-border" />
                        : <div>
                            <ShopLocal data={storeData} dropAddress={dropAddress} modalPress={modalHandler} reFresh={autoRefresh} />
                            <ShopProducts data={product} opentStatus={opentStatus} dropAddress={dropAddress} modalPress={modalHandler} />
                            <Blog />
                            <Footer />
                        </div>}
        </>
    )
}

export default LandingScreen
