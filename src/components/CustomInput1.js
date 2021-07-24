import React from 'react'
import { AiOutlineMail } from 'react-icons/ai'
import { BsLock } from 'react-icons/bs'
import { AiOutlineUser } from 'react-icons/ai'

export default function CustomInput({ ...props }) {
    return (
        <div className={props.half ? 'inputField-half' : 'inputFieldLong'}>
            <input
            disabled={props.disabled}
                type={props.type}
                name={props.name}
                placeholder={props.placeholder}
                className={props.half ? 'input-half' : 'input-el'}
                value={props.val ? props.val : ""}
                onChange={props.onChange}
                required
                maxLength={props.maxLength}
                onKeyPress={props.onKeyPress}
                style={{ backgroundColor:'white', borderWidth:0.5, borderColor:'gray' }}
            />
            {
                props.src ?
                    <img src={props.src} alt="" className="iconPos" ></img>
                    :
                    props.iconType === 'email'
                        ? <AiOutlineMail color="#61D273" size={30} className="iconPos" />
                        : props.iconType === 'password'
                            ? <BsLock color="#61D273" size={30} className="iconPos" />
                            : props.iconType === 'user'
                                ? <AiOutlineUser color="#61D273" size={30} className="iconPos" />
                                : <AiOutlineUser color="#61D273" size={30} className="iconPos" />
            }
        </div>
    )
}
