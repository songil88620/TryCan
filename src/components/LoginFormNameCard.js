import React, {useState} from 'react'

const ProfileFormNameCard = (props) => {
    const [inputValue,setInputValue] = useState(props.text)
    const inputHandler = e => {
        setInputValue(e.target.value)
    }
    return (
        <div className="login-form-name-card">
            <img src={props.src}></img>
            <input onChange={inputHandler} className="date-input" value={inputValue} type={props.type} placeholder={props.placeholder}/>
        </div>
    )
}
export default ProfileFormNameCard;