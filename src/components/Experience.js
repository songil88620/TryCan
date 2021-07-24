import React, {useState} from 'react'
import StarRatings from 'react-star-ratings'
import {useHistory} from "react-router-dom";
const Experience = () => {
    let history = useHistory();
    const Shop = () => {
        history.push("/storeonline");
    }
    const [buttons,
        setButtons] = useState([false, false, false, false]);
    const [experience,
        setExperience] = useState([false, false, false]);
    const [rating,
        setRating] = useState(4);
    const changeRating = (newRating) => {
        setRating(newRating)
    }
    const activeRatingButton = e => {
        let activeButton = [false, false, false, false]
        activeButton[e] = true;
        setButtons(activeButton);
    }
    const activeExperienceButton = e => {
        let activeButton = [false, false, false]
        activeButton[e] = true;
        setExperience(activeButton);
    }
    return (
        <div className="experience-cont">
            <div className="order-experience">
                <h3>Rate your Experience
                </h3>
                <h2>$74.81</h2>
                <h3>Great</h3>
                <div className="star-rating"><StarRatings
                    rating={rating}
                    starRatedColor="#f5a623"
                    starEmptyColor="#c6c6c6"
                    changeRating={changeRating}
                    starHoverColor="#f5a623"
                    numberOfStars={5}
                    name='rating'/>
                </div>
                <h3>Leave Tip?</h3>
                <div className="experience-tip">
                    <button
                        onClick={() => activeRatingButton(0)}
                        className={buttons[0] ? ' active-rating-button':""}>10%</button>
                    <button
                        onClick={() => activeRatingButton(1)}
                        className={buttons[1] ? ' active-rating-button':""}>15%</button>
                    <button
                        onClick={() => activeRatingButton(2)}
                        className={buttons[2] ? ' active-rating-button':""}>20%</button>
                    <button
                        onClick={() => activeRatingButton(3)}
                        className={buttons[3] ? ' active-rating-button':""}>Custom</button>
                </div>
                <h3>What could be better?</h3>
                <div className="experience-better">
                    <button
                        onClick={() => activeExperienceButton(0)}
                        className={experience[0] ? ' active-rating-button' : ''}>User experience
                    </button>
                    <button
                        onClick={() => activeExperienceButton(1)}
                        className={experience[1] ? ' active-rating-button' : ''}>Packaging</button>
                    <button
                        onClick={() => activeExperienceButton(2)}
                        className={experience[2] ? ' active-rating-button': ''}>Timing</button>
                </div>
                <div className="experience-comment">
                    <label>Leave comment</label>
                    <textarea/>
                </div>
                <div className="experience-submit">
                    <button onClick={Shop}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Experience;