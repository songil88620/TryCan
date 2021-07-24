// import React, { useEffect, useState } from 'react'
// import { useHistory } from "react-router-dom";
// import App, { database, storage } from '../config/firebase'
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { injectStyle } from "react-toastify/dist/inject-style";
// import Spinner from 'react-bootstrap/Spinner'
// import bcrypt from 'bcryptjs'
// // Modules for Image crop function
// import Cropper from 'react-easy-crop'
// import Slider from '@material-ui/core/Slider'
// import Button from '@material-ui/core/Button'
// import Typography from '@material-ui/core/Typography'
// import { withStyles } from '@material-ui/core/styles'
// import { getOrientation } from 'get-orientation/browser'
// import Modal from 'react-bootstrap/Modal'
// import { getCroppedImg, getRotatedImage } from './canvasUtils'

// import CustomInputLong from '../components/CustomInputLong';
// import DispensaryStations from '../components/DispensaryStations';
// import Footer from '../components/Footer';
// import ProfileCard from '../components/ProfileCard';
// import mapImg from '../images/mapImg.png';
// import messageImg from '../images/messageImg.png';
// import transMaple from '../images/profile-left.png';
// import Avatar from '../images/emptyPhoto.png';


// import atl_zipCode from '../constants/zipCode'

// if (typeof window !== "undefined") {
//   injectStyle();
// }

// const ORIENTATION_TO_ANGLE = {
//   '3': 180,
//   '6': 90,
//   '8': -90,
// }

// const DispensarySignUpForm = () => {
//   let history = useHistory();

//   const [usertype, setUsertype] = useState('')
//   const [firstName, setFirstName] = useState("")
//   const [lastName, setLastName] = useState("")
//   const [ownerEmail, setOwnerEmail] = useState()
//   const [ownerPhone, setOwnerPhone] = useState()
//   const [ownerPass, setOwnerPass] = useState()
//   const [ownerCpass, setOwnerCpass] = useState()
//   const [storeHours, setStoreHours] = useState()

//   const [disName, setDisName] = useState()
//   const [disPhone, setDisphone] = useState()
//   const [disStreet, setDisStreet] = useState()
//   const [city, setCity] = useState()
//   const [GA, setGA] = useState("GA")
//   const [zip, setZip] = useState();
//   const [businessName, setBusinessName] = useState();
//   const [feinName, setFeinName] = useState();
//   const [url, setUrl] = useState(Avatar);
//   const [loading, setLoading] = useState(false);
//   const [uploading, setUploading] = useState(false);

//   const plusHandler = () => {
//     !loading &&
//       document.getElementById("input").click()
//   }

//   useEffect(() => {
//     console.log("++++++++++++=");
//     setUsertype(localStorage.getItem('usertype'))
//     localStorage.getItem('first') && setFirstName(localStorage.getItem('first'));
//     localStorage.getItem('last') && setLastName(localStorage.getItem('last'));
//     localStorage.getItem('ownerEmail') && setOwnerEmail(localStorage.getItem('ownerEmail'));
//     localStorage.getItem('ownerPhone') && setOwnerPhone(localStorage.getItem('ownerPhone'));
//     localStorage.getItem('ownerPass') && setOwnerPass(localStorage.getItem('ownerPass'));
//     localStorage.getItem('ownerCpass') && setOwnerCpass(localStorage.getItem('ownerCpass'));

//     localStorage.getItem('disName') && setDisName(localStorage.getItem('disName'));
//     localStorage.getItem('disPhone') && setDisphone(localStorage.getItem('disPhone'));
//     localStorage.getItem('disStreet') && setDisStreet(localStorage.getItem('disStreet'));
//     localStorage.getItem('url') && setUrl(localStorage.getItem('url'));
//   }, [])

