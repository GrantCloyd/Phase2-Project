import React from 'react'

export default function Thumbnail({ item: { _embedded: { show: { id, name, image: { medium }, genres, rating: { average }, runtime, summary } } } }) {
    return (
        <div>
            <img src={medium} />
            <h4>{name}</h4>
            {average ? <p>{average}</p> : null}
        </div>
    )
}
