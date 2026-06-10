//import useGlobal
import { useGlobal } from "../context/GlobalContext";

//import Link 
import { Link } from "react-router-dom"

function ProductCardDetails({ product }) {

    //importiamo gli elementi che ci servono tramite la useContext
    const { addToCart, addToWishlist, getProductPricing } = useGlobal();

    //calcoliamo i prezzi aggiornati con eventuale sconto
    const { price, finalPrice, discount, isOnSale } = getProductPricing(product);

    return (
        <main>
            <div className="product-card">

                <div className="product-image">
                    <img src={product.image} alt={product.name} />
                </div>

                <div className="product-info">

                    <h2 className="product-title">
                        {product.name}
                    </h2>

                    <div className="product-price">
                        {isOnSale ? (
                            // se c'è sconto, mostriamo prezzo originale barrato e prezzo scontato
                            <>
                                <span style={{ textDecoration: 'line-through', color: '#999' }}>
                                    €{price.toFixed(2)}
                                </span>{' '}
                                <span style={{ color: 'red' }}>
                                    €{finalPrice.toFixed(2)}
                                </span>
                            </>
                        ) : (
                            // altrimenti mostriamo solo il prezzo normale
                            <>€{price.toFixed(2)}</>
                        )}
                    </div>

                    <div className="product-weight">
                        {product.weight} g
                    </div>

                    <p className="product-description">
                        {product.descriptions}
                    </p>

                    <div className="product-button-container">
                        <button
                            onClick={() => addToCart(product)}
                            className="wishlist-add-cart-button">
                            Aggiungi al carrello
                        </button>

                        <button
                            className="remove-wishlist-button"
                            onClick={() => addToWishlist(product)}>
                            Aggiungi alla lista desideri
                        </button>
                    </div>
                </div>


            </div>
        </main>
    )
}

export default ProductCardDetails;