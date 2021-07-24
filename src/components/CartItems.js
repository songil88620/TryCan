import React, { useEffect, useState } from 'react'
import { database } from '../config/firebase'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { injectStyle } from "react-toastify/dist/inject-style";

import warningIcon from '../images/warningIcon.png'
import OrderSummary from './OrderSummary'
import { useHistory } from "react-router-dom";
import Delete from '../images/delete-icon.png'

if (typeof window !== "undefined") {
    injectStyle();
}

const CartItems = () => {
    let history = useHistory();
    let openStatus = localStorage.getItem('openStatus')
    const [total, setTotal] = useState(0);
    const [check, setCheck] = useState(false);
    const [auto_num, setAuto_num] = useState(0);
    const [checkEmpty, setCheckEmpty] = useState(0);
    const [items, setItems] = useState([]);
    const [limiteProductName, setLimiteProductName] = useState('');
    const [cartFlag, setCartFlag] = useState(true);
    const checkout = () => {
        console.log("cartFlag====>", cartFlag);
        if (total < 25) {
            toast('Hey Bud, CannaGo requires a $25 minimun cart!')
        } else {
            history.push("/checkout");
        }
    }
    const continueShopping = () => {
        let openStatus
        if (localStorage.getItem('openStatus') == "false") {
            openStatus = false
        } else openStatus = true
        history.push(`/storeonline/${openStatus}_${items[0].storeId}`);
    }
    let userID = localStorage.getItem('userUid')

    useEffect(() => {
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
                    if (row.num > row.itemNum1) {
                        setCartFlag(false)
                    } else {
                        setCartFlag(true)
                    }
                    data.push(row)
                });
                // console.log("_____________+++++++++++++_________________");
                // console.log(data)
                setItems(data)
                let totalAmount = 0;
                data
                    .map((item) => {
                        totalAmount = totalAmount + (item.priceValue * item.num);
                        setTotal(totalAmount)
                    })
            })
    }, [checkEmpty])

    const emptyCard = (id) => {
        var result = window.confirm("Are you sure you want to delete this item?");
        let userID = localStorage.getItem('userUid')
        if (result) {
            database.ref('Carts/' + userID + '/' + id).remove();
            setCheckEmpty(checkEmpty + 1)
        } else {
            console.log("Undeleted");
        }
    }

    const uploadCartState = (index, id) => {
        database
            .ref('Carts/' + userID + '/' + id)
            .update({
                Description: items[index].Description,
                GpriceValue: items[index].GpriceValue,
                Tag: items[index].Tag,
                feeValue: items[index].feeValue,
                id: id,
                itemImage: items[index].itemImage,
                itemNum1: items[index].itemNum1,
                priceValue: items[index].priceValue,
                productName: items[index].productName,
                coaImage: items[index].coaImage,
                num: items[index].num,
                storeId: items[index].storeId
            });
        setAuto_num(auto_num + 1);
    }

    return (
        <div className="cart-items">
            <div className="cart-cont">
                <div className="cart-cards-cont">
                    {items.map((item, index) => <div key={item.id} className="cart-card">
                        <div className="cart-card-image">
                            <img src={item.itemImage} alt="" width="170" height="200" />
                        </div>
                        <div className="cart-card-text">
                            <p className="cart-card-title">{item.productName}</p>
                            <div className="cart-card-quantity">
                                <p className="cart-card-price">${parseFloat(item.priceValue).toFixed(2)}</p>
                                <p className="cart-card-qu">Quantity</p>
                                <div className="counter-container">
                                    <button
                                        onClick={() => {
                                            console.log(items[index].itemNum1);
                                            let toChange = items;
                                            toChange[index].num > 1 && toChange[index].num--;
                                            console.log(toChange[index].num);
                                            if (toChange[index].num > items[index].itemNum1) {
                                                toChange[index].num = items[index].itemNum1
                                                toast("Hey Bud, you can't add more quantity than the store has available")
                                                // setCartFlag(false)
                                                setLimiteProductName(items[index].productName)
                                            }
                                            setItems(toChange);
                                            setCheck(!check);
                                            uploadCartState(index, item.id);
                                        }}>-</button>
                                    <p>{item.num}</p>
                                    <button
                                        onClick={() => {
                                            console.log(items[index].itemNum1);
                                            let toChange = items;
                                            toChange[index].num++;
                                            console.log(toChange[index].num);
                                            if (toChange[index].num > items[index].itemNum1) {
                                                toChange[index].num = items[index].itemNum1
                                                toast("Hey Bud, you can't add more quantity than the store has available")
                                                // setCartFlag(false)
                                                setLimiteProductName(items[index].productName)
                                            }
                                            setItems(toChange);
                                            setCheck(!check);
                                            uploadCartState(index, item.id);
                                        }}>+</button>
                                </div>
                            </div>
                            <div className="cart-card-remove">
                                <button onClick={() => { emptyCard(item.id) }}>
                                    <img src={Delete} alt="delete" className="delete-img" />
                                    <p>Remove</p>
                                </button>
                            </div>
                        </div>
                    </div>)}
                </div>
                {
                    localStorage.getItem('openStatus') == "false" ?
                        <div className="timeAlert" style={{ maginTop: 0 }}>
                            <img src={warningIcon} alt="" style={{ width: 18, height: 18 }} />
                            <p style={{ textAlign: "center", padding: 0, fontSize: 12 }}>You’re shopping after hours. Please allow a two day window for your product(s) to be delivered.</p>
                        </div> : ""
                }
                <div className="cart-btn-cont">
                    <button onClick={continueShopping} className="cart-btn-continue">Continue Shopping</button>
                    <button onClick={checkout} className="cart-btn-next">NEXT</button>
                </div>
            </div>
            <OrderSummary />
            <ToastContainer />
        </div>
    )
}
export default CartItems