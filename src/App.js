import Header from "./Components/Header"
import LandingPage from "./Components/LandingPage"
import Footer from "./Components/Footer"
import DiscoverPage from "./Components/DiscoverPage"
import FavoritesPage from "./Components/FavoritesPage"

function App() {
   return (
      <div className="App">
         <Header />
         <LandingPage />
         <DiscoverPage />
         <FavoritesPage />
         <Footer />
      </div>
   )
}

export default App
