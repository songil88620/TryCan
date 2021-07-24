import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Footer from '../components/Footer'
import BlogList from '../components/BlogList'
import Navbar from '../components/Navbar'
import DispensaryNavbar from '../components/DispensaryNavbar'
// Firebase Integration Module
import { database } from '../config/firebase'

const BlogScreen = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            {localStorage.getItem('loggedIn') === 'true' ? localStorage.getItem('usertype') === "consumer" ? <Navbar /> : <DispensaryNavbar /> : <Navbar />}

            <BlogList />
            <Footer />
        </>
    )
}

export default BlogScreen
