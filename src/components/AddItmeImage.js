import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

import Station from '../images/emptyPhoto.png'
import Camera from '../images/camera.png'
import avatar from '../images/avatar.png'
const DispensaryStations = (props) => {
    return (
        <div className="stationcontainer-dispensary">
            <img src={props.src == "" ? avatar : props.src} alt="station" className={'addItme-img'} />
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