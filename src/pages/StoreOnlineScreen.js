import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import GoBackButton from '../components/GoBackButton'
import ShoppingStations from '../components/ShoppingStations'
import StoreOnlineProducts from '../components/StoreOnlineProducts'
import Leaf from '../images/cannabis-large.png'
import warningIcon from '../images/warningIcon.png'
// Firebase integration module
import { database } from '../config/firebase'


import SearchModal from '../components/SearchModal';
import LocationSettingModal from '../components/LocationSettingModal'

const StoreOnlineScreen = (props) => {
    let propsInfo = props.match.params.id
    let opentStatus = propsInfo.split('_')[0]
    let storeId = propsInfo.split('_')[1]
    const location = useLocation()
    const [param, setParam] = useState('')
    const [data, setData] = useState([])
    const [modalShow, setModalShow] = useState(false);
    const [timeopentStatus, setTimeopentStatus] = useState(false);
    const [searchModalShow, setSearchModalShow] = useState(false);

    useEffect(() => {
        console.log(timeopentStatus);
        window.scrollTo(0, 0);
        setTimeopentStatus(opentStatus)
    }, [])

    useEffect(() => {
        console.log("sssssssssssssssssssss");
        console.log(storeId);
        database
            .ref("Items/" + storeId)
            .on("value", (snapshot) => {
                var data = []
                var row
                snapshot.forEach(element => {
                    row = {
                        Description: element.val().Description,
                        GpriceValue: element.val().GpriceValue,
                        Tag: element.val().Tag,
                        feeValue: element.val().feeValue,
                        id: element.val().id,
                        itemImage: element.val().itemImage,
                        itemNum1: element.val().itemNum1,
                        priceValue: element.val().priceValue,
                        productName: element.val().productName,
                        storeId: element.val().storeId
                    }
                    data.push(row)
                });
                console.log(data);
                setData(data)
            })

        database
            .ref("user/" + storeId + '/dispensary')
            .on("value", (snapshot) => {
                var row
                row = {
                    storeName: snapshot.val().storeName,
                    profileimage: snapshot.val().profileimage,
                }
                setParam(row)
            });
    }, [])
    const modalHandler = () => {
        setModalShow(true)
    }
    const searchModalPress = () => {
        setSearchModalShow(true)
    }
    return (
        <>
            <LocationSettingModal show={modalShow} onHide={() => setModalShow(false)} />
            <SearchModal show={searchModalShow} onHide={() => setSearchModalShow(false)} />
            <Navbar modalPress={modalHandler} searchModalPress={searchModalPress} />
            <div className="shopping-station-cont">
                <div className="back-cont"><GoBackButton /></div>
                <ShoppingStations {...param} />
            </div>
            {
                timeopentStatus === "false" ?
                    <div className="timeAlert">
                        <img src={warningIcon} alt="" style={{ width: 18, height: 18, marginRight:10 }} />
                        <p style={{ textAlign: "center", padding: 0, fontSize:12 }}>You’re shopping after hours. Please allow a two day window for your product(s) to be delivered.</p>
                    </div> : ""
            }
            <StoreOnlineProducts data={data} timeopentStatus={timeopentStatus} />
            <div className="large-img-cont"><img src={Leaf} alt="" style={{ width: "100%" }} /></div>
            <Footer />
        </>
    )
}

export default StoreOnlineScreen;