import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { database } from '../config/firebase'


const CartShopProducts = (props) => {
    const [storename, setStorename] = useState([])
    const [data, setData] = useState([])

    //slider settigns
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1193,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false
                }
            },
            {
                breakpoint: 921,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const loadData = (storeId) => {
        database
            .ref("Items/" + storeId)
            .once("value", (snapshot) => {
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
                        storeId: element.val().storeId
                    }
                    data.push(row)
                });
                // console.log(data);
                setData(data)
            })

        database
            .ref('user/' + storeId + '/dispensary')
            .on("value", async (snapshot) => {
                let user_data = snapshot.val().storeName;
                setStorename(user_data)
            })
    }

    useEffect(() => {
        let userID = localStorage.getItem('userUid')
        database
            .ref("Carts/" + userID)
            .once("value", (snapshot) => {
                var data = []
                var row
                snapshot.forEach(element => {
                    row = {
                        "storeId": element.val().storeId,
                    }
                    data.push(row)
                });
                // console.log("_____________+++++++++++++_________________");
                // console.log(data[0])
                // setItems(data)
                // if (data.length !== 0) {
                    loadData(data[0].storeId)
                // }
            })
    }, [])
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
                <div className="shop-products-wrapper-nonbg">
                    <h2 className="slider-text">More Products from {storename}</h2>

                    <Slider {...settings}>
                        {data && data.map(el => (<ProductCard key={el.id} {...el} opentStatus={props.opentStatus} />))}
                        {/* {data && data.map(el => (<ProductCard key={el.id} {...el} />))} */}
                    </Slider>

                </div>
                {/* <p>sfdfsdfs</p> */}
            </div>
        </section>
    )
}

export default CartShopProducts;
