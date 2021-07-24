import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { database } from '../config/firebase'

const SearchResultProducts = (props) => {
    const [storeData, setStoreData] = useState('')
    const [storeName, setStoreName] = useState('')
    const searchKey = props.searchKey;
    const storeId = props.storeId;

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
                    initialSlide: 1,
                    infinite: false,
                }
            },
            {
                breakpoint: 1020,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 1,
                    infinite: false,
                }
            },
            {
                breakpoint: 780,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    initialSlide: 1,
                }
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    initialSlide: 1,
                }
            }
        ]
    };


    useEffect(() => {
        console.log("props.storeId=======+++==>", props.storeId);
        console.log("props.filterValue=======+++==>", props.filterValue);

        database
            .ref('user/' + storeId + "/dispensary")
            .once("value", async (snapshot) => {
                // console.log("=====snapshot", snapshot.val());
                if (snapshot.val() !== null) {
                    let user_data = {
                        storeName: snapshot.val().storeName,
                    };
                    setStoreName(user_data.storeName)
                }
            })
        console.log("searchKey===>", searchKey);

        // if (storeId !== []) {
        if (props.filterValue === "From Low to High") {
            database
                .ref("Items/" + storeId)
                .orderByChild('priceValue')
                .once("value", async (snapshot) => {
                    let productArray = []
                    var row
                    snapshot.forEach(product => {
                        var el = product.val()
                        console.log("el.val===>", el);
                        row = {
                            'Description': el.Description,
                            'GpriceValue': el.GpriceValue,
                            'Tag': el.Tag,
                            'feeValue': el.feeValue,
                            'id': el.id,
                            'itemImage': el.itemImage,
                            'itemNum1': el.itemNum1,
                            'priceValue': el.priceValue,
                            'productName': el.productName,
                            'coaImage': el.coaImage,
                            'coaFileType': el.coaFileType,
                            'storeId': el.storeId
                        }
                        var searchValue = row.productName + row.Tag + row.Description;
                        console.log("searchValue==+++++==>", searchValue);
                        if (searchValue.toLowerCase().indexOf(searchKey.toLowerCase()) > -1) {
                            console.log("row======>", row);
                            productArray.push(row)
                        }
                    })
                    setStoreData(productArray)
                    // setFiltedStoreIds(storeIds)
                })
        } else if (props.filterValue === "From High to Low") {
            database
                .ref("Items/" + storeId)
                .orderByChild('negValue')
                .once("value", async (snapshot) => {
                    let productArray = []
                    var row
                    snapshot.forEach(product => {
                        var el = product.val()
                        console.log("el.val===>", el);
                        row = {
                            'Description': el.Description,
                            'GpriceValue': el.GpriceValue,
                            'Tag': el.Tag,
                            'feeValue': el.feeValue,
                            'id': el.id,
                            'itemImage': el.itemImage,
                            'itemNum1': el.itemNum1,
                            'priceValue': el.priceValue,
                            'productName': el.productName,
                            'coaImage': el.coaImage,
                            'coaFileType': el.coaFileType,
                            'storeId': el.storeId
                        }
                        var searchValue = row.productName + row.Tag + row.Description;
                        console.log("searchValue==+++++==>", searchValue);
                        if (searchValue.toLowerCase().indexOf(searchKey.toLowerCase()) > -1) {
                            console.log("row======>", row);
                            productArray.push(row)
                        }
                    })
                    setStoreData(productArray)
                    // setFiltedStoreIds(storeIds)
                })
        } else {
            database
                .ref("Items/" + storeId)
                // .orderByChild('priceValue')
                .once("value", async (snapshot) => {
                    let productArray = []
                    var row
                    snapshot.forEach(product => {
                        var el = product.val()
                        console.log("el.val===>", el);
                        row = {
                            'Description': el.Description,
                            'GpriceValue': el.GpriceValue,
                            'Tag': el.Tag,
                            'feeValue': el.feeValue,
                            'id': el.id,
                            'itemImage': el.itemImage,
                            'itemNum1': el.itemNum1,
                            'priceValue': el.priceValue,
                            'productName': el.productName,
                            'coaImage': el.coaImage,
                            'coaFileType': el.coaFileType,
                            'storeId': el.storeId
                        }
                        var searchValue = row.productName + row.Tag + row.Description;
                        console.log("searchValue==+++++==>", searchValue);
                        if (searchValue.toLowerCase().indexOf(searchKey.toLowerCase()) > -1) {
                            console.log("row======>", row);
                            productArray.push(row)
                        }
                    })
                    setStoreData(productArray)
                    // setFiltedStoreIds(storeIds)
                })
        }

        // }
    }, [searchKey, props.filterValue, props.storeId,])

    return (
        <section className="search-products">
            <div className="my-container">
                <div className="search-products-wrapper-nonbg">
                    {storeData && <h2 className="search-text">Store: {storeName && storeName}</h2>}

                    <Slider className="slider" {...settings}>
                        {storeData && storeData.map(el => (<ProductCard key={el.id} {...el} />))}
                    </Slider>

                </div>
            </div>
        </section>
    )
}

export default SearchResultProducts
