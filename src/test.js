import React, { useState, useCallback } from 'react'
import ReactDOM from 'react-dom'
import Cropper from 'react-easy-crop'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { getOrientation } from 'get-orientation/browser'
import Modal from 'react-bootstrap/Modal'
import Geocode from "react-geocode";
import { getDistance } from 'geolib';

import Image from './images/cannabis-small.png'
import ImgDialog from './components/ImgDialog'
import { getCroppedImg, getRotatedImage } from './components/canvasUtils'

const ORIENTATION_TO_ANGLE = {
  '3': 180,
  '6': 90,
  '8': -90,
}





// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyAUuy6Ir1exU6HybTu8H4j5ZH6ZG4MRFm0");

// set response language. Defaults to english.
Geocode.setLanguage("en");

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("es");

// set location_type filter . Its optional.
// google geocoder returns more that one address for given lat/lng.
// In some case we need one address as response for which google itself provides a location_type filter.
// So we can easily parse the result for fetching address components
// ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
// And according to the below google docs in description, ROOFTOP param returns the most accurate result.
Geocode.setLocationType("ROOFTOP");

// Enable or disable logs. Its optional.
Geocode.enableDebug();

// Get address from latitude & longitude.
Geocode.fromLatLng("48.8583701", "2.2922926").then(
  (response) => {
    const address = response.results[0].formatted_address;
    // console.log("address==========>", address);
  },
  (error) => {
    // console.error(error);
  }
);

// Get formatted address, city, state, country from latitude & longitude when
// Geocode.setLocationType("ROOFTOP") enabled
// the below parser will work for most of the countries
Geocode.fromLatLng("48.8583701", "2.2922926").then(
  (response) => {
    const address = response.results[0].formatted_address;
    let city, state, country;
    for (let i = 0; i < response.results[0].address_components.length; i++) {
      for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
        switch (response.results[0].address_components[i].types[j]) {
          case "locality":
            city = response.results[0].address_components[i].long_name;
            break;
          case "administrative_area_level_1":
            state = response.results[0].address_components[i].long_name;
            break;
          case "country":
            country = response.results[0].address_components[i].long_name;
            break;
        }
      }
    }
    // console.log(city, state, country);
    // console.log(address);
  },
  (error) => {
    // console.error(error);
  }
);

// Get latitude & longitude from address.
Geocode.fromAddress("1039 Grant St SE Building B Suite 24").then(
  (response) => {
    const { lat, lng } = response.results[0].geometry.location;
    // console.log("Eiffel Tower==========>", lat, lng);
  },
  (error) => {
    // console.error(error);
  }
);




















const Demo = ({ classes }) => {
  const [imageSrc, setImageSrc] = React.useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      )
      console.log('donee', { croppedImage })
      setCroppedImage(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [imageSrc, croppedAreaPixels, rotation])

  const onClose = useCallback(() => {
    setCroppedImage(null)
  }, [])

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      let imageDataUrl = await readFile(file)

      // apply rotation if needed
      const orientation = await getOrientation(file)
      const rotation = ORIENTATION_TO_ANGLE[orientation]
      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation)
      }

      setImageSrc(imageDataUrl)
    }
  }

  const setModalShow = () => {
    setImageSrc(null)
  }

  return (
    <div>
      <div className="scoped-bootstrap">
        <Modal
          show={imageSrc != null ? true : false}
          backdropClassName="scoped-bootstrap"
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          dialogClassName="modal-50w"
          centered
          onHide={() => setModalShow()}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <div className="ImageSelectArea">
              <div className="ImageCropView">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  rotation={rotation}
                  zoom={zoom}
                  aspect={6 / 3}
                  onCropChange={setCrop}
                  onRotationChange={setRotation}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </div>
              <div className="CropImageController">
                <div className="sliderContainer">
                  <Typography
                    variant="overline"
                  >
                    Zoom
                  </Typography>
                  <Slider
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={(e, zoom) => setZoom(zoom)}
                    className="slider"
                  />
                </div>
                {/* <div className="sliderContainer">
                  <Typography
                    variant="overline"
                  >
                    Rotation
                  </Typography>
                  <Slider
                    value={rotation}
                    min={0}
                    max={360}
                    step={1}
                    aria-labelledby="Rotation"
                    onChange={(e, rotation) => setRotation(rotation)}
                    className="slider"
                  />
                </div> */}
                <Button
                  onClick={showCroppedImage}
                  variant="contained"
                  color="primary"
                  className="cropButton"
                >
                  Show Result
                </Button>
              </div>
              {/* <ImgDialog img={croppedImage} onClose={onClose} /> */}
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <input type="file" onChange={onFileChange} accept="image/*" />
      <img alt="dropimage" src={croppedImage ? croppedImage : Image} />
    </div>
  )
}

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })
}

export default Demo