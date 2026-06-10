//importo hook
import { useState } from "react"
import { useNavigate } from "react-router-dom";

function SearchBar() {
    //dichiaro navigazione
    const navigate = useNavigate()
    //imposto var di stato
    const [searched, setSearched] = useState("")

    //funzione per gestire il submit
    const handleSubmit = (e) => {
        e.preventDefault(); //fermo il broswer dal ricaricare la pagina
        navigate(`/search?query=${searched}`); //usenavigate mi porta sulla rotta search e aggiunge la var di stato searched
        setSearched(""); //svuoto la var di stato per pulire il campo di input dopo la ricerca
    }

    return (
        <form
            onSubmit={handleSubmit}>
            <input
                type="text"
                value={searched}
                onChange={(e) => setSearched(e.target.value)} />
            <button
                className="search-button">
                cerca</button>
        </form>
    )
}

export default SearchBar