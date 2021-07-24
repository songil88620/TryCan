import React from 'react'
import Navbar from '../components/Navbar'
import DispensaryNavbar from '../components/DispensaryNavbar'
import Footer from '../components/Footer'
import GoBackButton from '../components/GoBackButton'
import background from '../images/aboutbackground.PNG'
import maket from '../images/maket.png'
import cto from '../images/cto.png'
import ceo from '../images/ceo.png'
import { useEffect } from 'react'
import { withRouter } from 'react-router-dom';


const AboutusScreen = ({ history }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <div>
            {localStorage.getItem('loggedIn') === 'true' ? localStorage.getItem('usertype') === "consumer" ? <Navbar /> : <DispensaryNavbar /> : <Navbar />}
            <div className="about-content">
                {/* <backg src={background} alt="background" className="aboutbackimg" /> */}
                <div className="about-title">
                    <h1>About Us</h1>
                </div>
                <div className="personalInfoArea">
                    <div className="maketArea">
                        <img src={maket} alt="background" className="aboutbackimg" />
                        <h2>Matthew Gaffney</h2>
                        <h3>Co-Founder, Head of Marketing</h3>
                        <p>Stemming from a combination of his love for creating and helping others, at age sixteen Matthew’s passion for entrepreneurship was birthed. He then began to cultivate his skills around personal, professional and business development. They’ve all lent to the success he’s had in his career in launching his first business at eighteen as well as the constant positivity and optimism he brings daily to the CannaGo company.</p>
                    </div>
                    <div className="ceoarea">
                        <img src={ceo} alt="background" className="aboutbackimg" />
                        <h2>N. Victor Nwadike</h2>
                        <h3>Founder,  Head of Product</h3>
                        <p>From the age of fifteen, Victor has had an ever-growing passion for coding. That same passion drove him to become a published developer with three chart-topping mobile applications by the age of eighteen. After his trifecta with those mobile applications, at twenty Victor decided to start a business with a team of people who share that same passion that got him started on his journey.</p>
                    </div>
                    <div className="ctoarea">
                        <img src={cto} alt="background" className="aboutbackimg" />
                        <h2>Kevin Tolliver</h2>
                        <h3>Co-Founder, Head of Engineering</h3>
                        <p>At a very young age, Kevin was fascinated with the world of technology. He then realized how big of an asset technology is in this world and knew he could make a difference. Kevin’s journey began when he was only thirteen years old and since then has gained huge amounts of experience in the realm of web development. He always knew he could make an impact in this world, and he does so by using his skills and passion to contribute to this team.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default  AboutusScreen;