import React from 'react'

const OrderHistoryCardItem = props => {
    return (
        <div className="order-confirm-card-body">
            <div className="cart-card-image"><img className="orderConfirmImage" src={props.itemImage} /></div>
            <div className="order-history-card-text">
                {/* <h2>Name: {props.productName.length > 20 ? props.productName.substr(0, 20) + "..." : props.productName}</h2> */}
                <h2>Name: {props.productName}</h2>
                {/* <h3>from Cannabis Station</h3> */}
                <div className="order-history-card-quantity">
                    <p>${props.priceValue}</p>
                    <div className="order-quantity">
                        <p>Quantity</p>
                        <div className="order-quantity-number">{props.num}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default OrderHistoryCardItem;