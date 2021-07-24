import React, { useState, useEffect } from 'react'
import OrderModal from './OrderModal'

import logo2 from '../images/logo5.png'
import logo3 from '../images/logo3.png'
import cannabisImg from '../images/cannabis-img.png'
import carIcon from '../images/car-icon.svg'
import userIcon from '../images/user-icon.svg'
import { useHistory } from "react-router-dom";
import { RiMenu4Fill } from 'react-icons/ri'
import { database } from '../config/firebase'
import _ from 'lodash'

const DispensaryNavbar = ({ props }) => {
    let history = useHistory();
    const [userType, setUserType] = useState('')
    const [orderConsumerNum, setOrderConsumerNum] = useState(0)
    const [checked, setChecked] = useState(false)
    const [checkedNum, setCheckedNum] = useState(0)
    const [orderData, setOrderData] = useState([])
    const [orderUserIds, setOrderUserIds] = useState([])
    const [orderIds, setOrderIds] = useState([])
    let orderDatas = [];
    let userId = localStorage.getItem('userUid')

    useEffect(() => {
        setUserType(localStorage.getItem('usertype'))
        let orderUserIds = [];
        var tempOrderData
        console.log(userId);
        database
            .ref("OrderItems/" + userId)
            .on("value", (snapshot) => {
                if (snapshot.val() !== null) {
                    setChecked(snapshot.val().checked)
                    if (snapshot.val().checkedNum !== null && snapshot.val().checkedNum !== "" && snapshot.val().checkedNum !== undefined)
                        setCheckedNum(snapshot.val().checkedNum)
                }
            })
        database
            .ref("OrderItems/" + userId)
            .on("value", (snapshot) => {
                let orderNum = 0
                var orderList = [];
                snapshot.forEach((element) => {
                    let orderData = [];
                    tempOrderData = []

                    var orderUserId
                    let orderIds = [];

                    let hasData = false;
                    element.forEach((el) => {
                        orderNum += 1
                        if (el.val().confirmStatus == false && el.val().placeStatus == true) {
                            orderUserId = element.key
                            console.log("elkey------****++++>", el.key)
                            orderIds.push(el.key)
                            console.log("orderIds------****++++>", orderIds)
                            tempOrderData[orderUserId] = orderIds

                            hasData = true;
                        }
                        setOrderConsumerNum(orderNum)
                    })

                    if (hasData) {
                        orderList.push(tempOrderData)
                    }

                })

                console.log("tempOrderData=======++++>", orderList)
                if (orderList !== null && orderList.length > 0) {
                    orderUserIds.push(orderList)
                    console.log("orderDatas=======++++>", orderUserIds)
                }
            })
    }, [])

    const [modalShow, setModalShow] = useState(false);
    const modalHandler = () => {
        setModalShow(true)
    }
    const goToOrderConfirm = () => {
        setModalShow(false)
        history.push({
            pathname: '/orderconfirm',
            state: userType
        })
    }

    const Blog = () => {
        history.push("/blog")
    }
    const ContactUs = () => {
        history.push("/contactus")
    }

    const Home = () => {
        userType === 'dispensary' ?
            history.push("/dispensarylanding")
            :
            history.push("/profile");
    }
    const UpdateStore = () => {
        database
            .ref('OrderItems/' + userId)
            .update({
                checked: true,
                checkedNum: orderConsumerNum
            });
        if (localStorage.getItem('usertype') === 'dispensary') {
            // modalHandler()
            history.push({
                pathname: '/orderconfirm',
                state: userType
            })
        } else if (localStorage.getItem('usertype') === 'driver') {
            modalHandler()
        } else history.push("/login")
    }
    const login = () => {
        localStorage.getItem('usertype') === 'dispensary'
            ? history.push('/dispensaryinfo')
            : localStorage.getItem('usertype') === 'driver'
                ? history.push('/driverprofileinfo')
                : history.push("/login")
    }
    const [navbarIsOpen, setNavbarIsOpen] = useState(false)

    const toggleNavbar = () => setNavbarIsOpen(!navbarIsOpen)

    return (
        <nav className="navigation-bar">
            <OrderModal show={modalShow}
                onHide={() => setModalShow(false)}
                acceptmode={goToOrderConfirm}
                hidemode={() => setModalShow(false)} />
            {/*Cannabis img*/}
            <img src={cannabisImg} alt="cannabis-img" className="cannabis-img" />

            <div className="my-container">
                <div className="navigation-wrapper">
                    <a href="#" onClick={Home} className="logo pointer">
                        <img src={localStorage.getItem('usertype') === 'driver' ? logo3 : logo2} alt="logo-img" />
                    </a>
                    <ul className={`nav-list ${navbarIsOpen && "show"}`}>
                        <li
                            className={`nav-list-item ${(history.location.pathname === "/dispensarylanding" || history.location.pathname === "/storeadd" || history.location.pathname === "/updatestore" || history.location.pathname === "/signup" || history.location.pathname === "/profile" || history.location.pathname === "/driverprofileinfo") && ' active'}`}>
                            <a href="#" onClick={Home} className="nav-list-link  pointer">HOME</a>
                        </li>
                        {/* <li className="nav-list-item ">
                            <a href="/#" className="nav-list-link ">CAREERS</a>
                        </li> */}
                        <li className={`nav-list-item  ${history.location.pathname === "/blog" && 'active'}`} >
                            <a onClick={Blog} className="nav-list-link ">BLOG</a>
                        </li>
                        <li className="nav-list-item ">
                            <a href="https://linktr.ee/CannaGo" target="_blank" className="nav-list-link ">FOLLOW US</a>
                        </li>
                        {/* <li className="nav-list-item ">
                            <a href="/#" className="nav-list-link ">OUR MISSION</a>
                        </li> */}
                        <li className="nav-list-item ">
                            <a onClick={ContactUs} className="nav-list-link ">CONTACT US</a>
                        </li>

                        <li
                            className={`nav-list-item nav-link-icon ${(history.location.pathname === "/emptycart" || history.location.pathname === "/cart" || history.location.pathname === "/checkout" || history.location.pathname === "/orderexperience" || history.location.pathname === "/driverorderstatus" || history.location.pathname === "/orderconfirm") && ' active'}`}>
                            <a onClick={UpdateStore} className="nav-list-link  pointer">
                                <img src={carIcon} alt="bag-icon" />
                                {/* {history.location.pathname === "/orderconfirm" && <label>1</label>} */}
                                {
                                    checked == true ? null : orderConsumerNum - checkedNum == 0 ? null : <label>{orderConsumerNum - checkedNum}</label>
                                }
                            </a>
                        </li>
                        <li
                            className={`nav-list-item nav-link-icon ${(history.location.pathname === "/dispensaryinfo") && " active2"}`}>
                            {/* <p onClick={login} className="nav-list-link pointer mb-1 ">
                                <img src={userIcon} alt="user-icon" /> {userType === 'dispensary'
                                    ? "Welcome, Cannabis Station "
                                    : userType === 'driver'
                                        ? "Welcome, John Driver"
                                        : "Sign In"}
                            </p> */}
                            <a onClick={login} className="nav-list-link pointer mb-1 ">
                                <img src={userIcon} alt="user-icon" /> {localStorage.getItem("loggedIn") === 'true'
                                    ? `Welcome ${localStorage.getItem('storeName') != "" ? localStorage.getItem('storeName') : props.username} `
                                    : "Sign In"}
                            </a>
                        </li>
                    </ul>

                    <div className="btn-toggle" onClick={toggleNavbar}>
                        <RiMenu4Fill />
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default DispensaryNavbar
