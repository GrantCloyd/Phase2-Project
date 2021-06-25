import Header from "./Components/Header"
import LandingPage from "./Components/LandingPage"
import Footer from "./Components/Footer"
import DiscoverPage from "./Components/DiscoverPage"
import DiscoverPageSearch from "./Components/DiscoverPageSearch"
import FavoritesPage from "./Components/FavoritesPage"
import ShowPage from "./Components/ShowPage"
import { Route, Switch } from "react-router-dom"
import { ContextProvider } from "./context/Context"
import { useState, useEffect } from "react"

function App() {
   const [viewed, setViewed] = useState([]);

   useEffect(() => {

      localStorage.setItem("viewed", JSON.stringify([]))
   }, [])

   return (
      <div className="App">
         <Header />
         <Switch>
            <ContextProvider>
               <Route exact path="/" component={() => <LandingPage viewed={viewed} />} />
               <Route exact path="/discover" component={DiscoverPage} />
               <Route exact path="/discover/search/:term" component={DiscoverPageSearch} />
               <Route exact path="/show/:id" component={() => <ShowPage setViewed={setViewed} />} />
               <Route exact path="/error/404" component={() => <h2>404: Page Not Found</h2>} />
               <Route exact path="/favorites" component={FavoritesPage} />
            </ContextProvider>
         </Switch>
         <Footer />
      </div>
   )
}

export default App
