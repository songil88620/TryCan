import React, { useState } from 'react'
import WebViewOrderStatus from '../components/WebViewOrderStatus'
import Image from '../images/checkout-1.png'
import { useEffect } from 'react'

const OrderStatusScreen = (props) => {
    let id = props.match.params.id
    let paidVal = id.split('_')[0]
    let orderStoreId = id.split('_')[1]
    let tempLeng = paidVal.length + orderStoreId.length
    let orderId = id.substring(tempLeng + 2, id.length)
    const [paidValue, setPaidValue] = useState('')
    useEffect(() => {
        setPaidValue(paidVal)
        window.scrollTo(0, 0);
    }, [])
    return (
        <div>
            {/* <div className="order-status-img"><img src={Image} /></div> */}
            <WebViewOrderStatus paidValue={paidValue} orderStoreId={orderStoreId} orderId={orderId} />
        </div>
    )
}
export default OrderStatusScreen;