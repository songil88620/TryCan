import React, { useState, useEffect } from 'react'
import BlogItem from './BlogItem'

import { database } from '../config/firebase'


const ProfileInfo = () => {

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        var blogData = []
        database
            .ref('Blogs')
            .on("value", async (snapshot) => {
                console.log("snapshot.val=====>", snapshot.val())
                await snapshot.forEach((element) => {
                    let el = element.val()
                    var row
                    row = {
                        'img': el.blogImage,
                        'id': el.id,
                        'name': el.title,
                        'content': el.content,
                    }
                    console.log(row);
                    blogData.push(row)
                })
                setBlogs(blogData)
            })
    }, [])

    return (
        <div>
            <div className="profile-body-cont">
                <div className="profile-form-cont">
                    <div className="profile-form" style={{ marginBottom: 50 }}>
                        <h2 style={{ fontSize: 23, color: "#50586B", marginLeft:'10%' }}>Blog</h2>
                    </div>
                    <div>
                        {blogs.map(el => (<BlogItem key={el.id} data={el} />))}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProfileInfo