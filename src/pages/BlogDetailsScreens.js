import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Footer from '../components/Footer'
import BlogDetail from '../components/BlogDetail'
import Navbar from '../components/Navbar'
import DispensaryNavbar from '../components/DispensaryNavbar'
// Firebase Integration Module
import { database } from '../config/firebase'

const BlogDetailScreen = (props) => {
    let history = useHistory()
    const [username, setUsername] = useState('')
    const [blogDetailData, setBlogDetailData] = useState('')
    const [num, setNum] = useState(0);

    let blogId = props.match.params.id
    useEffect(() => {
        window.scrollTo(0, 0);
        console.log("blogId============>", blogId);
        database
            .ref(`Blogs/${blogId}`)
            .on("value", async (snapshot) => {
                if (snapshot.val() !== "" && snapshot.val() !== null && snapshot.val() !== undefined) {
                    console.log("snapshot.val=====>", snapshot.val())
                    let el = snapshot.val()
                    var row
                    row = {
                        'image': el.blogImage,
                        'id': el.id,
                        'title': el.title,
                        'content': el.content,
                    }
                    console.log(row);
                    setBlogDetailData(row)
                }
            })
    }, [props.match.params.id])

    // useEffect(() => {

    //     var today = new Date()
    //     var day = today.getDay()
    //     // Fetching store data
    //     database
    //         .ref("user")
    //         .on("value", async (snapshot) => {
    //             var data = []
    //             var row = {}
    //             snapshot.forEach(element => {
    //                 if (element.val().hasOwnProperty('dispensary')) {
    //                     let el = element.val().dispensary
    //                     row = {
    //                         id: element.key,
    //                         store: el.storeName,
    //                         ImageUrl: el.profileimage,
    //                         usertype: el.userType,
    //                         startTime: el.storeHours[day].startTime,
    //                         endTime: el.storeHours[day].endTime,
    //                         openStatus: el.storeHours[day].openStatus,
    //                         storeName: el.storeName
    //                     }
    //                     data.push(row)
    //                 }
    //             });

    //         })

    //     // checking login status
    //     if (localStorage.getItem('loggedIn') === 'true') {
    //         console.log("usertype+++++++++", localStorage.getItem('usertype'));
    //         let userId = localStorage.getItem('userUid')
    //         let usertype = localStorage.getItem('usertype')
    //         if (localStorage.getItem('usertype') === "dispensary") {
    //             database
    //                 .ref('user/' + userId + '/' + usertype)
    //                 .once("value", async (snapshot) => {
    //                     let user_data = {
    //                         firstName: snapshot.val().fristName,
    //                         lastName: snapshot.val().lastName,
    //                         profileimage: snapshot.val().profileimage,
    //                         storeName: snapshot.val().storeName,
    //                     };
    //                     localStorage.setItem('url', user_data.profileimage)
    //                     localStorage.setItem('storeName', user_data.storeName)
    //                 })
    //         } else if (localStorage.getItem('usertype') === "driver") {
    //             database
    //                 .ref('user/' + userId + '/' + usertype)
    //                 .once("value", async (snapshot) => {
    //                     let user_data = {
    //                         firstName: snapshot.val().fristName,
    //                         lastName: snapshot.val().lastName,
    //                         profileimage: snapshot.val().profileimage,
    //                     };
    //                     localStorage.setItem('url', user_data.profileimage)
    //                     localStorage.setItem('username', user_data.firstName + ' ' + user_data.lastName.substr(0, 1))
    //                     setUsername(user_data.firstName + ' ' + user_data.lastName.substr(0, 1))
    //                 })
    //         } else if (localStorage.getItem('usertype') === "consumer") {
    //             database
    //                 .ref('user/' + userId + '/' + usertype)
    //                 .once("value", async (snapshot) => {
    //                     let user_data = {
    //                         firstName: snapshot.val().fristName,
    //                         lastName: snapshot.val().lastName,
    //                         profileimage: snapshot.val().profileimage,
    //                     };
    //                     localStorage.setItem('url', user_data.profileimage)
    //                     localStorage.setItem('username', user_data.firstName + ' ' + user_data.lastName.substr(0, 1))
    //                     setUsername(user_data.firstName + ' ' + user_data.lastName.substr(0, 1))
    //                 })
    //         }
    //         // Fetching userinfo(username, profile image)
    //     } else {
    //         history.push('/')
    //     }
    // }, [])


    // useEffect(() => {
    //     console.log('This is Navbar loggedIn=>', localStorage.getItem('loggedIn'))
    //     if (localStorage.getItem('dropAddress') !== "" && localStorage.getItem('dropAddress') !== null && localStorage.getItem('dropAddress') !== undefined)
    //         setDropAddress(localStorage.getItem('dropAddress'))
    // }, [localStorage.getItem('dropAddress')])


    return (
        <>
             {localStorage.getItem('loggedIn') === 'true'? localStorage.getItem('usertype') === "consumer" ? <Navbar /> : <DispensaryNavbar />:<Navbar />}
            <BlogDetail blog={blogDetailData} blogId={blogId} />
            <Footer />
        </>
    )
}

export default BlogDetailScreen
