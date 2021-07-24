import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { database, storage } from '../config/firebase'
import Spinner from 'react-bootstrap/Spinner'

import DispensaryNavbar from '../components/DispensaryNavbar'
import AddItmeImage from '../components/AddItmeImage'
import UpdateItemSettings from '../components/UpdateItemSettings'
import GoBackButton from '../components/GoBackButton'
import BG from '../images/forgot2.png'
import Footer from '../components/Footer'

import avatar from '../images/avatar.png'

function StoreUpdateScreen(props) {
  let itemId = props.match.params.id;
  let userId = localStorage.getItem('userUid');
  const location = useLocation()

  const [url, setUrl] = useState("");
  const [coaUrl, setCoaUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [coaLoading, setCoaLoading] = useState(false);
  const [coaFileType, setCoaFileType] = useState("");
  const [userType, setUserType] = useState()
  const [userUid, setUserUid] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    console.log("props.match.params.id", props.match.params.id);
    setUserType(localStorage.getItem('usertype'))
    setUserUid(localStorage.getItem('userUid'))
  }, [])

  useEffect(() => {
    if (itemId !== "" && itemId !== null && itemId !== undefined) {
      if (location.state !== 'add') {
        database
          .ref('Items/' + userId + '/' + itemId)
          .once("value", async (snapshot) => {
            // console.log(snapshot.val())
            var row
            row = {
              'itemImage': snapshot.val().itemImage,
              'coaImage': snapshot.val().coaImage,
              'coaFileType': snapshot.val().coaFileType,
            }
            console.log(row);
            setUrl(row.itemImage)
            setCoaUrl(row.coaImage)
            setCoaFileType(row.coaFileType)
          })
      }
    }

    console.log(location.pathname);
    console.log(location.state);
  }, [location])

  const plusHandler = () => {
    !loading &&
      document.getElementById("input").click()
  }
  const coaplusHandler = () => {
    window.scrollTo(0, 0);
    !loading &&
      document.getElementById("coainput").click()
  }

  const imageHandler = async e => {

    console.log("=====>>>", e.target);
    // Firebase Item image upload
    if (e.target.files[0]) {
      var newItemKey = database.ref().child('Items').push().key;
      var _name = newItemKey + 'img.png';
      setLoading(true)
      const uploadTask = storage.ref(`ItemImages/${_name}`).put(e.target.files[0]);
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
            .ref("ItemImages")
            .child(_name)
            .getDownloadURL()
            .then(url => {
              setUrl(url);
              localStorage.setItem('itemImage', url)
              setLoading(false)
            });
        }
      );
    }
  };

  const CoaHandler = async e => {

    console.log(e.target);

    //Firebase Item image upload
    if (e.target.files[0]) {
      console.log("fileType=====>", e.target.files[0].type);
      var newItemKey = database.ref().child('Items').push().key;
      var _name = newItemKey + 'img.png';
      setCoaLoading(true)
      const uploadTask = storage.ref(`ItemImages/${_name}`).put(e.target.files[0]);
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
            .ref("ItemImages")
            .child(_name)
            .getDownloadURL()
            .then(url => {
              setCoaUrl(url);
              setCoaFileType(e.target.files[0].type)
              localStorage.setItem('coaImage', url)
              localStorage.setItem('coaType', e.target.files[0].type)
              setCoaLoading(false)
            });
        }
      );
    }
  };

  return (
    <>
      <DispensaryNavbar />
      <div className="back-cont mt50"><GoBackButton /></div>
      <div className="dispensary-settings-storeadd">
        <AddItmeImage src={url} onClick={plusHandler} onChange={imageHandler} loading={loading} status={location.state === 'add' ? 'add' : 'update'} />
        <UpdateItemSettings itemUrl={url} coaFileType={coaFileType} coaUrl={coaUrl} itemId={itemId} onClick={coaplusHandler} onChange={CoaHandler} loading={coaLoading} status={location.state === 'add' ? 'add' : 'update'} />
      </div>
      <div className="large-img-cont-storeadd"><img src={BG} alt="" style={{ width: "100%" }} /></div>
      <Footer />
      {coaLoading && <Spinner animation="border" variant="primary" className="loading-border" />}
    </>
  )
}

export default StoreUpdateScreen
