//import useState e useEffect
import { useState, useEffect } from "react";

//import useGlobal
import { useGlobal } from "../context/GlobalContext";

//import Link
import { Link, useParams } from "react-router-dom";

//import HeroSection
import HeroSection from "../components/HeroSection";

//import axios
import axios from "axios";

//import card prodotto
import ProductCard from "../components/ProductCard";

function HomePage() {

    //env var
    const apiUrl = import.meta.env.VITE_API_URL;

    //importiamo gli elementi che ci servono tramite la useContext
    const { products, fetchProducts, fetchRegions, setIsLoading, regions, onlyDiscounted, setOnlyDiscounted } = useGlobal();

    //var di stato per prodotti favoriti
    const [favorites, setFavorites] = useState([]);

    //var di stato per gli oli
    const [oils, setOils] = useState([]);

    //var prodotti random
    const [randomProducts, setRandomProducts] = useState([]);

    //creo una varibile di stato per i prodotti in promozione
    const [discountedProducts, setDiscountedProducts] = useState([]);

    function fetchFavorites() {

        setIsLoading(true);

        axios.get(`${apiUrl}/api/products/favorites`)
            .then(res => {
                console.log("FAVORITES API:", res.data);
                setFavorites(res.data);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function fetchOils() {

        setIsLoading(true);

        axios.get(`${apiUrl}/api/products/oils`)
            .then(res => {
                setOils(res.data);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function fetchRandomProducts() {

        setIsLoading(true);

        axios.get(`${apiUrl}/api/products/random`)
            .then(res => {
                setRandomProducts(res.data);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    //creazione varbile di stato come un array vuoto
    const [productsRegion, setProductsRegion] = useState([]);

    //creiamo una funzione per gestire la chiamta axios alla rotta index
    function fetchRegionProducts() {

        //facciamo in modo che all'avvio della chiamata la varibile di stato cambi in true e parta il Loader
        setIsLoading(true)

        axios.get(endpointProductsRegion)
            .then(res => { setProductsRegion(res.data) })
            .catch(err => {
                console.log(err);
            })
            //facciamo in modo che a chiamta effettuata la varibile di stato torni false e scompaia il Loader
            .finally(() => {
                //metto questi secondi per verificare che funzioni
                setIsLoading(false)
            });
    };

    //richiamiamo la funzione fetchProducts e fetchRegions (una sola volta) al motnaggio della pagine grazie ad useEffect
    useEffect(() => {

        fetchProducts();

        if (fetchRegions) {
            fetchRegions();
        }

        fetchFavorites();
        fetchOils();
        fetchRandomProducts();

    }, []);

    //richiamo la funzione ogni volta che cambia onlyDiscounted
    useEffect(() => {
        if (onlyDiscounted) {
            setIsLoading(true);
            axios.get(`${apiUrl}/api/products/discounted`)
                .then(res => {
                    // Assicurati che sia un array
                    const data = Array.isArray(res.data) ? res.data : res.data.results || [];
                    setDiscountedProducts(data);
                })
                .catch(err => console.log(err))
                .finally(() => setIsLoading(false));
        }
    }, [onlyDiscounted]);

    return (
        <>
            <div className="hero-section">
                <HeroSection />
            </div>

            <main>

                {onlyDiscounted ? (
                    <>
                        <h2 className="home-subtitle">Prodotti in promozione</h2>
                        <div className="container">
                            <div className="row">
                                {discountedProducts.map(product => (
                                    <div key={product.id} className="col-md-3 col-sm-6 col-12 mb-4">
                                        <ProductCard key={product.id} product={product} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="home-subtitle">Tavola dei preferiti</h2>
                        <div className="container">
                            <div className="row">
                                {favorites.map(product => (
                                    <div key={product.id} className="col-md-3 col-sm-6 col-12 mb-4">
                                        <ProductCard key={product.id} product={product} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <h2 className="home-subtitle">Tavola degli oli</h2>
                        <div className="container">
                            <div className="row">
                                {oils.map(product => (
                                    <div key={product.id} className="col-md-3 col-sm-6 col-12 mb-4">
                                        <ProductCard key={product.id} product={product} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <h2 className="home-subtitle">Tavola imbandita</h2>
                        <div className="container">
                            <div className="row">
                                {randomProducts.map(product => (
                                    <div key={product.id} className="col-md-3 col-sm-6 col-12 mb-4">
                                        <ProductCard key={product.id} product={product} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </main >
        </>
    )
}

export default HomePage