import React from 'react'
import Tick from '../images/white-tick.png'
const OrderStatusInfo = (props) => {
    return (
        <div className="order-info-cont">

            <div className="order-info-check">
                <button>
                    {props.delivered && <img src={Tick} />}
                </button>
                {props.title.toString().indexOf('Delivered') === -1 && <div className="vertical-line"></div>}
            </div>
            <div className="order-info-text">
                <h1>{props.title}</h1>
                <p>{props.body}</p>
                <p>{props.time}</p>
            </div>
        </div>
    )
}
export default OrderStatusInfo;