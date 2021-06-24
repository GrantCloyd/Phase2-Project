import React, { useState, useEffect, useContext } from "react"
import { useParams, useHistory } from "react-router-dom"
import Review from "./Review"
import { Context } from "../context/Context"
import { nanoid } from "nanoid"
import { Button, Input, InputLabel, TextField } from "@material-ui/core"

export default function ShowPage() {
   const initialShow = {
      name: "",
      image: "",
      rating: "",
      runtime: "",
      summary: "",
      genres: [],
   }

   const { handleFavorite, favorites } = useContext(Context)

   const [reviews, setReviews] = useState([])

   const [userReview, setUserReview] = useState({
      rating: "0",
      comment: "",
   })

   let reviewsArray = ""

   if (reviews) {
      reviewsArray = reviews.map(review => {
         return <Review key={review.id} {...review} />
      })
   }

   const [show, setShow] = useState(initialShow)

   const showId = useParams().id

   const history = useHistory()

   const handleBackButton = () => {
      history.push("/discover")
   }

   useEffect(() => {
      fetch(`http://api.tvmaze.com/lookup/shows?thetvdb=${showId}`)
         .then(res => res.json())
         .then(data => {
            if (data === null) {
               return fetch(`http://api.tvmaze.com/lookup/shows?imdb=${showId}`)
                  .then(info => info.json())
                  .then(output => {
                     if (output === null) {
                        return fetch(`http://api.tvmaze.com/lookup/shows?tvrage=${showId}`)
                           .then(detail => detail.json())
                           .then(d => setShow(d))
                     }

                     setShow(output)
                  })
            }

            if (data.externals.thetvdb.toString() !== showId) {
               return fetch(`http://api.tvmaze.com/lookup/shows?tvrage=${showId}`)
                  .then(detail => detail.json())
                  .then(d => setShow(d))
            }

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

   const handleSubmitReview = e => {
      e.preventDefault()

      let configObj = {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            id: showId,
            userReviews: [{ ...userReview, id: nanoid() }],
         }),
      }

      if (reviews) {
         const updatedReviews = {
            id: showId,
            userReviews: [...reviews, { ...userReview, id: nanoid() }],
         }

         configObj = {
            method: "PATCH",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedReviews),
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

   let { name, image, rating, runtime, summary, genres } = show

   const genresArray = genres.map(genre => <h4 key={genre}>{genre}</h4>)

   let favoriteStatus = favorites.find(favorite => favorite.id === show.id) === undefined

   let userReviewsArr

   if (reviews !== undefined && reviews.length !== 0) {
      userReviewsArr = (
         reviews.map(review => review.rating).reduce((a, b) => Number(a) + Number(b)) /
         reviews.length
      ).toFixed(1)
      console.log(userReviewsArr)
   }

   let page = (
      <div>
         <h2>404: Page Not Found</h2>
      </div>
   )

   if (show !== null) {
      page = (
         <div>
            <Button variant="contained" color="primary" onClick={handleBackButton}>
               {" "}
               ⏪ Back to Discover
            </Button>
            <br />
            <br />
            <img
               alt={name}
               src={
                  image !== null
                     ? image.medium
                     : "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg"
               }
            />
            <h3>{name}</h3>
            {rating.average ? (
               <p>
                  <strong>Critic Rating: </strong>
                  {rating.average} out of 10
               </p>
            ) : null}
            <p>
               {userReviewsArr ? <strong>User Rating:</strong> : null}{" "}
               {userReviewsArr ? userReviewsArr + " out of 10" : "No User Ratings"}{" "}
            </p>
            {genresArray}
            <h4>{runtime + " minutes"}</h4>
            <div dangerouslySetInnerHTML={{ __html: summary }} />
            <Button variant="contained" color="primary" onClick={() => handleFavorite(show)}>
               {favoriteStatus ? "♡ Favorite" : "♥ Remove"}
            </Button>
         </div>
      )
   }

   return (
      <div>
         {page}
         <h3>User Reviews</h3>
         {reviewsArray}
         <h4>Leave review</h4>
         <form id="review" onSubmit={handleSubmitReview}>
            <InputLabel htmlFor="rating">Rating</InputLabel>
            <Input
               InputProps={{ inputProps: { min: 0, max: 10 } }}
               variant="outlined"
               id="rating"
               label="Enter Rating"
               type="number"
               name="rating"
               min={0}
               max={10}
               value={userReview.rating}
               onChange={e => setUserReview({ ...userReview, rating: e.target.value })}
            />

            <br></br>
            <TextField
               name="comment"
               form="review"
               value={userReview.comment}
               onChange={e => setUserReview({ ...userReview, comment: e.target.value })}
               variant="outlined"
               id="outlined-multiline-static"
               label="Enter Review"
               multiline
               rows={4}
            />
         </form>

         <br />
         <Button variant="contained" color="primary" form="review">
            Submit
         </Button>
      </div>
   )
}
