import Header from "./Components/Header"
import LandingPage from "./Components/LandingPage"
import Footer from "./Components/Footer"
import DiscoverPage from "./Components/DiscoverPage"
import FavoritesPage from "./Components/FavoritesPage"
import ShowPage from "./Components/ShowPage";
import { Route, Switch } from "react-router-dom"

function App() {
   return (
      <div className="App">
         <Header />
         <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/discover" component={DiscoverPage} />
            <Route exact path="/show/:id" component={ShowPage} />
            <Route exact path ="/error/404" component={() => <h2>404: Page Not Found</h2>} />
            <Route exact path="/favorites" component={FavoritesPage} />
         </Switch>
         <Footer />
      </div>
   )
}

export default App
