//import axios
import axios from "axios";

//import useState e useEffect
import { useState, useEffect } from "react";

//import useGlobal
import { useGlobal } from "../context/GlobalContext";

//import Link di connessione rotte, useParams e useNavigate
import { Link, useParams, useNavigate } from "react-router-dom"

// import del component card prodotto
import ProductCardDetails from "../components/ProductCardDetails";

//import react icons
import { FaHeart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";


function ProductPage() {

    //importiamo gli elementi che ci servono tramite la useContext
    const { setIsLoading, endpointIndexProducts, getProductPricing, addToCart, addToWishlist } = useGlobal();

    //ricaviamo l'id dall'url di rotta
    const { id } = useParams();

    //salviamo un'istanza di useNavigate per poterlo poi utilizzare 
    const redirect = useNavigate();

    //creiamo una varibile di stato come un oggetto vuoto per i prodotti
    const [product, setProduct] = useState({});
    //creiamo una varibile di stato come un oggetto vuoto per i prodotti correlati
    const [relatedProducts, setRelatedProducts] = useState([]);

    //creiamo una funzione per gestire la chiamta axios alla rotta show
    function fetchProduct() {

        //facciamo in modo che all'avvio della chiamata la varibile di stato cambi in true e parta il Loader
        setIsLoading(true)

        axios.get(`${endpointIndexProducts}/slug/${id}`)
            .then(res => { setProduct(res.data) })
            .catch(err => {
                console.log(err);
                if (err.response && err.response.status === 404) {
                    redirect('/404');
                }
            })
            //facciamo in modo che a chiamta effettuata la varibile di stato torni false e scompaia il Loader
            .finally(() => {
                //metto questi secondi per verificare che funzioni
                setIsLoading(false)
            });
    };

    //creiamo una funzione per gestire la chiamta axios per i correlati
    function fetchRelatedProducts() {

        axios
            .get(`http://localhost:3000/api/products/${product.id}/related`)
            .then(res => {
                setRelatedProducts(res.data);
            })
            .catch(err => {
                console.log(err);
            });

    }

    //richiamiamo la funzione fetchProduct (una sola volta) al motnaggio della pagine grazie ad useEffect
    useEffect(() => {
        fetchProduct();
    }, [id]);

    //richiamiamo la funzione fetchRelatedProducts (una sola volta) al motnaggio della pagine grazie ad useEffect
    useEffect(() => {
        if (product.id) {
            fetchRelatedProducts()
        }
    }, [product]);

    return (

        <main>
            {product && <ProductCardDetails product={product} />}

            {relatedProducts.length > 0 && (
                <>
                    <h2
                        className="related-product-title"
                    >Prodotti correlati</h2>

                    <div className="related-products">
                        {relatedProducts.map(p => {
                            // calcoliamo i prezzi aggiornati con eventuali sconti
                            const { price, finalPrice, discount, isOnSale } = getProductPricing(p);

                            return (
                                <div key={p.id} className="related-card">

                                    <div className="related-card-title-container">
                                        {isOnSale ? (
                                            // se c'è sconto, mostriamo prezzo originale barrato e prezzo scontato
                                            <div className="related-card-price-button-container">
                                                <h4>
                                                    <span style={{ textDecoration: 'line-through', color: '#999' }}>
                                                        €{price.toFixed(2)}
                                                    </span>{' '}
                                                    <span style={{ color: 'red' }}>
                                                        €{finalPrice.toFixed(2)}
                                                    </span>/{p.weight}g
                                                </h4>
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
                                        ) : (
                                            // altrimenti mostriamo solo il prezzo normale
                                            <div className="related-card-price-button-container">
                                                <h4>€{price.toFixed(2)} / {p.weight}g</h4>
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
                                        )}
                                        <Link
                                            className="related-card-link"
                                            to={`/product/${p.slug}`}>
                                            <h4
                                                className="related-card-title"
                                            > {p.name}
                                            </h4>
                                        </Link>
                                    </div>
                                    <Link
                                        to={`/product/${p.slug}`}>
                                        <div className="related-card-img-container">
                                            <img
                                                className="related-card-img"
                                                src={p.image} alt={p.name} />
                                        </div>
                                    </Link>
                                </div>

                            )
                        })}
                    </div>
                </>
            )
            }

        </main >
    )
}

export default ProductPage