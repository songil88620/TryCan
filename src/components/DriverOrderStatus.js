import React from 'react'
import OrderStatusInfo from './OrderStatusInfo';
const DriverOrderStatus = () => {
    return (
        <div className="order-status-cont">
            <p className="driver-order-status-title">Deliver to John H.</p>
            <h3 className="order-status-desc">2783 North Folk Street, Miami, FL, 30312</h3>
            <h3 className="order-status-desc mb50">Special Note: Gate code is 2638</h3>
            <OrderStatusInfo
                title="Order En Route"
                body="Drop off order to Fred C."
                time="10:03 AM, 11/21/2020"
                delivered={true}/>
            <OrderStatusInfo
                title="Order Delivered"
                body="Your order has been dropped off."
                time="10:32 AM, 11/21/2020"/>
            <button className="message-customer-btn">Message Customer</button>
            <button className="complete-order-btn">Complete Order</button>
        </div>
    )
}
export default DriverOrderStatus;