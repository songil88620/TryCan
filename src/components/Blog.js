import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard'

import { database, storage } from '../config/firebase'

const Blog = () => {

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
        <section className="blog">
            <div className="my-container">
                <div className="blog-wrapper">
                    <h2 className="h2-heading">Blog</h2><br />
                    {/* <p className="p-text mb90">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo </p> */}
                    <div className="blog-list">
                        {blogs.map(el => (<BlogCard key={el.id} data={el} />))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Blog
