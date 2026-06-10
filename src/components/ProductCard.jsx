//import useGlobal per accedere al contesto globale
import { useGlobal } from "../context/GlobalContext";

//import Link per navigazione
import { Link } from "react-router-dom";

//import react icons
import { FaHeart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";


function ProductCard({ product, imageOverride, isGrid }) {

    //importiamo gli elementi che ci servono tramite la useContext
    const { getProductPricing, addToCart, addToWishlist, } = useGlobal();
    const { price, finalPrice, discount, isOnSale } = getProductPricing(product);

    const imageSrc = imageOverride
        ? imageOverride(product.image)
        : product.image;

    return (
        <div className="card-container">
            <div className="img-container">
                <img className="card-image" src={imageSrc} alt={product.name} />
            </div>

            <div className="text-container">
                <Link className="card-link" to={`/product/${product.slug}`}>
                    {product.name}
                </Link>

                <div className="card-weight-button-container">
                    <div
                        className="card-weight">
                        {product.weight} g
                    </div>
                    <div className="card-button-container">
                        <button
                            className="card-button"
                            onClick={() => addToCart(product)}>
                            <FaCartPlus />
                        </button>

                        <button
                            className="card-button"
                            onClick={() => addToWishlist(product)}>
                            <FaHeart />
                        </button>
                    </div>

                </div>

                <div className="card-price">

                    {isOnSale ? (
                        <div className="price">
                            <span
                                className="original-price"
                                style={{ textDecoration: "line-through", color: "#999" }}
                            >
                                €{price.toFixed(2)}
                            </span>
                            <span
                                className="final-price"
                                style={{ marginLeft: "8px", color: "red" }}
                            >
                                €{finalPrice.toFixed(2)}
                            </span>
                            <span
                                style={{ marginLeft: "8px" }}
                                className="badge-sale">-{discount}%</span>
                        </div>
                    ) : (
                        <div className="price">€{price.toFixed(2)}</div>
                    )}
                </div>
            </div>
        </div>

    );
}

export default ProductCard;