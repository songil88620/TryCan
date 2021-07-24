import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import { useHistory } from 'react-router-dom'
import { database, storage } from '../config/firebase'

import { Editor } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertFromRaw, EditorState } from 'draft-js';

import BlogDetailCard from './BlogDetailCard'

function OrderConfirmWrapper(props) {

    let history = useHistory()
    let blogId = props.blogId

    const [content, setContenxt] = useState("");

    const [blogs, setBlogs] = useState([]);
    const [url, setUrl] = useState("");
    const [title, setTitle] = useState("");
    const [convertedState, setConvertedState] = useState("")

    useEffect(() => {

        database
            .ref(`Blogs/${blogId}`)
            .on("value", async (snapshot) => {
                console.log("snapshot.val=====>", snapshot.val())
                let el = snapshot.val()
                var row
                if (snapshot.val() !== "" && snapshot.val() !== null && snapshot.val() !== undefined) {
                    row = {
                        'image': el.blogImage,
                        'id': el.id,
                        'title': el.title,
                        'content': el.content,
                    }
                    setUrl(row.image)
                    setTitle(row.title)
                    row.content.entityMap = {};
                    const convertedState = convertFromRaw(row.content)
                    const editorState = EditorState.createWithContent(convertedState);
                    setContenxt(editorState)
                    setConvertedState(convertedState)
                } else{
                    history.push('/blog')
                }
            })

        database
            .ref('Blogs')
            .on("value", async (snapshot) => {
                var blogData = []
                console.log("snapshot.val=====>", snapshot.val())
                if (snapshot.val() !== "" && snapshot.val() !== null && snapshot.val() !== undefined) {
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
                }
            })
    }, [blogId])

    const contentChange = (event) => {
        console.log(event);
        setContenxt(event);
    };
    const onContentStateChange = (even) => {
        setConvertedState(even)
        // setContenxt(even);
    }

    return (
        <div className="blog-list-wrapper">
            <div className="blog-cont-wrapper">
                <div>
                    <img src={url} alt="blog-img" className="blogmainImage" />
                </div>
                <div className="order-cont" id="orderHistory" style={{ marginTop: 20 }}>
                    <h2 style={{ fontSize: 18, marginTop: 20 }}>{title}</h2>
                    {/* <textarea value={props.blog.content} style={{ width: "100%", height: 500, border: 0, marginTop: 20 }} /> */}
                    <Editor
                        readOnly
                        toolbarHidden
                        editorState={content}
                        // initialContentState={content}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={contentChange}
                        onContentStateChange={onContentStateChange}
                    />
                </div>
            </div>
            <div className="blog-detail-list">
                <div className="my-container">
                    <div className="blog-wrapper blogscrollable" id="blog">
                        <div className="blog-list">
                            {blogs.map(el => (<BlogDetailCard key={el.id} data={el} />))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderConfirmWrapper