import React from 'react'
import OrderHistoryCardItem from './OrderHistoryCardItem'
import OrderHistoryAmount from './OrderHistoryAmount.js';
const OrderHistoryCard = (props) => {
    return (
        <div className="order-history-card">
            <h1>Order Reference   #{props.orderId}</h1>
            {props.orderItem && props.orderItem.map(el => (<OrderHistoryCardItem key={el.id} {...el} img={props.img1} price={props.price1} qty={props.qty1} confirm />))}
            <OrderHistoryAmount data={props}/>
        </div>
    )
}
export default OrderHistoryCard;