import React from 'react'
import ProductCard from '../components/ProductCard'
const StoreOnlineProducts = (props) => {
    return (
        <section className="shop-products">
            <div className="store-container scrollable" id="products">
                <div className="products-cont">
                    {props.data && props.data.map(el => (<ProductCard key={el.id} {...el} opentStatus={props.timeopentStatus}/>))}
                </div>
            </div>
        </section>
    )
}
export default StoreOnlineProducts;