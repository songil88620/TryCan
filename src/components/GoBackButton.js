import React from 'react'
import {BsArrowLeft} from 'react-icons/bs'
import {useHistory} from "react-router-dom";
export default function GoBackButton(props) {
    let history = useHistory();
    const goBack = () => {
        if(props.login) {
            localStorage.clear();
            localStorage.setItem("ageFlag", "true");
            history.push("/")
        } else {
            history.goBack();
        }
    }
    return (
        <div>
            <a onClick={goBack} className="gobackbutton pointer"><BsArrowLeft size={40} color="white"/></a>
        </div>
    )
}
