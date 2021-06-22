import Header from "./Components/Header"
import LandingPage from "./Components/LandingPage"
import Footer from "./Components/Footer"
import DiscoverPage from "./Components/DiscoverPage"
import FavoritesPage from "./Components/FavoritesPage"
import ShowPage from "./Components/ShowPage"
import { Route, Switch } from "react-router-dom"
import { useEffect, useState } from "react"

function App() {
   const [favorites, setFavorites] = useState([])

   useEffect(() => {
      fetch("http://localhost:3001/favorites")
         .then(r => r.json())
         .then(setFavorites)
   }, [])

   function handleFavorite(show) {
      if (favorites.find(favorite => favorite.id === show.id) === undefined) {
         const configObj = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(show),
         }

         fetch("http://localhost:3001/favorites", configObj)
            .then(r => r.json())
            .then(data => setFavorites([...favorites, data]))
      } else {
         fetch(`http://localhost:3001/favorites/${show.id}`, { method: "DELETE" }).then(() => {
            let deleteUpdate = [...favorites].filter(favorite => favorite.id !== show.id)
            setFavorites(deleteUpdate)
         })
      }
   }

   return (
      <div className="App">
         <Header />
         <Switch>
            <Route
               exact
               path="/"
               component={() => (
                  <LandingPage favorites={favorites} handleFavorite={handleFavorite} />
               )}
            />
            <Route
               exact
               path="/discover"
               component={() => (
                  <DiscoverPage favorites={favorites} handleFavorite={handleFavorite} />
               )}
            />
            <Route
               exact
               path="/show/:id"
               component={() => <ShowPage favorites={favorites} handleFavorite={handleFavorite} />}
            />
            <Route exact path="/error/404" component={() => <h2>404: Page Not Found</h2>} />
            <Route
               exact
               path="/favorites"
               component={() => (
                  <FavoritesPage favorites={favorites} handleFavorite={handleFavorite} />
               )}
            />
         </Switch>
         <Footer />
      </div>
   )
}

export default App
