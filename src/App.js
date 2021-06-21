import Header from "./Components/Header"
import LandingPage from "./Components/LandingPage"
import Footer from "./Components/Footer"
import DiscoverPage from "./Components/DiscoverPage"
import FavoritesPage from "./Components/FavoritesPage"
import { Route, Switch } from "react-router-dom"

function App() {
   return (
      <div className="App">
         <Header />
         <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/discover" component={DiscoverPage} />
            <Route path="/favorites" component={FavoritesPage} />
         </Switch>
         <Footer />
      </div>
   )
}

export default App
