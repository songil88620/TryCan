import React, { useEffect } from 'react'
import ProductCard from './ProductCard';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const ShopProducts = (props) => {

    useEffect(() => {
        console.log("ItmeProps=>", props.data);
    }, [])


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
                breakpoint: 1193,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 921,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    infinite: true,
                }
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                }
            },
            // {
            //     breakpoint: 500,
            //     settings: {
            //         slidesToShow: 2,
            //         slidesToScroll: 1
            //     }
            // }
        ]
    };
    //dummy data
    // const [products] = React.useState([
    //     { id: 1, name: "Just CBD Gummies", price: 24.2, img: img1 },
    //     { id: 2, name: "CBD Flower", price: 40.2, img: img2 },
    //     { id: 3, name: "CBD Wax 10 ML", price: 15.2, img: img3 },
    //     { id: 4, name: "CBD Wax", price: 14.2, img: img4 },
    //     { id: 5, name: "Just CBD Gummies", price: 15, img: img1 }
    // ])

    return (
        <section className="shop-products">
            <div className="my-container">
                <div className="shop-products-wrapper">
                    <h2>Shop Products</h2>
                    <Slider {...settings}>
                        {props.data && props.data.map((el, i) => (<ProductCard key={i} {...el} opentStatus={props.opentStatus} dropAddress={props.dropAddress} modalPress={props.modalPress} />))}
                    </Slider>
                </div>
            </div>
        </section>
    )
}

export default ShopProducts
