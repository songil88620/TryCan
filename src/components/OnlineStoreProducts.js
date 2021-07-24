import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { database } from '../config/firebase'

const ShopProducts = (props) => {
    const [product, setProduct] = useState([])

    //slider settigns
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1250,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 1020,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 780,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    initialSlide: 1,
                }
            }
        ]
    };

    useEffect(()=>{
        database
            .ref("Items")
            .on("value", async (snapshot) => {
                let productArray = []
                snapshot.forEach(function (item) {
                    let temp = item.val()
                    // Loop on object->temp
                    Object.keys(temp).forEach(val => {
                        let value = temp[val];
                        productArray.push(value)
                    });
                });
                setProduct(productArray)
            })
    }, [])

    return (
        <section className="shop-products">
            <div className="my-container">
                <div className="shop-products-wrapper-nonbg">
                    <h2 className="slider-text">More Products from {props.storeName}</h2>

                    <Slider className="slider" {...settings}>
                        {props.data && props.data.map(el => (<ProductCard opentStatus={props.opentStatus} key={el.id} {...el} />))}
                    </Slider>

                </div>
            </div>
        </section>
    )
}

export default ShopProducts
