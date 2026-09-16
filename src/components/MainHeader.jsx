//import NavLink e useLocation
import { NavLink, useLocation } from "react-router-dom"
//importo searchBar
import SearchBar from "./SearchBar"
//import useGlobal per accedere al contesto globale
import { useGlobal } from "../context/GlobalContext";
import { useState } from "react";

function MainHeader() {

    //importiamo gli elementi che ci servono dal contesto globale
    const { onlyDiscounted, setOnlyDiscounted, cartItemCount, wishlistItemCount } = useGlobal();

    //uso useLocation per ottenere informazioni sulla posizione attuale dell'utente
    const location = useLocation();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="header-custom">
            <nav className="navbar navbar-expand-lg navbar-light px-4 py-3">
                <div className="container-fluid">
                    {/*<!-- Brand -->*/}
                    <a className="navbar-brand fw-bold fs-4 d-flex align-items-center" href="/">
                        <span className="text-success me-2">🍃</span>
                        Sapori d'Italia
                    </a>

                    {/*<!-- Toggler/collapsible Button -->*/}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/*<!-- Navbar links -->*/}
                    <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`} id="navbarNav">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink
                                    className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                                    to={"/"}
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={`nav-link ${location.pathname === "/wishlist" ? "active" : ""}`}
                                    to={"/wishlist"}
                                >
                                    Lista dei desideri
                                    {wishlistItemCount > 0 && (
                                        <span className="badge bg-danger rounded-pill ms-1">
                                            {wishlistItemCount}
                                        </span>
                                    )}
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={`nav-link ${location.pathname === "/cart" ? "active" : ""}`}
                                    to={"/cart"}
                                >
                                    Carrello
                                    {cartItemCount > 0 && (
                                        <span className="badge bg-danger rounded-pill ms-1">
                                            {cartItemCount}
                                        </span>
                                    )}
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/*<!-- Search and discount section -->*/}
                    <div className="d-none d-lg-flex align-items-center ms-4">
                        {(location.pathname === "/" || location.pathname.startsWith("/search")) && (
                            <div className="d-flex align-items-center gap-3">
                                <button
                                    className="btn btn-outline-success me-2"
                                    onClick={() => setOnlyDiscounted(prev => !prev)}>
                                    {onlyDiscounted ? "Mostra tutti" : "Prodotti in promozione"}
                                </button>
                                <SearchBar />
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default MainHeader