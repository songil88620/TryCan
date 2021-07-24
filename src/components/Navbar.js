import React, { useState, useEffect } from 'react'
import { useLocation, matchPath } from 'react-router-dom'
//logo
import logo from '../images/logo.png'
import cannabisImg from '../images/cannabis-img.png'
import bagIcon from '../images/bag-icon.svg'
import userIcon from '../images/user-icon.svg'
import { useHistory } from "react-router-dom";
import { RiMenu4Fill } from 'react-icons/ri'
import SearchIcon from '../images/searchIcon.png'
// Firebase Integration Module
import { database } from '../config/firebase'
import RejectModal from './RejectModal'

const Navbar = (props) => {
    let location = useLocation()
    let history = useHistory();
    let userId = localStorage.getItem('userUid')
    const [dropAddress, setDropAddress] = useState("")
    const [modalShow, setModalShow] = useState(false);

    const Shop = () => {
        history.push("/");
    }
    const Home = () => {
        history.push("/");
    }
    const Blog = () => {
        history.push("/blog")
    }
    const ContactUs = () => {
        history.push("/contactus")
    }
    const Cart = () => {
        localStorage.getItem('loggedIn') === 'true'
            ? history.push({
                pathname: '/cart',
                shopData: props.data
            })
            : history.push("/login")
    }
    const status = () => {
        history.push('/orderstatus')
    }
    const login = () => {
        localStorage.getItem('loggedIn') === 'true' ? history.push('/profile') : history.push("/login")
    }

    const searchAction = () => {
        alert("search")
    }

    const [navbarIsOpen, setNavbarIsOpen] = useState(false)
    const toggleNavbar = () => setNavbarIsOpen(!navbarIsOpen)
    useEffect(() => {
        database
            .ref('user/' + userId + '/' + "consumer")
            .on("value", async (snapshot) => {
                if (snapshot.val() !== null) {
                    if (snapshot.val().dropAddress !== null)
                        var address = snapshot.val().dropAddress
                    setDropAddress(address)
                }
            })
        // console.log('This is Navbar loggedIn=>', localStorage.getItem('loggedIn'))
        // if (localStorage.getItem('dropAddress') !== "" && localStorage.getItem('dropAddress') !== null && localStorage.getItem('dropAddress') !== undefined)
        //     setDropAddress(localStorage.getItem('dropAddress'))
    }, [localStorage.getItem('dropAddress')])

    useEffect(() => {
        database
            .ref("RejectedOrder/" + userId)
            .on("value", (snapshot) => {
                console.log("snapshot===", snapshot.val());
                if (snapshot.val() !== null) {
                    var row = snapshot.val().rejectedStatus
                    console.log("RejectedOrderStatus===", row);
                    setModalShow(row)
                }
            })
    }, [])

    const goToOrderConfirm = () => {
        database
            .ref("RejectedOrder/" + userId)
            .update({
                rejectedStatus: false
            })
        // setModalShow(false)
    }

    return (
        <nav className="navigation-bar">
            <RejectModal show={modalShow}
                onHide={() => setModalShow(false)}
                acceptmode={goToOrderConfirm}
                hidemode={() => setModalShow(false)} />
            {/*Cannabis img*/}
            <img src={cannabisImg} alt="cannabis-img" className="cannabis-img" />

            <div className="my-container">
                {/* {localStorage.getItem('usertype') === "consumer" && localStorage.getItem("loggedIn") === 'true' && <button className="check-order" onClick={props.modalPress}>
                    <p style={{ fontSize: 17, color: '#6D7E8F' }}>Enter Delivery Address</p>
                    <img src={SearchIcon} alt="order Icon" style={{ width: 17, height: 33 }} />
                </button>
                } */}
                {/* {localStorage.getItem('usertype') === "consumer" && localStorage.getItem("loggedIn") === 'true' && <button className="check-order">
                    <p style={{ fontSize: 14, color: '#6D7E8F', marginLeft: 0, alignSelf:'start'}}>{dropAddress === "" ? "Enter Delivery Address" : dropAddress}</p>
                    <img src={SearchIcon} alt="order Icon" style={{ width: 17, height: 33 }} />
                </button>
                } */}
                {(history.location.pathname === "/" || matchPath(history.location.pathname, { path: '/storeonline/:id' }) || matchPath(history.location.pathname, { path: '/searchresult/:id' })) && localStorage.getItem('usertype') === "consumer" && localStorage.getItem("loggedIn") === 'true' &&
                    <div className="check-order1">
                        <button className="deliveryModalButton" style={{ borderWidth: 0, width: "92%", backgroundColor: 'white' }} onClick={props.modalPress}>
                            <input style={{ backgroundColor: 'white', borderWidth: 0, width: '95%', fontSize: 10, paddingLeft: 3 }} type="text" value={dropAddress === "" ? "Enter Delivery Address" : dropAddress} disabled={true} />
                        </button>
                        <img src={SearchIcon} alt="order Icon" style={{ width: 17, height: 17, marginTop: -5 }} onClick={props.searchModalPress} />
                    </div>}
                <div className="navigation-wrapper">
                    <a onClick={Shop} className="logo pointer">
                        <img src={logo} alt="logo-img" />
                    </a>
                    <ul className={`nav-list ${navbarIsOpen && "show"}`}>
                        <li
                            className={`nav-list-item ${(history.location.pathname === "/" || history.location.pathname === "/storeonline/:id" || history.location.pathname === "/selecteditem" || history.location.pathname === "/orderstatus") && ' active'}`}>
                            <button onClick={Shop} className="nav-list-link  pointer">SHOP</button>
                        </li>
                        <li className={`nav-list-item  ${history.location.pathname === "/blog" && 'active'}`} >
                            <button onClick={Blog} className="nav-list-link ">BLOG</button>
                        </li>
                        <li className="nav-list-item ">
                            <a href="https://linktr.ee/CannaGo" target="_blank" className="nav-list-link ">FOLLOW US</a>
                        </li>
                        <li className={`nav-list-item  ${history.location.pathname === "/contactus" && 'active'}`}>
                            <button onClick={ContactUs} className="nav-list-link ">CONTACT US</button>
                        </li>
                        <li
                            className={`nav-list-item nav-link-icon ${(history.location.pathname === "/cart" || history.location.pathname === "/cart" || history.location.pathname === "/checkout" || history.location.pathname === "/orderexperience") && ' active'}`}>
                            <button onClick={Cart} className="nav-list-link  pointer">
                                <img src={bagIcon} alt="bag-icon" />
                            </button>
                        </li>
                        <li
                            className={`nav-list-item nav-link-icon ${(history.location.pathname === "/profileinfo" || history.location.pathname === "/profile" || history.location.pathname === "/orderhistory") && " active2"}`}>
                            <button onClick={login} className="nav-list-link pointer mb-1 ">
                                <img src={userIcon} alt="user-icon" /> {localStorage.getItem("loggedIn") === 'true'
                                    ? `Welcome ${localStorage.getItem('username') != "" ? localStorage.getItem('username') : props.username} `
                                    : "Sign In"}
                            </button>
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

export default Navbar
