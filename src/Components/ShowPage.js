import React, { useState, useEffect, useContext} from "react"
import { useParams, useHistory } from "react-router-dom"
import Review from "./Review";
import { Context } from "../context/Context";

export default function ShowPage() {
   const initialShow = {
      name: "",
      image: "",
      rating: "",
      runtime: "",
      summary: "",
      genres: [],
   }

   const {handleFavorite, favorites} = useContext(Context)

   const [reviews, setReviews] = useState([]);

   const [userReview, setUserReview] = useState({
      rating: "0",
      comment: ""
   })

   let reviewsArray = "";

   if (reviews)  {
      reviewsArray = reviews.map(review => {
         return <Review key={review.id} {...review} />
      })
   }

   const history = useHistory()

   const handleBackButton = () => {
      history.push("/discover")
   }

   const [show, setShow] = useState(initialShow)

   const showId = useParams().id

   let { name, image, rating, runtime, summary, genres } = show
   let favoriteStatus = favorites.find(favorite => favorite.id === show.id) === undefined

   const genresArray = genres.map(genre => <p key={genre}>{genre}</p>)

   let page = (
      <div>
         <h2>404: Page Not Found</h2>
      </div>
   )

   if (show !== null) {
      page = (
         <div>
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
            <div dangerouslySetInnerHTML={{ __html: summary }} />
            <button onClick={() => handleFavorite(show)}>
               {favoriteStatus ? "✩ Favorite" : "✭ Remove"}
            </button>
            <button onClick={handleBackButton}> ⏪ Back</button>
         </div>
      )
   }

   useEffect(() => {
      fetch(`http://api.tvmaze.com/lookup/shows?thetvdb=${showId}`)
         .then(res => res.json())
         .then(data => {
            setShow(data)
         })
   }, [showId, setShow])
 
   useEffect(() => {
      fetch(`http://localhost:3001/reviews/${showId}`)
         .then(res => res.json())
         .then(data => {
            setReviews(data.userReviews)
         })
   }, [showId, setReviews])

   const [reviewId, setReviewId] = useState(reviews ? reviews.length + 1 : 1);

   function handleSubmitReview(e) {
      e.preventDefault();

      setReviewId(reviewId => reviewId + 1)

      let configObj = {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
            id: showId,
            userReviews: [
               {...userReview, id: reviewId}
            ]
         })
      }

      if (reviews) {
         const updatedReviews = {
            id: showId,
            userReviews: [
               ...reviews, 
               {...userReview, id: reviewId}
            ]
         }

         configObj = {
            method: "PATCH",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedReviews)
         }

         fetch(`http://localhost:3001/reviews/${showId}`, configObj)
         .then(res => res.json())
         .then(data => {
            setReviews(data.userReviews)
         })
      } else {
         fetch(`http://localhost:3001/reviews/`, configObj)
         .then(res => res.json())
         .then(data => {
            setReviews(data.userReviews)
         })
      }
   }

   return (
      <div>
         {page}
         <h3>User Reviews</h3>
         {reviewsArray}
         <h4>Leave review</h4>
         <form id="review" onSubmit={handleSubmitReview}>
            <input type="number" name="rating" min="0" max="10" value={userReview.rating} 
            onChange={e => setUserReview({...userReview, rating: e.target.value})}/>
         </form>
         <textarea name="comment" placeholder="Enter review here..." form="review" value={userReview.comment}
         onChange={e => setUserReview({...userReview, comment: e.target.value})}/>
         <br/>
         <button form="review">Submit</button>
      </div>
   )
}
