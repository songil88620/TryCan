import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { AiOutlineUser } from 'react-icons/ai'

import { database } from '../config/firebase'
import COAImageModal from '../components/COAImageModal'
import down_left from '../images/down-left.png'

const SelectedProduct = (props) => {

    const [modalShow, setModalShow] = useState(false);
    const [variantValue, setVariantValue] = useState([]);
    const [variantIndex, setVariantIndex] = useState([]);
    const [variantRealArray, setVariantRealArray] = useState([]);
    const [data, setData] = useState([])
    const [price, setPrice] = useState(0)
    const [itemNumber, setItemNumber] = useState(0)
    const [imageUrl, setImageUrl] = useState("")
    const [productName, setProductName] = useState("")
    var AddFlag = false;
    var num = 0;
    var realdata = ""
    var realId = ""

    useEffect(() => {
        console.log("propsdata====>", props.data);
        setPrice(props.data.priceValue);
        setImageUrl(props.data.itemImage);
        setItemNumber(props.data.itemNum1);
        setProductName(props.data.productName);
        setVariantValue([])
    }, [props])

    const history = useHistory()
    let userID = localStorage.getItem('userUid')

    const shoppingcart = () => {
        console.log("++++++++", props.itemId);
        realdata = []

        database
            .ref("Carts/" + userID)
            .once("value", (snapshot) => {
                var row
                snapshot.forEach(element => {
                    row = {
                        id: element.val().id,
                        num: element.val().num,
                        variantRealArray: element.val().variantRealArray,
                        itemId: element.val().itemId,
                        addValue: element.val().addValue,
                    }
                    realdata.push(row)
                });
                console.log(realdata);
                setData(realdata)
                if (realdata.length === 0) {
                    AddFlag = true
                    console.log(AddFlag);
                    console.log("here");
                } else {
                    var i
                    for (i in realdata) {
                        if (realdata[i].variantRealArray == null || realdata[i].variantRealArray == undefined || realdata[i].variantRealArray.length == 0) {
                            if (realdata[i].itemId == props.data.id) {
                                AddFlag = false;
                                realId = realdata[i].id
                                break;
                            } else {
                                AddFlag = true
                            }
                        } else {
                            if (realdata[i].itemId == props.data.id) {
                                var array1 = realdata[i].variantRealArray;
                                var array2 = variantRealArray;
                                var is_same = array1.length == array2.length && array1.every(function (element, index) {
                                    return element === array2[index];
                                });
                            } else {
                                AddFlag = true
                            }
                        }
                        if (is_same == true) {
                            console.log(realdata[i].id);
                            num = realdata[i].num
                            AddFlag = false;
                            realId = realdata[i].id
                            break;
                        } else {
                            AddFlag = true
                        }
                    }
                    console.log(AddFlag);
                }
                AddCart();
            })
    }

    const AddCart = () => {
        if (localStorage.getItem('loggedIn') === 'true') {
            if (AddFlag === true) {
                try {
                    var feeValue = ""
                    var GpriceValue = ""
                    var newCartKey = database.ref().child('Carts').push().key;
                    if (props.data.storeId == "0SDcLRbvhXd9WBLZJaGeTSViHFr1") {
                        feeValue = parseFloat(price * 0.225).toFixed(2)
                        GpriceValue = parseFloat(price * 0.775).toFixed(2)
                    } else {
                        feeValue = parseFloat(price * 0.3).toFixed(2)
                        GpriceValue = parseFloat(price * 0.7).toFixed(2)
                    }
                    database
                        .ref('Carts/' + userID + '/' + newCartKey)
                        .update({
                            Description: props.data.Description,
                            GpriceValue: GpriceValue,
                            Tag: props.data.Tag,
                            feeValue: feeValue,
                            itemImage: imageUrl,
                            itemNum1: itemNumber,
                            priceValue: price,
                            productName: productName,
                            coaImage: props.data.coaImage,
                            num: 1,
                            id: newCartKey,
                            storeId: props.data.storeId,
                            variantRealArray: variantRealArray,
                            variantIndex: variantIndex,
                            itemId: props.data.id,
                            addValue: props.data.addValue
                        });
                    history.push("/cart");
                    localStorage.setItem('openStatus', props.opentStatus)
                } catch (error) {
                    console.log(error)
                }
            } else {
                try {
                    // var newCartKey = database.ref().child('Carts').push().key;
                    database
                        .ref('Carts/' + userID + '/' + realId)
                        .update({
                            num: num + 1,
                        });
                    history.push("/cart");
                    localStorage.setItem('openStatus', props.opentStatus)
                } catch (error) {
                    console.log(error)
                }
            }
        } else {
            history.push('/login');
        }
    }

    const previewCoa = () => {
        setModalShow(true)
    }

    const _onSelect = (option, index) => {
        var temp = [...variantValue]
        var realTemp = [...variantRealArray]
        temp[index] = option
        realTemp[index] = option.value
        console.log("temp====>", temp);
        console.log("realTemp====>", realTemp);
        props.data.variantItemValues.forEach((element, index) => {
            console.log(element.variantValue, realTemp, index);
            var array1 = element.variantValue;
            var array2 = realTemp;
            var is_same = array1.length == array2.length && array1.every(function (element, index) {
                return element === array2[index];
            });
            if (is_same == true) {
                let productName = props.data.productName;
                setVariantIndex(index)
                setPrice(element.price);
                setImageUrl(element.image);
                setItemNumber(element.count);
                var realTempToArray = realTemp.join(' ');
                console.log("realTempToArray===>", realTempToArray);
                setProductName(productName + " " + realTempToArray);
            }
        })
        setVariantValue(temp)
        setVariantRealArray(realTemp)
    }

    return (
        <div className="selected-product">
            <COAImageModal show={modalShow} coaImage={props.data.coaImage} coaFileType={props.data.coaFileType} onHide={() => setModalShow(false)} />

            <div className="selected-img">
                <img src={imageUrl} />
                <button className="add-button" onClick={shoppingcart}>
                    Add to cart
                </button>
                <button style={{ backgroundColor: 'white', color: '#61d273', marginTop: 30, boxShadow: 'none', fontSize: 30 }} className="add-button" onClick={previewCoa}>
                    Preview Certificate of Analysis
                </button>
                {itemNumber <= 5 ?
                    <div style={{ backgroundColor: '#CD5C5C', zIndex: 100, borderRadius: 3, fontSize: 13, paddingRight: 7, paddingLeft: 7, color: 'white', paddingTop: 2, paddingBottom: 2 }}>Only {itemNumber} left</div> :
                    ""
                }
            </div>
            <div className="selected-text">
                <p>Name: {productName}</p>
                <div className="priceVariantArea">
                    <p className="selected-price">Price:${price}</p>
                    <div className="variantArea">
                        <div className="variantRealArea">
                            {props.data.addValue == true ?
                                props.data.options.map((item, i) =>
                                    <div key={i}>
                                        <p className="selected-body">{item.optionName}</p>
                                        <div className="inputFieldLong">
                                            <Dropdown options={item.optionValue}
                                                onChange={(val) => _onSelect(val, i)}
                                                value={variantValue[i]}
                                                placeholder="Select..."
                                                arrowClosed={<img src={down_left} alt="arrow" className="arrow-closed5" style={{ marginLeft: -20 }} />}
                                                arrowOpen={<img src={down_left} alt="arrow" className="arrow-opened5" style={{ marginLeft: -20 }} />}
                                                className="variant-dropbox"
                                            />
                                        </div>
                                    </div>
                                ) : ""
                            }
                        </div>
                    </div>
                </div>
                <p className="selected-desc">Description:</p>
                <p className="selected-body" style={{ fontSize: 17 }}>{props.data.Description}</p>

            </div>
        </div>
    )
}
export default SelectedProduct;