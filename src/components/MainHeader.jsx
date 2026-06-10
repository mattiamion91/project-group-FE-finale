//import NavLink e useLocation
import { NavLink, useLocation } from "react-router-dom"
//importo searchBar
import SearchBar from "./SearchBar"
//import useGlobal per accedere al contesto globale
import { useGlobal } from "../context/GlobalContext";

function MainHeader() {

    //importiamo gli elementi che ci servono dal contesto globale
    const { onlyDiscounted, setOnlyDiscounted, cartItemCount, wishlistItemCount } = useGlobal();

    //uso useLocation per ottenere informazioni sulla posizione attuale dell'utente
    const location = useLocation();

    return (
        <header>
            <ul className="header-link-container">
                <li>
                    <NavLink
                        className="header-link"
                        to={"/"}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className="header-link"
                        to={"/wishlist"}>
                        Lista dei desideri
                        {wishlistItemCount > 0 && (
                            <span className="header-badge">{wishlistItemCount}</span>
                        )}
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className="header-link"
                        to={"/cart"}>
                        Carrello
                        {cartItemCount > 0 && (
                            <span className="header-badge">{cartItemCount}</span>
                        )}
                    </NavLink>
                </li>
            </ul>

            {(location.pathname === "/" || location.pathname.startsWith("/search")) && (
                <div className="header-serch-container">
                    <button
                        className="header-discount-button"
                        onClick={() => setOnlyDiscounted(prev => !prev)}>
                        {onlyDiscounted ? "Mostra tutti" : "Prodotti in promozione"}
                    </button>
                    <SearchBar />
                </div>
            )}
        </header>
    )
}

export default MainHeader