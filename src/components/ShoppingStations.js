import React from 'react'
import Station from '../images/station.png'
const ShoppingStations = (props) => {
    return (
        <div className="stationcontainer">
            <p className="station-text">You’re Shopping: {props.storeName}</p>
            <img src={props.profileimage} className="storeonline-station-img"/>
        </div>
    )
}
export default ShoppingStations;