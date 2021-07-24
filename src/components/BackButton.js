import React from 'react'
import {BsArrowLeft} from 'react-icons/bs'
import {useHistory, Link} from "react-router-dom";
export default function BackButton({...props}) {
    let history = useHistory();
    const goBack = () => {
        history.goBack();
    }
    return (
        <div>
            {/* <a href={`/${props.url}`} onChange={goBack} className="backbutton"><BsArrowLeft size={40} color="white"/></a> */}
            <Link to={`/${props.url}`} onChange={goBack} className="backbutton"><BsArrowLeft size={40} color="white"/></Link>
        </div>
    )
}