//   useEffect(() => {
//     localStorage.getItem('city') && setCity(localStorage.getItem('city'));
//     localStorage.getItem('GA') && setGA(localStorage.getItem('GA'));
//     localStorage.getItem('zip') && setZip(localStorage.getItem('zip'));
//     localStorage.getItem('businessName') && setBusinessName(localStorage.getItem('businessName'));
//     localStorage.getItem('feinName') && setFeinName(localStorage.getItem('feinName'));
//   }, [])

//   useEffect(() => {
//     localStorage.getItem('storeHours') && setStoreHours(JSON.parse(localStorage.getItem('storeHours')));
//   }, [localStorage.getItem('storeHours')])

//   const imageHandler = async e => {
//     // image preview on avatar area
//     // const reader = new FileReader();
//     // reader.onload = () => {
//     //   if (reader.readyState === 2) {
//     //     setProfileImg(reader.result)
//     //   }
//     // };
//     // reader.onerror = function (e) {
//     //   alert('Image picker error');
//     // }
//     // if (e.target.files[0]) {
//     //   reader.readAsDataURL(e.target.files[0]);
//     //   setImage(e.target.files[0])
//     // }

//     // Firebase image upload
//     if (e.target.files[0]) {
//       var d = new Date();
//       var _name = d.getHours() + d.getMinutes() + d.getSeconds() + 'img.png';
//       setLoading(true)
//       const uploadTask = storage.ref(`ProfileImages/${_name}`).put(e.target.files[0]);
//       uploadTask.on(
//         "state_changed",
//         snapshot => {
//           // const progress = Math.round(
//           //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//           // );
//           // setProgress(progress);
//           console.log('snapshot=>', snapshot)
//         },
//         error => {
//           console.log('error=>', error);
//         },
//         () => {
//           storage
//             .ref("ProfileImages")
//             .child(_name)
//             .getDownloadURL()
//             .then(url => {
//               setUrl(url);
//               localStorage.setItem('url', url)
//               setLoading(false)
//             });
//         }
//       );
//     }
//   };

//   const submitHandler = async (event) => {
//     console.log("storeHours++++++++++++++", storeHours);
//     event.preventDefault();
//     let terms = document.getElementById("agreeTerms").checked
//     let terms1 = document.getElementById("agreeTerms1").checked
//     if (url === Avatar) {
//       toast("Please upload photo.");
//     } else if (ownerPhone.length !== 10) {
//       toast("Please enter valid phone number.");
//     } else if (storeHours == "" || storeHours == undefined || storeHours == null) {
//       toast("Please input dispensary's hours.");
//     } else if (terms && terms1) {
//       if (ownerPass.length < 6) {
//         toast('Password must be at least 6 letters')
//       } else if (ownerPass != ownerCpass) {
//         toast("Confirm password doesn't match password!")
//       } else if (zip.length != 5 || atl_zipCode.zip.indexOf(zip) < 0) {
//         toast('Sorry, CannaGo is not serving that area.')
//       } else {
//         setUploading(true)
//         try {
//           await App
//             .auth()
//             .createUserWithEmailAndPassword(ownerEmail, ownerPass)
//             .then((res) => {
//               localStorage.setItem('loggedIn', 'true')
//               localStorage.setItem('username', firstName + ' ' + lastName.substr(0, 1))
//               localStorage.setItem('storeName', disName)
//               localStorage.setItem('userUid', res.user.uid)
//               localStorage.removeItem('first')
//               localStorage.removeItem('last')
//               localStorage.removeItem('ownerEmail')
//               localStorage.removeItem('ownerPhone')
//               localStorage.removeItem('ownerPass')
//               localStorage.removeItem('ownerCpass')
//               localStorage.removeItem('disName')
//               localStorage.removeItem('disPhone')
//               localStorage.removeItem('disStreet')
//               localStorage.removeItem('city')
//               localStorage.removeItem('GA')
//               localStorage.removeItem('zip')
//               localStorage.removeItem('businessName')
//               localStorage.removeItem('feinName')
//               localStorage.removeItem('storeHours')
//               // console.log('res=>',res.user.uid);
//               database.ref('user/' + res.user.uid + `/${usertype}`).update({
//                 email: ownerEmail,
//                 fristName: firstName,
//                 lastName: lastName,
//                 phoneNum: ownerPhone,
//                 password: bcrypt.hashSync(ownerPass),
//                 storeName: disName,
//                 storePhoneNum: disPhone,
//                 storeStreetAdress: disStreet,
//                 city: city,
//                 GA: GA,
//                 zipCode: zip,
//                 storeHours: storeHours,
//                 companyName: businessName,
//                 fein: feinName,
//                 profileimage: url,
//                 userType: usertype,
//                 availableBal: 0
//               })
//               setUploading(false)
//               history.push('/')
//             })
//             .catch(error => {
//               setUploading(false)
//               var errorCode = error.code;
//               var errorMessage = error.message;
//               console.log(errorMessage)
//               if (errorCode === 'auth/email-already-in-use') {
//                 toast.warning(errorMessage)
//                 return false;
//               } else {
//                 alert(error)
//               }
//             })
//         } catch (error) {
//           console.log(error);
//           alert('Network error', error)
//         }
//       }
//     } else {
//       toast('You need to agree our Terms and Conditions.')
//     }
//   }
//   const setHours = () => {
//     history.push("/hourset");
//   }

