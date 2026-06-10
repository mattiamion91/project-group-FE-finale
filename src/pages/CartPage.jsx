//import useGlobal per accedere al contesto globale
import { useGlobal } from "../context/GlobalContext";

//import Link per navigazione
import { Link } from "react-router-dom";

//import useEffect e useState
import { useEffect } from "react";

function CartPage() {

    //importiamo gli elementi che ci servono dal contesto globale
    const { cart, removeFromCart, addToCart, shippingPrice, fetchShipping, getProductPricing } = useGlobal();

    // calcoliamo il totale usando il prezzo finale
    const cartTotal = cart.reduce((sum, p) => {
        const { finalPrice } = getProductPricing(p);
        return sum + finalPrice * p.quantity;
    }, 0);

    //effetto per calcolare la spedizione ogni volta che il carrello cambia
    useEffect(() => {
        if (cart.length > 0) {
            //chiamiamo la funzione fetchShipping dal contesto, passando i prodotti del carrello
            fetchShipping(cart);
        }
        //se il carrello è vuoto, shippingPrice verrà automaticamente settato a 0 dentro fetchShipping
    }, [cart, fetchShipping]);

    return (
        <main
            className="cart-main"
        >
            <h1>Carrello</h1>
            <div className="cart-container">
                <div className="cart-products-container">
                    {cart.length === 0 && <p>Il carrello è vuoto.</p>}

                    {cart.map(product => {
                        const { finalPrice, price, discount, isOnSale } = getProductPricing(product);

                        return (
                            <div className="cart-product" key={product.id}>
                                <h3>{product.name}</h3>
                                <div className="cart-product-container">
                                    <div className="cart-product-container-element">
                                        <img src={product.image} alt={product.name} className="cart-img" />
                                    </div>
                                    <div className="cart-product-container-element">
                                        <p>Quantità: {product.quantity}</p>
                                        {isOnSale ? (
                                            <p>
                                                Prezzo unitario: <span style={{ textDecoration: "line-through" }}>{price.toFixed(2)} €</span>{" "}
                                                <span style={{ color: "red" }}>{finalPrice.toFixed(2)} €</span>
                                            </p>
                                        ) : (
                                            <p>Prezzo unitario: {price.toFixed(2)} €</p>
                                        )}
                                    </div>
                                    <div className="cart-button-container">

                                        <button
                                            className="cart-button"
                                            onClick={() => removeFromCart(product.id)}>
                                            -
                                        </button>
                                        <button
                                            className="cart-button"
                                            onClick={() => addToCart(product)}>
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="cart-price-container">
                    <div className="cart-price-border">
                        <h2 className="cart-price-text">
                            Totale carrello: {cartTotal.toFixed(2)} €
                        </h2>

                        <h2 className="cart-price-text">
                            Spedizione: {shippingPrice === 0 ? "Gratis" : `€${shippingPrice.toFixed(2)}`}
                        </h2>

                        <h2 className="cart-price-text">
                            Totale finale: €{(cartTotal + shippingPrice).toFixed(2)}
                        </h2>
                    </div>
                    <div className="cart-checkout-button-container">
                        <Link
                            className="cart-checkout-button"
                            to={"/checkout"}>
                            Vai al checkout
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default CartPage;