import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link, useHistory } from 'react-router-dom'

const BlogDetailCard = (props) => {

    let history = useHistory();

    const blogdetail = () => {
        console.log("props.data.id===>", props.data.id);
        history.push(`/blogdetail/${props.data.id}`)
        // history.push({
        //     pathname: '/blogdetail',
        //     state: props.data.id
        // })
    }

    return (
        <div className="blogdetail-card" onClick={blogdetail}>
            <img src={props.data.img} alt="blog-img" />
            <div className="blog-card-info">
                <div className="blog-card-content">
                    {/* <span className="blog-tag">{category}</span> */}
                    <h3 className="blog-title">{props.data.name}</h3>
                </div>

                <button onClick={blogdetail} className="blog-btn"><FaArrowRight /></button>

            </div>
        </div>
    )
}

export default BlogDetailCard