//   const setInformation = (val, order) => {
//     if (order === 'first') {
//       setFirstName(val)
//       localStorage.setItem('first', val);
//     } else if (order === 'last') {
//       setLastName(val)
//       localStorage.setItem('last', val);
//     } else if (order === 'ownerEmail') {
//       setOwnerEmail(val)
//       localStorage.setItem('ownerEmail', val);
//     } else if (order === 'ownerPhone') {
//       setOwnerPhone(val)
//       localStorage.setItem('ownerPhone', val);
//     } else if (order === 'ownerPass') {
//       setOwnerPass(val)
//       localStorage.setItem('ownerPass', val);
//     } else if (order === 'ownerCpass') {
//       setOwnerCpass(val)
//       localStorage.setItem('ownerCpass', val);
//     } else if (order === 'disName') {
//       setDisName(val)
//       localStorage.setItem('disName', val);
//     } else if (order === 'disPhone') {
//       setDisphone(val)
//       localStorage.setItem('disPhone', val);
//     } else if (order === 'disStreet') {
//       setDisStreet(val)
//       localStorage.setItem('disStreet', val);
//     } else if (order === 'city') {
//       setCity(val)
//       localStorage.setItem('city', val);
//     } else if (order === 'GA') {
//       setGA(val)
//       localStorage.setItem('GA', val);
//     } else if (order === 'zip') {
//       setZip(val)
//       localStorage.setItem('zip', val);
//     } else if (order === 'businessName') {
//       setBusinessName(val)
//       localStorage.setItem('businessName', val);
//     } else if (order === 'feinName') {
//       val = val.replace("-", "")
//       if (val === "") {
//         setFeinName(val)
//         localStorage.setItem('feinName', val);
//       } else {
//         if (val.length >= 3) {
//           var str = val.slice(0, 2) + '-' + val.slice(2)
//           if (str[str.length - 1] <= '9' && str[str.length - 1] >= '0') {
//             setFeinName(str)
//             localStorage.setItem('feinName', str);

//           }
//         } else {
//           if (val[val.length - 1] <= '9' && val[val.length - 1] >= '0') {
//             setFeinName(val)
//             localStorage.setItem('feinName', val);

//           }
//         }
//       }
//     }
//   }

//   // const oldPassword = e => {
//   //   setCity(e.target.value)
//   //     localStorage.setItem('city', val);
//   // }
//   // const oldPassword = e => {
//   //   setOldPwd(e.target.value)
//   // }
//   // const oldPassword = e => {
//   //   setOldPwd(e.target.value)
//   // }

//   return (
//     <>
//       <div className="checkout-form-cont">
//         <div className="shopping-station-cont">
//           <div className="stationcontainer-dispensary">
//             <DispensaryStations onClick={plusHandler} onChange={imageHandler} src={url} loading={loading} />
//           </div>
//         </div>
//         <form className="checkout-form" onSubmit={submitHandler}>
//           <div className="checkout-form-title-dispensary">
//             <h1>Sign Up Information</h1>
//           </div>
//           <div className="checkout-form-cont">
//             <CustomInputLong placeholder="First Name" type="text" iconType="user" onChange={(e) => setInformation(e.target.value, 'first')} val={firstName} />
//             <CustomInputLong placeholder="Last Name" type="text" iconType="user" onChange={(e) => setInformation(e.target.value, 'last')} val={lastName} />
//             <CustomInputLong placeholder="Owner's Email Address" type="email" iconType="email" onChange={(e) => setInformation(e.target.value, 'ownerEmail')} val={ownerEmail} />
//             <CustomInputLong placeholder="Owner's Phone Number" type="number" iconType="user" onChange={(e) => setInformation(e.target.value, 'ownerPhone')} val={ownerPhone} />
//             <CustomInputLong placeholder="Password" type="password" iconType="password" onChange={(e) => setInformation(e.target.value, 'ownerPass')} val={ownerPass} />
//             <CustomInputLong placeholder="Retype Password" type="password" iconType="password" onChange={(e) => setInformation(e.target.value, 'ownerCpass')} val={ownerCpass} />
//           </div>

//           <div className="checkout-form-title-dispensary">
//             <h1>Dispensary Information</h1>
//           </div>
//           <div className="checkout-form-cont">
//             <CustomInputLong placeholder="Dispensary Store Name" type="text" iconType="user" onChange={(e) => setInformation(e.target.value, 'disName')} val={disName} />
//             <CustomInputLong placeholder="Dispensary's Phone Number" type="number" iconType="user" onChange={(e) => setInformation(e.target.value, 'disPhone')} val={disPhone} />
//             <CustomInputLong placeholder="Dispensary Street Address" type="text" iconType="email" onChange={(e) => setInformation(e.target.value, 'disStreet')} val={disStreet} />
//           </div>

//           <div className="checkout-form-address-dispensary">
//             <input placeholder="City" value={city} onChange={(e) => setInformation(e.target.value, 'city')} type="text" />
//             <input placeholder="GA" value={GA} onChange={(e) => setInformation(e.target.value, 'GA')} type="text" />
//             <input placeholder="Zip Code" value={zip} onChange={(e) => setInformation(e.target.value, 'zip')} type="number" maxLength={5} />
//           </div>
//           {/* <CustomInputLong placeholder="Dispensary's Hours" type="email" src={mapImg} /> */}
//           <ProfileCard onClick={setHours} text="Dispensary's Hours" src={mapImg} />

//           <div className="terms-conditions pos-start">
//             <input type="checkbox" id="agreeTerms1" name="agreeTerms1" width={40} />
//             <label htmlFor="agreeTerms1" id="agreeLabel">By checking I am an authorized signatory of this business, with the power to commit to binding agreements</label>
//           </div>
//           <div className="checkout-form-title-dispensary">
//             <h1>Tax Information</h1>
//           </div>
//           <CustomInputLong placeholder="Business entity/Company name" type="text" iconType="password" onChange={(e) => setInformation(e.target.value, 'businessName')} val={businessName} />
//           <h5 className="mt10 mb30 ph10 greyTxt">Ensure this matches the offical tax focuments for your business.</h5>
//           <CustomInputLong placeholder="FEIN(Fedral Employer Identification Number)" type="text" src={messageImg} onChange={(e) => setInformation(e.target.value, 'feinName')} val={feinName} maxLength={10} />
//           <div className="terms-conditions pos-start">
//             <input type="checkbox" id="agreeTerms" name="agreeTerms" />
//             <label htmlFor="agreeTerms" id="agreeLabel"> By checking this I agree to CannaGo's <a href='#' style={{ color: '#61D273' }}> Terms & Conditions</a> </label>
//           </div>
//           <button className="checkout-form-submit" type="submit">Create Account</button>
//           <div className="large-img-cont-dispensary"><img src={transMaple} alt="transparent maple" className="transMaple" /></div>
//           <ToastContainer />
//           {uploading && <Spinner animation="border" variant="primary" className="loading-border" />}
//         </form>
//       </div>
//       <Footer />
//     </>
//   )
// }

