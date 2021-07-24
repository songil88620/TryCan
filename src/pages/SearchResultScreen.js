import React, { useState } from 'react'
import { useEffect } from 'react'
import { database } from '../config/firebase'
import Dropdown from 'react-dropdown';

import SearchResultProduct from '../components/SearchResultProduct'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import SearchModal from '../components/SearchModal';
import LocationSettingModal from '../components/LocationSettingModal'
import GoBackButton from '../components/GoBackButton'

import down_left from '../images/down-left.png'
import arrow from '../images/down-left.png'

const SearchResultScreen = (props) => {

    const options = [
        'From Low to High', 'From High to Low'
    ];

    let searchKey = props.match.params.id;

    const [storeData, setStoreData] = useState('')
    const [filtedStoreIds, setFiltedStoreIds] = useState([])
    const [filterValue, setFilterValut] = useState('')
    const [modalShow, setModalShow] = useState(false);
    const [searchModalShow, setSearchModalShow] = useState(false);
    // let filtedStoreIds = []

    useEffect(() => {
        console.log("searchKey===>", searchKey);
        window.scrollTo(0, 0);
        database
            .ref("Items")
            .once("value", async (snapshot) => {
                console.log("snapshot.val====>", snapshot.val());

                let filtedStoreIds = []
                snapshot.forEach(element => {
                    // console.log("element.val====>", element.val());
                    var elementArray = Object.values(element.val());
                    console.log("elementArray=+++++++++===>", elementArray);
                    let productArray = []
                    let storeIds = []
                    var row
                    // element.forEach(product => {
                    //     var el = product.val()
                    //     row = {
                    //         'Description': el.Description,
                    //         'Tag': el.Tag,
                    //         'priceValue': el.priceValue,
                    //         'productName': el.productName,
                    //         'storeId': el.storeId
                    //     }
                    //     var searchValue = row.productName + row.Tag + row.Description;
                    //     console.log("searchValue===>", searchValue);
                    //     if (searchValue.toLowerCase().indexOf(searchKey.toLowerCase()) > -1) {
                    //         console.log("row.storeId====>", row.storeId);
                    //         productArray = row.storeId
                    //         storeIds.push(productArray)
                    //         return storeIds
                    //     } else {
                    //         storeIds = []
                    //         return storeIds
                    //     }
                    // })


                    // element.forEach(product => {
                    //     var el = product.val()
                    //     row = {
                    //         'Description': el.Description,
                    //         'Tag': el.Tag,
                    //         'priceValue': el.priceValue,
                    //         'productName': el.productName,
                    //         'storeId': el.storeId
                    //     }
                    //     productArray = row
                    //     console.log("productArray====>", productArray);
                    // })

                    for (var i = 0; i < elementArray.length; i++) {
                        console.log(i);
                        var el = elementArray[i]
                        console.log("el=====+++++>", el);
                        row = {
                            'Description': el.Description,
                            'Tag': el.Tag,
                            'priceValue': el.priceValue,
                            'productName': el.productName,
                            'storeId': el.storeId
                        }
                        var searchValue = row.productName + row.Tag + row.Description;
                        console.log("searchValue===>", searchValue);
                        if (searchValue.toLowerCase().indexOf(searchKey.toLowerCase()) > -1) {
                            console.log("row.storeId====>", row.storeId);
                            productArray = row.storeId
                            storeIds.push(productArray)
                            break
                        } else {
                            storeIds = []
                        }
                    }
                    if (storeIds.length !== 0) {
                        filtedStoreIds.push(storeIds)
                    }
                    console.log("filtedStoreIds=========>", filtedStoreIds);
                    setStoreData(productArray)
                    setFiltedStoreIds(filtedStoreIds)
                })

            })
    }, [searchModalShow])

    const modalHandler = () => {
        setModalShow(true)
    }
    const searchModalPress = () => {
        setSearchModalShow(true)
    }

    const _onSelect = (option) => {
        setFilterValut(option.value)
    }

    return (
        <div>
            <LocationSettingModal show={modalShow} onHide={() => setModalShow(false)} />
            <SearchModal show={searchModalShow} onHide={() => setSearchModalShow(false)} />
            <Navbar modalPress={modalHandler} searchModalPress={searchModalPress} />
            <div style={{ marginTop: 100, width: '100%' }}>
                <div className="back-cont"><GoBackButton /></div>
                <div className="searchKey">
                    <p style={{ fontSize: 20 }}>
                        {`Your results for: "${searchKey}"`}
                    </p>
                </div>
                <div className="filter-drop-area">
                    <Dropdown options={options}
                        onChange={(val) => _onSelect(val)}
                        value={filterValue}
                        placeholder="Filter"
                        arrowClosed={<img src={arrow} alt="arrow" className="arrow-closed4" />}
                        arrowOpen={<img src={arrow} alt="arrow" className="arrow-opened4" />}
                        className="filter-dropdown-body"
                    />
                </div>
            </div>
            <div className="filter-items">
                {filtedStoreIds !== null && filtedStoreIds[0] != null && filtedStoreIds[0].length !== 0 ? filtedStoreIds.map(el => (<SearchResultProduct key={el} searchKey={searchKey} filterValue={filterValue} storeId={el} />))
                    :
                    <div className="emptyFilter">
                        <p className="emptyEearText">
                            Sorry, we can't find an item under that search term
                        </p>
                    </div>
                }
                {/* <Footer /> */}
            </div>
        </div>
    )
}

export default SearchResultScreen