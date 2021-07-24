import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { database } from '../config/firebase'
const DispensaryOnlineProducts = (props) => {
    const [data, setData] = useState([])
    useEffect(() => {
        database
            .ref("Items/" + localStorage.getItem('userUid'))
            .on("value", (snapshot) => {
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
                console.log(data);
                setData(data)
            })
    }, [])
    return (
        <section className="shop-products">
            <div className="store-container scrollable" id="products">
                <div className="products-cont">
                    {/* {props.data && props.data.map(el => (<ProductCard key={el.id} {...el} />))} */}
                    {data && data.map(el => (<ProductCard key={el.id} {...el} />))}
                </div>
            </div>
        </section>
    )
}
export default DispensaryOnlineProducts;