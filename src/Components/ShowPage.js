import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

export default function ShowPage() {
    const initialShow = {
        name: "",
        image: "",
        rating: "",
        runtime: "",
        summary: "",
        genres: []
    }

    const [ show, setShow ] = useState(initialShow);

    const showId = useParams().id;
    
    let { name, image, rating, runtime, summary, genres } = show; 

    const genresArray = genres.map(genre => <p key={genre} >{genre}</p>)

    let page = <div><h2>404: Page Not Found</h2></div>;

    if (show !== null) {
        page = <div>
        <img
           alt={name}
           src={
              image !== null
                 ? image.medium
                 : "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg"
           }
        />
        <h4>{name}</h4>
        {rating.average ? <p>{rating.average}</p> : null}
        {genresArray}
        <p>{runtime + " minutes"}</p>
        <div dangerouslySetInnerHTML={{__html: summary}} />
    </div>;
    }

    useEffect(() => {
        fetch(`http://api.tvmaze.com/lookup/shows?thetvdb=${showId}`)
        .then(res => res.json())
        .then(data => setShow(data));
    }, [showId, setShow])

    return (
        <div>
            {page}
        </div>
    )
}
