import React from 'react'

function InputGroup(props) {
  return (
    <div className="normal-input">
      <h2>{props.desc}</h2>
      {
        props.textArea ?
          <textarea value={props.value} onChange={props.onChange} required placeholder={props.placeholder} defaultValue={props.val || ''} />
          :
          <input value={props.value} onChange={props.onChange} required type="text" placeholder={props.placeholder} defaultValue={props.val || ''} />
      }
    </div>
  )
}

export default InputGroup
