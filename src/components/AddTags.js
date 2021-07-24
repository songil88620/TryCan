import React, { useState } from 'react'

export default function AddTags(props) {

    return (
        <div className="addVariantArea">
            <div className="optionArea">
                <div className="optionNameArea">
                    <p className="optionNameLabel">Option Name</p>
                    <input className="optionName" placeholder="Please input" type="text" value={props.optionName} onChange={(e) => { props.OptionNameHandler(e.target.value, props.index) }} />
                </div>
                <div className="optionValueArea">
                    <p className="optionNameLabel">Option Values</p>
                    <div className="tags-input">
                        <ul id="tags">
                            {props.tags.map((tag, index) => (
                                <li key={index} className="tag">
                                    <span className='tag-title'>{tag}</span>
                                    <span className='tag-close-icon'
                                        onClick={() => props.removeTags(props.index, index)}
                                    >
                                        x
						            </span>
                                </li>
                            ))}
                        </ul>
                        <input
                            className="addTagInput"
                            type="text"
                            onKeyUp={event => event.key === "Enter" ? props.addTags(props.index, event) : null}
                            placeholder="Please input"
                        />
                    </div>
                </div>
                <span className='variant-close-icon'
                    onClick={() => {props.removeOption(props.index)}}
                >
                    x
				</span>
            </div>
        </div>
    )
}
