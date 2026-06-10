//import useGlobal per accedere al contesto globale
import { useGlobal } from "../context/GlobalContext";

//import Link per navigazione
import { Link } from "react-router-dom";

//import useEffect e useState
import { useEffect } from "react";

function WishlistPage() {

    //importiamo gli elementi che ci servono tramite la useContext
    const { addToCart, removeFromWishlist, wishlist, getProductPricing } = useGlobal();

    return (
        <main>
            <div className="wishlist-container">
                <h2>Lista dei desideri</h2>

                {wishlist.length === 0 && <p>La tua lista dei desideri è vuota.</p>}

                {wishlist.map(product => {
                    // calcoliamo i prezzi aggiornati
                    const { price, finalPrice, discount, isOnSale } = getProductPricing(product);

                    return (
                        <div
                            className="wishlist-card-container"
                            key={product.id}
                        >
                            <h3>{product.name}</h3>
                            <div className="wishlist-card">
                                <div className="wishlist-image-container">
                                    <img
                                        className="wishlist-image"
                                        src={product.image}
                                        alt={product.name}
                                    />
                                </div>
                                <div className="wishlist-text-container">
                                    {isOnSale ? (
                                        <h3>
                                            <span style={{ textDecoration: 'line-through', color: '#999' }}>
                                                €{price.toFixed(2)}
                                            </span>{' '}
                                            <span style={{ color: 'red' }}>
                                                €{finalPrice.toFixed(2)}
                                            </span> / {product.weight}g
                                        </h3>
                                    ) : (
                                        <h3>€{price.toFixed(2)} / {product.weight}g</h3>
                                    )}
                                    <h6>{product.descriptions}</h6>
                                </div>

                                <div className="wishlist-button-container">
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="wishlist-add-cart-button"
                                    >
                                        Aggiungi al carrello
                                    </button>

                                    <button
                                        className="remove-wishlist-button"
                                        onClick={() => removeFromWishlist(product.id)}
                                    >
                                        Rimuovi dalla lista desideri
                                    </button>

                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </main>
    )
}

export default WishlistPage;