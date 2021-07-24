import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

import Station from '../images/emptyPhoto.png'
import Camera from '../images/camera.png'
const DispensaryStations = (props) => {
    return (
        <div className="stationcontainer-dispensary">
            <img src={props.src} alt="station" className={props.greenborder ? 'greenStation' : 'station-img'} />
            <img src={Camera} alt="camera" className="camera" onClick={props.onClick} />
            <input
                type="file"
                accept="image/*"
                name="image-upload"
                id="input"
                onChange={props.onChange}
                hidden
            />
            {
                props.loading &&
                <Spinner animation="grow" variant="primary" className="dispensaryloading" />
            }
        </div>
    )
}
export default DispensaryStations;