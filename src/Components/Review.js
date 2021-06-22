import React from 'react'

export default function Review({ rating, comment }) {
    return (
        <div>
            <span>
                <h4>{rating}</h4>
                <p>{comment}</p>
            </span>
        </div>
    )
}
