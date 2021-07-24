import React from 'react'
import { useHistory, Link } from "react-router-dom";

import cannabisImg from "../images/cannabis-img.png";


const Header = () => {
    let history = useHistory();

    const gotoSignUp = () => {
        history.push('/login')
    }

    return (
        <header className="header">

            <img src={cannabisImg} alt="cannabis-img" className="header-img-1" />
            <img src={cannabisImg} alt="cannabis-img" className="header-img-2" />
            <div className="my-container h100">
                <div className="header-wrapper">
                    <h1 className="h1-heading">Locally Sourced CBD Delivered Next Day</h1>
                    <h2 className="header-subtitle">Let's be buds!</h2>
                    <h2 className="header-subtitle-2">Serving the Atlanta GA Metro Area | $25 Item Minimum Order</h2>
                    <button className="bt-primary" onClick={gotoSignUp}>sign Up</button>
                    <p className="p-text">
                    Delivery of non-medicated skin care products, cosmetics, and essential oils that include CBD, and vaping and smoking products including CBD, any CBD in the goods being featured or provided in the aforementioned services being solely derived from hemp with a delta-9 tetrahydrocannabinol (THC) concentration of not more than 0.3 percent on a dry weight basis.
                    </p>
                </div>
            </div>
        </header>
    )
}

export default Header
