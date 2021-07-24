import React from 'react'
import ItemCurrencyInput from './ItemCurrencyInput.js'
import itemSeveralEmpty from '../images/itemSeveralEmpty.png'
import Spinner from 'react-bootstrap/Spinner'

export default function AddITemValue(props) {
    return (
        <div className="addVariantArea">
            <div className="optionArea">
                <div className="priceOptionNameArea">
                    <p className="optionNameLabel1">Add Image</p>
                    <div onClick={() => { props.plusHandler(props.index) }}>
                        <img src={props.url == "" ? itemSeveralEmpty : props.url} alt="station" className={'itemSeveralEmpty'} />
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        name="image-upload"
                        id={"itemImageInput" + props.index}
                        onChange={(e) => { props.imageHandler(e, props.index) }}
                        hidden
                    />
                    {/* {
                        props.loading &&
                        <Spinner animation="grow" variant="primary" className="variantImageloading" />
                    } */}
                </div>
                <div className="priceOptionNameArea">
                    <p className="optionNameLabel2">Variant</p>
                    {props.variantValue.map((item, i) => <p key={i} className="strengthValue">{item}</p>)}
                    {/* <p className="strengthValue">500 Mg</p>
                    <p className="flavorValue">Grape</p> */}
                </div>
                <div className="priceOptionNameArea" style={{ width: 80 }}>
                    <p className="optionNameLabel2">Our Fee</p>
                    <p className="optionNameLabel" style={{ paddingTop: 15 }}>${props.ourfee}</p>
                </div>
                <div className="priceOptionNameArea" style={{ width: 120 }}>
                    <p className="optionNameLabel">Product Price</p>
                    <ItemCurrencyInput
                        max={100000000}
                        onValueChange={(val) => { props.itemHandleValueChange(val, props.index) }}
                        className="priceValue"
                        value={props.value}
                    />
                </div>
                <div className="priceOptionNameArea" style={{ width: 80 }}>
                    <p className="optionNameLabel" >Your Net</p>
                    <p className="optionNameLabel" style={{ paddingTop: 7 }}>${props.yournet}</p>
                </div>
                <div className="priceOptionNameArea" style={{ width: 150 }}>
                    <p className="optionNameLabel">Quantity in Stock</p>
                    <div className="item-counter-container">
                        <button
                            onClick={() => props.itemStockQuantity('minus', props.index)}>-</button>
                        <p>{props.itemQuantity}</p>
                        <button
                            onClick={() => props.itemStockQuantity('plus', props.index)}>+</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
