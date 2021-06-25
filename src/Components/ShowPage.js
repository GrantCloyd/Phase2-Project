import React, { useState, useEffect, useContext } from "react"
import { useParams, useHistory } from "react-router-dom"
import Review from "./Review"
import { Context } from "../context/Context"
import { nanoid } from "nanoid"
import { Button, Input, InputLabel, TextField, FormControl } from "@material-ui/core"

function ShowPage({ setViewed }) {
   const initialShow = {
      name: "",
      image: "",
      rating: "",
      runtime: "",
      summary: "",
      genres: [],
   };

   const initialReview = {
      rating: "0",
      reviewTitle: "",
      comment: "",
   };

   const { handleFavorite, favorites } = useContext(Context);

   const [reviews, setReviews] = useState([]);

   const [userReview, setUserReview] = useState(initialReview);

   let reviewsArray = "";

   if (reviews) {
      reviewsArray = reviews.map(review => {
         return <Review key={review.id} {...review} />
      })
   };

   const [show, setShow] = useState(initialShow);

   const showId = useParams().id;

   const history = useHistory();

   const handleBackButton = () => {
      history.goBack();
   };

   const handleViewed = () => {
      let viewedHistory = [...JSON.parse(localStorage.getItem("viewed"))]  ;

      if (show !== initialShow && (viewedHistory.length === 0 || viewedHistory.find(historyItem => historyItem.id === show.id) === undefined)) {
         if (viewedHistory.length >= 3) {
            viewedHistory.shift();
         }
         viewedHistory.push(show);
         setViewed(viewedHistory)
         localStorage.setItem("viewed", JSON.stringify(viewedHistory));
      }
   };

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
   }, [showId]);

   useEffect(() => {
      fetch(`http://localhost:3001/reviews/${showId}`)
         .then(res => res.json())
         .then(data => {
            setReviews(data.userReviews)
         })
   }, [showId, setReviews])

   useEffect(() => handleViewed(), [show]);

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

      setUserReview(initialReview)
   }

   let { name, image, rating, runtime, summary, genres } = show

   const genresArray = <h4>{genres.join(", ")}</h4>

   let favoriteStatus = favorites.find(favorite => favorite.id === show.id) === undefined

   let userReviewsArr

   if (reviews !== undefined && reviews.length !== 0) {
      userReviewsArr = (
         reviews.map(review => review.rating).reduce((a, b) => Number(a) + Number(b)) /
         reviews.length
      ).toFixed(1)
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
               Back
            </Button>
            <br />
            <br />
            <img
               className="showImage"
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
                  ⭐️ &nbsp;{rating.average}
               </p>
            ) : null}
            <p>
               {userReviewsArr ? <strong>User Rating:</strong> : null}{" "}
               {userReviewsArr ? "⭐️  " + userReviewsArr : "No User Ratings"}{" "}
            </p>
            {genresArray}
            <h4>{runtime + " minutes"}</h4>
            <div className="summary" dangerouslySetInnerHTML={{ __html: summary }} />
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
         <hr />
         <h4>Leave review</h4>
         <form id="review" onSubmit={handleSubmitReview}>
            <FormControl>
               <InputLabel>Rating</InputLabel>
               <Input
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
                  name="reviewTitle"
                  value={userReview.reviewTitle}
                  onChange={e => setUserReview({ ...userReview, reviewTitle: e.target.value })}
                  variant="outlined"
                  id="reviewTitle"
                  label="Enter Title"
               />
               <br></br>
               <TextField
                  name="comment"
                  value={userReview.comment}
                  onChange={e => setUserReview({ ...userReview, comment: e.target.value })}
                  variant="outlined"
                  id="comment"
                  label="Enter Review"
                  multiline
                  rows={4}
               />
               <br />
               <Button onClick={e => handleSubmitReview(e)} variant="contained" color="primary">
                  Submit
               </Button>
            </FormControl>
         </form>
      </div>
   )
}

export default ShowPage;