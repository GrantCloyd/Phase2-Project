import React, {useState, useEffect} from "react"


const Context = React.createContext()
function ContextProvider ({children}){
    const [favorites, setFavorites] = useState([])
    
    useEffect(() => {
        fetch("http://localhost:3001/favorites")
           .then(r => r.json())
           .then(setFavorites)
     }, [])
    const handleFavorite = show => {
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
 return( 
     <Context.Provider value={{favorites, setFavorites, handleFavorite}}>
{children}
</Context.Provider>
 )
}



 export { ContextProvider, Context }