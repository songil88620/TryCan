import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { injectStyle } from "react-toastify/dist/inject-style";

import Navbar from '../components/Navbar'
import Image from '../images/cannabis-small.png'
import SelectedProduct from '../components/SelectedProduct'
import OnlineStoreProducts from '../components/OnlineStoreProducts'
import Footer from '../components/Footer'
// Firebase Integration
import { database } from '../config/firebase'

import warningIcon from '../images/warningIcon.png'

if (typeof window !== "undefined") {
    injectStyle();
}

const SelectedItemScreen = (props) => {
    let urlID = props.match.params.id
    // let itemId = props.match.params.id.split('_')[0]
    // let storeId = props.match.params.id.split('_')[1]
    let opentStatus = urlID.split('_')[0]
    let storeId = urlID.split('_')[1]
    let tempLeng = storeId.length + opentStatus.length
    let itemId = urlID.substring(tempLeng + 2, urlID.length)
    const [product, setProduct] = useState([])
    const location = useLocation()
    // const [storeId, setStoreId] = useState('')
    // const [productId, setProductId] = useState(location.id)
    const [storeName, setStoreName] = useState('')
    const [newData, setNewData] = useState('')
    const [storeData, setStoreData] = useState('')
    const [timeOpentStatus, setTimeOpentStatus] = useState('')

    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeOpentStatus(opentStatus)
    }, [])
    useEffect(() => {
        console.log('storeId=>', props)
        // Fetching all items data of all store
        database
            .ref("Items/" + storeId + '/' + itemId)
            .on("value", async (snapshot) => {
                var row
                row = {
                    'Description': snapshot.val().Description,
                    'GpriceValue': snapshot.val().GpriceValue,
                    'Tag': snapshot.val().Tag,
                    'feeValue': snapshot.val().feeValue,
                    'id': snapshot.val().id,
                    'itemImage': snapshot.val().itemImage,
                    'itemNum1': snapshot.val().itemNum1,
                    'priceValue': snapshot.val().priceValue,
                    'productName': snapshot.val().productName,
                    'coaImage': snapshot.val().coaImage,
                    'coaFileType': snapshot.val().coaFileType,
                    'storeId': snapshot.val().storeId,
                    'variantItemValues': snapshot.val().variantItemValues,
                    'options': snapshot.val().options,
                    'addValue': snapshot.val().addValue,
                }
                console.log("row----", row);
                await setNewData(row)
            })
        // Fetching store name
        database
            .ref("user/" + storeId + '/' + 'dispensary')
            .on("value", async (snapshot) => {
                setStoreName(snapshot.val().storeName)
            })
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
                        storeId: element.val().storeId,
                        coaImage: element.val().coaImage,
                        coaFileType: element.val().coaFileType,
                        variantItemValues: element.val().variantItemValues,
                        options: element.val().options,
                        addValue: element.val().addValue,
                    }
                    data.push(row)
                });
                setStoreData(data)
                console.log("storeItems++++++44444", data);
            })
    }, [itemId])
    return (
        <div>
            <Navbar />
            <div className="small-img-cont"><img src={Image} alt="itemImage" style={{ width: "100%" }} /></div>
            <div className="selected-product-cont">
                {newData && <SelectedProduct data={newData} itemId={itemId} opentStatus={timeOpentStatus} />}
            </div>
            {
                timeOpentStatus === "false" ?
                    <div className="timeAlert">
                        <img src={warningIcon} alt="" style={{ width: 18, height: 18, marginRight: 10 }} />
                        <p style={{ textAlign: "center", padding: 0, fontSize: 12 }}>You’re shopping after hours. Please allow a two day window for your product(s) to be delivered.</p>
                    </div> : ""
            }
            <OnlineStoreProducts data={storeData} storeName={storeName} opentStatus={timeOpentStatus} />
            <Footer />
            <ToastContainer />
        </div>
    )
}
export default SelectedItemScreen;