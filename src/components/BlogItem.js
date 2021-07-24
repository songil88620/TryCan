import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link, useHistory } from 'react-router-dom'

const BlogItem = (props) => {
    let history = useHistory();

    const blogdetail = () => {
        history.push(`/blogdetail/${props.data.id}`)
    }
    return (
        <div className="blog-item" onClick={blogdetail}>
            <h2 style={{ fontSize: 18, color: '#50586B', marginLeft: 20, marginBottom: 50 }}>{props.data.name}</h2>
            {/* <div style={{ marginTop: 15, marginLeft: 20, marginBottom: 15 }}>
                <h2 style={{ fontSize: 12, color: '#98959C' }}>by {props.auth} | {props.publishDate}</h2>
            </div> */}
            {/* <h2 style={{ fontSize: 18, color: '#50586B', marginLeft: 20, marginTop: 20 }}>{props.origin}</h2> */}
            <div style={{ marginTop: 15,marginBottom: 15 }}>
                <img src={props.data.img} alt="blog-img" />
                {/* <h2 style={{ fontSize: 12, color: '#98959C' }}>{props.data.content}</h2> */}
                {/* <h2 style={{ fontSize: 12, color: '#98959C' }}>{((props.data.content.toString()).length > 340) ?
                (((props.data.content.toString()).substring(0, 337)) + '...') :
                props.data.content.toString()}</h2> */}
            </div>
        </div>
    )
}

export default BlogItem