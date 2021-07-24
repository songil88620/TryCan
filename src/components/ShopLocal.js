import React, { useState } from 'react'
import ShopLocalCard from './ShopLocalCard'
import { useHistory } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const ShopLocal = (props) => {
    let history = useHistory();
    //settings for slider
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        // initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: false,
                    dots: false
                }
            }, {
                breakpoint: 920,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: false,
                    dots: false
                }
            }, {
                breakpoint: 710,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            }
        ]
    };

    const storeOnline = () => {
        if (localStorage.getItem('usertype') === 'consumer') {
            history.push('/storeonline')
        } else {
            history.push('/login');
        }
    }

    return (
        <section className="shop-local">
            <div className="my-container">
                <div className="shop-local-wrapper">
                    <h2 className="h2-heading">
                        Shop Local Stores
                    </h2>
                    <Slider {...settings}>
                        {props.data && props.data.map(el => (<ShopLocalCard key={el.id} {...el} dropAddress={props.dropAddress} modalPress={props.modalPress} reFresh={props.reFresh} />))}
                    </Slider>
                </div>
            </div>
        </section>
    )
}

export default ShopLocal
