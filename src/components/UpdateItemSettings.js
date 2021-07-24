import React, { useState, useCallback, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import InputGroup from './InputGroup'
import { Lorem } from '../constants/LongText'
import CurrencyInput from './CurrencyInput.js'

import App, { database, storage } from '../config/firebase'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { injectStyle } from "react-toastify/dist/inject-style";
import Spinner from 'react-bootstrap/Spinner'

import AddTags from './AddTags'
import AddITemValue from './AddITemValue'
import itemSeveralEmpty from '../images/itemSeveralEmpty.png'
if (typeof window !== "undefined") {
  injectStyle();
}

const UpdateItemSettings = (props) => {
  const history = useHistory()
  const location = useLocation()
  const [quantity, setQuantity] = useState(1)
  const [fee, setFee] = useState(0)
  const [productFee, setProductFee] = useState(0)
  const [grossFee, setGrossFee] = useState(0)
  const [value, setValue] = useState(0);
  const [itemImage, setItemImage] = useState()
  const [coaImage, setCoaImage] = useState("")
  const [productName, setProductName] = useState()
  const [tag, setTag] = useState()
  const [description, setDescription] = useState()
  const [itemId, setItemId] = useState()
  const [addValue, setAddValue] = useState(false)
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]); //{optionName:'',optionValue:[]}
  const [tempState, setTempState] = useState(1);
  const [variantItemValues, setVariantItemValues] = useState([
    // { weight: '10', image: '', variantValue: [], itemValue: 0, ourfee: 0, price: 0, yournet: 0, count: 0 },
    // { weight: '10', image: '', variantValue: [], itemValue: 0, ourfee: 0, price: 0, yournet: 0, count: 0 },
  ]);

  let userId = localStorage.getItem('userUid')
  let usertype = localStorage.getItem('usertype')
  const [coaFileType, setCoaFileType] = useState("");

  const handleValueChange = useCallback(val => {
    setValue(val);
    setProductFee(parseFloat(val / 100).toFixed(2));
    setGrossFee(parseFloat(val / 100 * 0.7).toFixed(2))
    setFee(parseFloat(val / 100 * 0.3).toFixed(2))
  }, []);

  const itemHandleValueChange = (val, index) => {
    console.log("index--->", index);
    let temp = [...variantItemValues];
    console.log("temp===>", temp);
    temp[index].itemValue = val
    temp[index].price = parseFloat(val / 100).toFixed(2)
    temp[index].yournet = parseFloat(val / 100 * 0.7).toFixed(2)
    temp[index].ourfee = parseFloat(val / 100 * 0.3).toFixed(2)
    setVariantItemValues(temp)
  };

  const OptionNameHandler = (value, index) => {
    let temp = [...options];
    temp[index].optionName = value;
    console.log(temp);
    setOptions(temp);
  }

  useEffect(() => {
    console.log("props.coaFileType==>", props.coaFileType);
    console.log("props.itemUrl==>", props.itemUrl);
    console.log("props.coaUrl==>", props.coaUrl);
    setCoaImage(props.coaUrl)
    setCoaFileType(props.coaFileType)
    setItemImage(props.itemUrl)
  }, [localStorage.getItem('coaImage'), localStorage.getItem('itemImage')])

  useEffect(() => {
    console.log("props.params=====>>", location.pathname);
    let itemID = props.itemId
    console.log("=====>>", itemID);
    setItemId(itemID)
    database
      .ref('Items/' + userId + '/' + itemID)
      .once("value", async (snapshot) => {
        // console.log(snapshot.val())
        var row
        row = {
          'Description': snapshot.val().Description,
          'GpriceValue': snapshot.val().GpriceValue,
          'Tag': snapshot.val().Tag,
          'feeValue': snapshot.val().feeValue,
          'id': snapshot.val().id,
          'itemImage': snapshot.val().itemImage,
          'itemNum1': snapshot.val().itemNum1,
          'priceValue': snapshot.val().priceValue,
          'productName': snapshot.val().productName,
          'coaImage': snapshot.val().coaImage,
          'storeId': snapshot.val().storeId,
          'coaFileType': snapshot.val().coaFileType,
          'variantItemValues': snapshot.val().variantItemValues,
          'options': snapshot.val().options,
          'addValue': snapshot.val().addValue,
        }
        console.log(row);
        setQuantity(row.itemNum1)
        setFee(row.feeValue)
        setValue(row.priceValue * 100)
        setProductFee(row.priceValue)
        setGrossFee(row.GpriceValue)
        setItemImage(row.itemImage)
        setCoaImage(row.coaImage)
        setProductName(row.productName)
        setTag(row.Tag)
        setDescription(row.Description)
        setCoaFileType(row.coaFileType)
        setVariantItemValues(row.variantItemValues)
        if (row.options == null || row.options == undefined || row.options == "") {
          setOptions([])
        } else {
          setOptions(row.options)
        }
        if (row.variantItemValues == null || row.variantItemValues == undefined || row.variantItemValues == "") {
          setVariantItemValues([])
        } else {
          setVariantItemValues(row.variantItemValues)
        }
        setAddValue(row.addValue)
      })
  }, [])

  const stockQuantity = (e) => {
    if (e === 'minus') {
      quantity < 1 ? setQuantity(0) : setQuantity(quantity - 1)
    } else {
      setQuantity(quantity + 1)
    }
  }
  const itemStockQuantity = (e, index) => {
    let temp = [...variantItemValues];
    if (e === 'minus') {
      temp[index].count < 1 ? temp[index].count = 0 : temp[index].count = temp[index].count - 1
    } else {
      temp[index].count = temp[index].count + 1
    }
    console.log(temp);
    setVariantItemValues(temp);
  }

  const deleteItem = () => {
    var result = window.confirm("Are you sure you want to delete this item?");
    if (result) {
      history.push("/shopdispensary");
      database.ref('Items/' + userId + '/' + itemId).remove();
    } else {
      console.log("Undeleted");
    }
  }

  const submitHandler = async (e) => {
    let userId = await localStorage.getItem('userUid')
    // alert("update")
    // e.preventDefault();
    try {
      if (itemImage == '') {
        toast("Please select product image.");
      } else if (productFee == "") {
        toast("Please input product price.");
      } else if (coaImage == "") {
        toast("Please select COA image.");
      } else {
        database.ref('Items/' + userId + '/' + itemId).update({
          id: itemId,
          itemNum1: quantity,
          feeValue: fee,
          priceValue: productFee,
          GpriceValue: grossFee,
          productName: productName,
          Tag: tag,
          Description: description,
          itemImage: itemImage,
          coaFileType: coaFileType,
          coaImage: coaImage,
          storeId: userId,
          negValue: -Math.abs(productFee),
          variantItemValues: variantItemValues,
          options: options,
          addValue: addValue
        });
        toast("Store item is updated successfully");
        setTimeout(() => {
          history.push("/shopdispensary");
          localStorage.removeItem('itemImage')
          localStorage.removeItem('coaImage')
          localStorage.removeItem('coaType')
        }, 1000)
      }
    }
    catch (error) {
      console.log(error.toString())
      toast("Sorry, the process has failed. Please try again.")
    }
  }


  const removeTags = (index, indexToRemove) => {
    setTempState(tempState + 1)
    console.log(index, indexToRemove);
    let temp = [...options];
    if (temp[index].optionValue.length == 1) {
      const temp1 = [...variantItemValues]
      if (temp1.length == 1) {
        setVariantItemValues([])
      } else {
        temp1.forEach(element => {
          let filteredTag = element.variantValue.filter((_, i) => i !== index);
          element.variantValue = filteredTag
        });
        setVariantItemValues(temp1)
      }
      let removeTag = temp[index].optionValue[indexToRemove]
      let ttt = temp[index].optionValue.filter((_, index) => index !== indexToRemove);
      temp[index].optionValue = ttt;
      setOptions(temp);
    } else {
      let removeTag = temp[index].optionValue[indexToRemove]
      let ttt = temp[index].optionValue.filter((_, index) => index !== indexToRemove);
      temp[index].optionValue = ttt;
      setOptions(temp);
      const temp1 = [...variantItemValues]
      let filteredTepm = temp1.filter((item) => !item.variantValue.includes(removeTag))
      setVariantItemValues(filteredTepm)
    }
  };
  const selectedTags = tags => {
    console.log(tags);
  };
  const addTags = (index, event) => {
    if (event.target.value !== "") {
      if (options[index].optionName == "") {
        toast("Please input option Name.")
      } else {
        const temp = [...options];
        temp[index].optionValue.push(event.target.value);
        setOptions(temp);
        event.target.value = "";

        // let tempVarient = []
        // options.forEach(element => {
        //   let tempitem = []
        //   element.optionValue.forEach(item => {
        //     tempitem.push(item)
        //   })
        // });
        if (options[index].optionValue.length == 1 && variantItemValues.length != 0) {
          const temp1 = [...variantItemValues]
          temp1.forEach(element => {
            element.variantValue.push(options[index].optionValue[0])
          });
          console.log(temp1);
          setVariantItemValues(temp1)
        } else {
          let temp2 = []
          options.forEach(element => {
            if (element.optionValue.length) {
              temp2.push(element.optionValue)
            }
          });
          let res = cartesian(temp2)
          const temp1 = [...variantItemValues]
          console.log(res)
          res.forEach(element => {
            if (variantItemValues.length) {
              let i = 0
              for (i = 0; i < variantItemValues.length; i++) {
                const item = variantItemValues[i].variantValue;
                if (JSON.stringify(item) == JSON.stringify(element)) {
                  break;
                }
              }
              console.log(i)
              console.log(variantItemValues.length)
              if (i == variantItemValues.length) {
                const categoryItem = { image: '', variantValue: element, itemValue: 0, ourfee: 0, price: 0, yournet: 0, count: 0 }
                temp1.push(categoryItem)
              }
            } else {
              const categoryItem = { image: '', variantValue: element, itemValue: 0, ourfee: 0, price: 0, yournet: 0, count: 0 }
              temp1.push(categoryItem)
            }
          });
          console.log(temp1)

          setVariantItemValues(temp1)

        }
      }
    }
  };

  function cartesian(args) {
    var r = [], max = args.length - 1;
    function helper(arr, i) {
      for (var j = 0, l = args[i].length; j < l; j++) {
        var a = arr.slice(0); // clone arr
        a.push(args[i][j]);
        if (i == max)
          r.push(a);
        else
          helper(a, i + 1);
      }
    }
    helper([], 0);
    return r;
  }

  const AddHandler = () => {
    // if (count == 0) {
    //   setCount(1)
    // } else {
    //   setCount(0)
    // }
    setAddValue(!addValue)
    if (options.length) {
      setOptions([]);
      setVariantItemValues([]);
    } else {
      let temp = [];
      temp.push({ optionName: '', optionValue: [] })
      setOptions(temp);
      console.log(temp);
    }
  }

  const AddAnotherOption = () => {
    options.push({ optionName: '', optionValue: [] });
    console.log(options);
    setTempState(tempState + 1);
  }

  const plusHandler = (index) => {
    !loading &&
      document.getElementById("itemImageInput" + index).click()
  }

  const imageHandler = async (e, index) => {
    // image preview on avatar area
    // const reader = new FileReader();
    // reader.onload = () => {
    //   if (reader.readyState === 2) {
    //     setProfileImg(reader.result)
    //   }
    // };
    // reader.onerror = function (e) {
    //   alert('Image picker error');
    // }
    // if (e.target.files[0]) {
    //   reader.readAsDataURL(e.target.files[0]);
    //   setImage(e.target.files[0])
    // }

    // Firebase image upload
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
              console.log(url);
              let temp = [...variantItemValues]
              temp[index].image = url
              setVariantItemValues(temp);
              setLoading(false)
            });
        }
      );
    }
  };

  const removeOption = async (index) => {
    let temp = [...options]
    if (temp.length == 1) {
      setOptions([])
      setVariantItemValues([])
      setAddValue(false)
    } else {
      for (let i = temp[index].optionValue.length - 1; i >= 0; i--) {
        await removeTags(index, i)
      }
      // if (!temp.length) {
      //   setAddValue(false)
      // }
      let tempoptions = temp.filter((_, i) => i !== index)
      setOptions(tempoptions)

      setVariantItemValues([])
      let temp2 = []
      tempoptions.forEach(element => {
        if (element.optionValue.length) {
          temp2.push(element.optionValue)
        }
      });
      let res = cartesian(temp2)
      const temp1 = []

      res.forEach(element => {
        const categoryItem = { image: '', variantValue: element, itemValue: 0, ourfee: 0, price: 0, yournet: 0, count: 0 }
        temp1.push(categoryItem)
      });
      console.log(temp1)

      setVariantItemValues(temp1)

      temp[index].optionValue.forEach((element, i) => {
        removeTags(index, i)
      });
    }
  }

  return (
    <>
      <div className="dispensary-cont-storeadd">
        <div className="addToStore mt50 mb90">
          <h2 className="mt30">{props.status === 'add' ? 'Add an Item to Your Store' : 'Update Product'}</h2>
        </div>
        <div className="row-items">
          <h2>Quantity in Stock</h2>
          <div className="counter-container">
            <button
              onClick={() => stockQuantity('minus')}>-</button>
            <p>{quantity}</p>
            <button
              onClick={() => stockQuantity('plus')}>+</button>
          </div>
        </div>
        {/* <div> */}
        <div className="price-group-wrapper">
          <div className="price-item">
            <h2>Our fees</h2>
            {/* <input type="number" value={parseFloat(fee).toFixed(2)} disabled /> */}
            <p>${parseFloat(fee).toFixed(2)}</p>
          </div>
          <div className="price-item">
            <h2>Product Price</h2>
            <CurrencyInput
              max={100000000}
              onValueChange={handleValueChange}
              style={{ textAlign: 'center' }}
              value={value}
            />
          </div>
          <div className="price-item">
            <h2>Gross Price</h2>
            {/* <input type="number" value={parseFloat(grossFee).toFixed(2)} disabled /> */}
            <p>${parseFloat(grossFee).toFixed(2)}</p>
          </div>
        </div>
        <InputGroup value={productName} onChange={e => setProductName(e.target.value)} desc="Name of Product" placeholder="Enter Item's Name..." val={props.status === 'add' ? '' : 'CBD Flower'} />
        <InputGroup value={tag} onChange={e => setTag(e.target.value)} desc="Tags" placeholder="Enter Relevant Search Tags of Item…" val={props.status === 'add' ? '' : 'CBD Flower, CBD Plant, CBD Bud'} />
        <InputGroup value={description} onChange={e => setDescription(e.target.value)} textArea desc="Description" placeholder="Enter Items Description..." val={props.status === 'add' ? '' : Lorem} />
        <div className="addVariantCheckBox">
          <div className="product-terms-conditions product-pos-start">
            <input type="checkbox" id="agreeTerms" name="agreeTerms" checked={addValue} onChange={(e) => { AddHandler() }} />
            <label htmlFor="agreeTerms" id="agreeLabel">Add Product Variant?</label>
          </div>
        </div>
        {addValue == true ? [...options].map((item, i) => <AddTags key={i} index={i} removeOption={removeOption} removeTags={removeTags} optionName={item.optionName} OptionNameHandler={OptionNameHandler} addTags={addTags} selectedTags={selectedTags} tags={item.optionValue} />) : ""}
        {addValue == true ?
          <div className="addVariantArea">
            <button className="addVariantButton" onClick={AddAnotherOption}>Add Another Option</button>
          </div> :
          ""
        }
        {addValue == true ? [...variantItemValues].map((item, i) => <AddITemValue key={i} index={i} loading={loading} variantValue={item.variantValue} itemHandleValueChange={itemHandleValueChange} plusHandler={plusHandler} url={item.image} imageHandler={imageHandler} value={item.itemValue} ourfee={item.ourfee} yournet={item.yournet} itemStockQuantity={itemStockQuantity} itemQuantity={item.count} />) : ""}
        <div className="align-center">
          <button className="bt-upload-noncap mt90" type="button" onClick={props.onClick}>Upload COA</button>
          <input
            type="file"
            //accept="image/*"
            name="image-upload"
            id="coainput"
            onChange={props.onChange}
            hidden
          />
          {
            props.coaLoading &&
            <Spinner animation="grow" variant="primary" className="dispensaryloading" />
          }
        </div>
        <div className="align-center">
          <div className="space-around">
            <button className="checkout-form-delete" type="button" onClick={deleteItem}>Delete</button>
            <button className="checkout-form-update" type="button" onClick={submitHandler}>Update</button>
          </div>
        </div>
        {/* </div> */}
        <ToastContainer />
      </div>
    </>
  )
}

export default UpdateItemSettings
