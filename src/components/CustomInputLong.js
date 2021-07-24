import React from 'react'
import { AiOutlineMail } from 'react-icons/ai'
import { BsLock } from 'react-icons/bs'
import { AiOutlineUser } from 'react-icons/ai'

export default function CustomInputLong({ ...props }) {
    return (
        <div className={props.half ? 'inputField-half' : props.third ? 'inputField-third' : 'inputFieldLong'}>
            <input
                type={props.type}
                placeholder={props.placeholder}
                className={props.half ? 'input-half' : props.third ? 'input-third' : 'input-el'}
                value={props.val ? props.val : ""}
                onChange={props.onChange}
                required
                maxLength={props.maxLength}
                style={{ backgroundColor:'white', borderWidth:0.5, borderColor:'gray' }}
            />
            {
                props.src ?
                    <img src={props.src} alt="" className={props.third ? "iconPos-third" : "iconPos"} ></img>
                    :
                    props.iconType === 'email'
                        ? <AiOutlineMail color="#61D273" size={30} className={props.third ? "iconPos-third" : "iconPos"} />
                        : props.iconType === 'password'
                            ? <BsLock color="#61D273" size={30} className={props.third ? "iconPos-third" : "iconPos"} />
                            : props.iconType === 'user'
                                ? <AiOutlineUser color="#61D273" size={30} className={props.third ? "iconPos-third" : "iconPos"} />
                                : <AiOutlineUser color="#61D273" size={30} className={props.third ? "iconPos-third" : "iconPos"} />
            }
        </div>
    )
}