// function readFile(file) {
//   return new Promise((resolve) => {
//     const reader = new FileReader()
//     reader.addEventListener('load', () => resolve(reader.result), false)
//     reader.readAsDataURL(file)
//   })
// }
// export default DispensarySignUpForm;




import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import App, { database, storage } from '../config/firebase'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { injectStyle } from "react-toastify/dist/inject-style";
import Spinner from 'react-bootstrap/Spinner'
import bcrypt from 'bcryptjs'
// Modules for Image crop function
import Cropper from 'react-easy-crop'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { getOrientation } from 'get-orientation/browser'
import Modal from 'react-bootstrap/Modal'
import { getCroppedImg, getRotatedImage } from './canvasUtils'

import CustomInputLong from '../components/CustomInputLong';
import DispensaryStations from '../components/DispensaryStations';
import Footer from '../components/Footer';
import ProfileCard from '../components/ProfileCard';
import mapImg from '../images/mapImg.png';
import messageImg from '../images/messageImg.png';
import transMaple from '../images/profile-left.png';
import Avatar from '../images/emptyPhoto.png';


import atl_zipCode from '../constants/zipCode'

if (typeof window !== "undefined") {
  injectStyle();
}

const ORIENTATION_TO_ANGLE = {
  '3': 180,
  '6': 90,
  '8': -90,
}

