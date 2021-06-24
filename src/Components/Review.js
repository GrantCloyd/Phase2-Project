import React from 'react'

export default function Review({ rating, comment, reviewTitle }) {
    return (
        <div className="userReviews">
            <h4 className="titleRating">⭐️ &nbsp;{rating}</h4>  
            <span className="span"> 
                <h4>{reviewTitle}</h4>
                <p>{comment}</p>
            </span>
        </div>
    )
}