const DispensarySignUpForm = () => {
  let history = useHistory();

  const [imageSrc, setImageSrc] = React.useState(null)
  const [usertype, setUsertype] = useState('')
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [ownerEmail, setOwnerEmail] = useState()
  const [ownerPhone, setOwnerPhone] = useState()
  const [ownerPass, setOwnerPass] = useState()
  const [ownerCpass, setOwnerCpass] = useState()
  const [storeHours, setStoreHours] = useState()

  const [disName, setDisName] = useState()
  const [disPhone, setDisphone] = useState()
  const [disStreet, setDisStreet] = useState()
  const [city, setCity] = useState()
  const [GA, setGA] = useState("GA")
  const [zip, setZip] = useState();
  const [businessName, setBusinessName] = useState();
  const [feinName, setFeinName] = useState();
  const [url, setUrl] = useState(Avatar);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [rotation, setRotation] = useState(0)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const plusHandler = () => {
    !loading &&
      document.getElementById("input").click()
  }

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

      console.log("imageDataUrl====>", imageDataUrl);

      // var image = new Image();
      // image.src = 'data:image/png;base64,iVBORw0K...';

      setImageSrc(imageDataUrl)
    }
  }

  const showCroppedImage = useCallback(async () => {
    setImageSrc("")
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      )
      console.log('donee', { croppedImage })
      setCroppedImage(croppedImage)
      imageHandler(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [imageSrc, croppedAreaPixels, rotation])

  useEffect(() => {
    console.log("++++++++++++=");
    setUsertype(localStorage.getItem('usertype'))
    localStorage.getItem('first') && setFirstName(localStorage.getItem('first'));
    localStorage.getItem('last') && setLastName(localStorage.getItem('last'));
    localStorage.getItem('ownerEmail') && setOwnerEmail(localStorage.getItem('ownerEmail'));
    localStorage.getItem('ownerPhone') && setOwnerPhone(localStorage.getItem('ownerPhone'));
    localStorage.getItem('ownerPass') && setOwnerPass(localStorage.getItem('ownerPass'));
    localStorage.getItem('ownerCpass') && setOwnerCpass(localStorage.getItem('ownerCpass'));

    localStorage.getItem('disName') && setDisName(localStorage.getItem('disName'));
    localStorage.getItem('disPhone') && setDisphone(localStorage.getItem('disPhone'));
    localStorage.getItem('disStreet') && setDisStreet(localStorage.getItem('disStreet'));
    localStorage.getItem('url') && setUrl(localStorage.getItem('url'));
  }, [])

  useEffect(() => {
    localStorage.getItem('city') && setCity(localStorage.getItem('city'));
    localStorage.getItem('GA') && setGA(localStorage.getItem('GA'));
    localStorage.getItem('zip') && setZip(localStorage.getItem('zip'));
    localStorage.getItem('businessName') && setBusinessName(localStorage.getItem('businessName'));
    localStorage.getItem('feinName') && setFeinName(localStorage.getItem('feinName'));
  }, [])

  useEffect(() => {
    localStorage.getItem('storeHours') && setStoreHours(JSON.parse(localStorage.getItem('storeHours')));
  }, [localStorage.getItem('storeHours')])

  const imageHandler = (croppedImage) => {
    if (croppedImage) {
      var newItemKey = database.ref().child('user').push().key;
      var _name = newItemKey + 'img.png';
      setLoading(true)
      const uploadTask = storage.ref(`ProfileImages/${_name}`).put(croppedImage);
      uploadTask.on(
        "state_changed",
        snapshot => {
          // const progress = Math.round(
          //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          // );
          // setProgress(progress);
          console.log('snapshot=>', snapshot)
        },
        error => {
          console.log('error=>', error);
        },
        () => {
          storage
            .ref("ProfileImages")
            .child(_name)
            .getDownloadURL()
            .then(url => {
              setUrl(url);
              localStorage.setItem('url', url)
              setLoading(false)
            });
        }
      );
    }
  };

  const submitHandler = async (event) => {
    console.log("storeHours++++++++++++++", storeHours);
    event.preventDefault();
    let terms = document.getElementById("agreeTerms").checked
    let terms1 = document.getElementById("agreeTerms1").checked
    if (url === Avatar) {
      toast("Please upload photo.");
    } else if (ownerPhone.length !== 10) {
      toast("Please enter valid phone number.");
    } else if (storeHours == "" || storeHours == undefined || storeHours == null) {
      toast("Please input store's hours.");
    } else if (terms && terms1) {
      if (ownerPass.length < 6) {
        toast('Password must be at least 6 letters')
      } else if (ownerPass != ownerCpass) {
        toast("Confirm password doesn't match password!")
      } else if (zip.length != 5 || atl_zipCode.zip.indexOf(zip) < 0) {
        toast('Sorry, CannaGo is not serving that area.')
      } else {
        setUploading(true)
        try {
          await App
            .auth()
            .createUserWithEmailAndPassword(ownerEmail, ownerPass)
            .then((res) => {
              localStorage.setItem('loggedIn', 'true')
              localStorage.setItem('username', firstName + ' ' + lastName.substr(0, 1))
              localStorage.setItem('storeName', disName)
              localStorage.setItem('userUid', res.user.uid)
              localStorage.removeItem('first')
              localStorage.removeItem('last')
              localStorage.removeItem('ownerEmail')
              localStorage.removeItem('ownerPhone')
              localStorage.removeItem('ownerPass')
              localStorage.removeItem('ownerCpass')
              localStorage.removeItem('disName')
              localStorage.removeItem('disPhone')
              localStorage.removeItem('disStreet')
              localStorage.removeItem('city')
              localStorage.removeItem('GA')
              localStorage.removeItem('zip')
              localStorage.removeItem('businessName')
              localStorage.removeItem('feinName')
              localStorage.removeItem('storeHours')
              // console.log('res=>',res.user.uid);
              database.ref('user/' + res.user.uid + `/${usertype}`).update({
                email: ownerEmail,
                fristName: firstName,
                lastName: lastName,
                phoneNum: ownerPhone,
                password: bcrypt.hashSync(ownerPass),
                storeName: disName,
                storePhoneNum: disPhone,
                storeStreetAdress: disStreet,
                city: city,
                GA: GA,
                zipCode: zip,
                storeHours: storeHours,
                companyName: businessName,
                fein: feinName,
                profileimage: url,
                userType: usertype,
                availableBal: 0
              })
              setUploading(false)
              history.push('/')
            })
            .catch(error => {
              setUploading(false)
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(errorMessage)
              if (errorCode === 'auth/email-already-in-use') {
                toast.warning(errorMessage)
                return false;
              } else {
                alert(error)
              }
            })
        } catch (error) {
          console.log(error);
          alert('Network error', error)
        }
      }
    } else {
      toast('You need to agree our Terms and Conditions.')
    }
  }
  const setHours = () => {
    history.push("/hourset");
  }

  const setInformation = (val, order) => {
    if (order === 'first') {
      setFirstName(val)
      localStorage.setItem('first', val);
    } else if (order === 'last') {
      setLastName(val)
      localStorage.setItem('last', val);
    } else if (order === 'ownerEmail') {
      setOwnerEmail(val)
      localStorage.setItem('ownerEmail', val);
    } else if (order === 'ownerPhone') {
      setOwnerPhone(val)
      localStorage.setItem('ownerPhone', val);
    } else if (order === 'ownerPass') {
      setOwnerPass(val)
      localStorage.setItem('ownerPass', val);
    } else if (order === 'ownerCpass') {
      setOwnerCpass(val)
      localStorage.setItem('ownerCpass', val);
    } else if (order === 'disName') {
      setDisName(val)
      localStorage.setItem('disName', val);
    } else if (order === 'disPhone') {
      setDisphone(val)
      localStorage.setItem('disPhone', val);
    } else if (order === 'disStreet') {
      setDisStreet(val)
      localStorage.setItem('disStreet', val);
    } else if (order === 'city') {
      setCity(val)
      localStorage.setItem('city', val);
    } else if (order === 'GA') {
      setGA(val)
      localStorage.setItem('GA', val);
    } else if (order === 'zip') {
      setZip(val)
      localStorage.setItem('zip', val);
    } else if (order === 'businessName') {
      setBusinessName(val)
      localStorage.setItem('businessName', val);
    } else if (order === 'feinName') {
      val = val.replace("-", "")
      if (val === "") {
        setFeinName(val)
        localStorage.setItem('feinName', val);
      } else {
        if (val.length >= 3) {
          var str = val.slice(0, 2) + '-' + val.slice(2)
          if (str[str.length - 1] <= '9' && str[str.length - 1] >= '0') {
            setFeinName(str)
            localStorage.setItem('feinName', str);

          }
        } else {
          if (val[val.length - 1] <= '9' && val[val.length - 1] >= '0') {
            setFeinName(val)
            localStorage.setItem('feinName', val);

          }
        }
      }
    }
  }

  // const oldPassword = e => {
  //   setCity(e.target.value)
  //     localStorage.setItem('city', val);
  // }
  // const oldPassword = e => {
  //   setOldPwd(e.target.value)
  // }
  // const oldPassword = e => {
  //   setOldPwd(e.target.value)
  // }

  const setImageModalShow = () => {
    setImageSrc("")
  }

  const gotoTerms = () => {
    history.push("/termsconditions");
  }

  return (
    <>
      <div className="checkout-form-cont">
        <div className="shopping-station-cont">
          <div className="stationcontainer-dispensary">
            <DispensaryStations onClick={plusHandler} onChange={onFileChange} src={url} loading={loading} />
          </div>
        </div>
        <form className="checkout-form" onSubmit={submitHandler}>
          <div className="checkout-form-title-dispensary">
            <h1>Sign Up Information</h1>
          </div>
          <div className="checkout-form-cont">
            <CustomInputLong placeholder="First Name" type="text" iconType="user" onChange={(e) => setInformation(e.target.value, 'first')} val={firstName} />
            <CustomInputLong placeholder="Last Name" type="text" iconType="user" onChange={(e) => setInformation(e.target.value, 'last')} val={lastName} />
            <CustomInputLong placeholder="Owner's Email Address" type="email" iconType="email" onChange={(e) => setInformation(e.target.value, 'ownerEmail')} val={ownerEmail} />
            <CustomInputLong placeholder="Owner's Phone Number" type="number" iconType="user" onChange={(e) => setInformation(e.target.value, 'ownerPhone')} val={ownerPhone} />
            <CustomInputLong placeholder="Password" type="password" iconType="password" onChange={(e) => setInformation(e.target.value, 'ownerPass')} val={ownerPass} />
            <CustomInputLong placeholder="Retype Password" type="password" iconType="password" onChange={(e) => setInformation(e.target.value, 'ownerCpass')} val={ownerCpass} />
          </div>

          <div className="checkout-form-title-dispensary">
            <h1>Store Information</h1>
          </div>
          <div className="checkout-form-cont">
            <CustomInputLong placeholder="Store Name" type="text" iconType="user" onChange={(e) => setInformation(e.target.value, 'disName')} val={disName} />
            <CustomInputLong placeholder="Store's Phone Number" type="number" iconType="user" onChange={(e) => setInformation(e.target.value, 'disPhone')} val={disPhone} />
            <CustomInputLong placeholder="Store Street Address" type="text" iconType="email" onChange={(e) => setInformation(e.target.value, 'disStreet')} val={disStreet} />
          </div>

          <div className="checkout-form-address-dispensary">
            <input placeholder="City" value={city} onChange={(e) => setInformation(e.target.value, 'city')} type="text" />
            <input placeholder="GA" value={GA} onChange={(e) => setInformation(e.target.value, 'GA')} type="text" />
            <input placeholder="Zip Code" value={zip} onChange={(e) => setInformation(e.target.value, 'zip')} type="number" maxLength={5} />
          </div>
          {/* <CustomInputLong placeholder="Dispensary's Hours" type="email" src={mapImg} /> */}
          <ProfileCard onClick={setHours} text="Store's Hours" src={mapImg} />

          <div className="terms-conditions pos-start">
            <input type="checkbox" id="agreeTerms1" name="agreeTerms1" width={40} />
            <label htmlFor="agreeTerms1" id="agreeLabel">By checking I am an authorized signatory of this business, with the power to commit to binding agreements</label>
          </div>
          <div className="checkout-form-title-dispensary">
            <h1>Tax Information</h1>
          </div>
          <CustomInputLong placeholder="Business entity/Company name" type="text" iconType="password" onChange={(e) => setInformation(e.target.value, 'businessName')} val={businessName} />
          <h5 className="mt10 mb30 ph10 greyTxt">Ensure this matches the offical tax focuments for your business.</h5>
          <CustomInputLong placeholder="FEIN(Fedral Employer Identification Number)" type="text" src={messageImg} onChange={(e) => setInformation(e.target.value, 'feinName')} val={feinName} maxLength={10} />
          <div className="terms-conditions pos-start">
            <input type="checkbox" id="agreeTerms" name="agreeTerms" />
            <label htmlFor="agreeTerms" id="agreeLabel"> By checking this I agree to CannaGo's <a onClick={gotoTerms} style={{ color: '#61D273' }}> Terms & Conditions</a> </label>
          </div>
          <button className="checkout-form-submit" type="submit">Create Account</button>
          <div className="large-img-cont-dispensary"><img src={transMaple} alt="transparent maple" className="transMaple" /></div>
          <ToastContainer />
          {uploading && <Spinner animation="border" variant="primary" className="loading-border" />}
        </form>
      </div>
      <Footer />
      <Modal
        show={imageSrc != null && imageSrc != "" && imageSrc != undefined ? true : false}
        backdropClassName="scoped-bootstrap"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        dialogClassName="modal-50w"
        centered
        onHide={() => setImageModalShow()}
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
                Select Image
              </Button>
            </div>
            {/* <ImgDialog img={croppedImage} onClose={onClose} /> */}
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })
}
export default DispensarySignUpForm;