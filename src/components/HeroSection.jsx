//import useState e useEffect
import { useState, useEffect } from "react";

//import useGlobal
import { useGlobal } from "../context/GlobalContext";

//import Link
import { Link } from "react-router-dom";

function HeroSection() {

    //importiamo gli elementi che ci servono tramite la useContext
    const { products, fetchProducts } = useGlobal();

    const [shuffledProducts, setShuffledProducts] = useState([]);

    const [index, setIndex] = useState(0);

    const [isPaused, setIsPaused] = useState(false); // stato per bloccare lo slider al hover

    //richiamiamo la funzione fetchProducts (una sola volta) al motnaggio della pagine grazie ad useEffect
    useEffect(() => { fetchProducts(); }, []);

    //mescoliamo i prodotti appena arrivano
    useEffect(() => {
        if (products && products.length > 0) {
            const shuffled = [...products].sort(() => 0.5 - Math.random());
            setShuffledProducts(shuffled);
        }
    }, [products]);

    //slider automatico ogni 3 secondi
    useEffect(() => {
        if (shuffledProducts.length === 0) return;

        const interval = setInterval(() => {
            //cambia solo se non è in pausa
            if (!isPaused) {
                setIndex((prev) => (prev + 1) % shuffledProducts.length);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [shuffledProducts, isPaused]);

    if (shuffledProducts.length === 0) return <p>Loading...</p>;

    const product = shuffledProducts[index];

    //funzioni per frecce avanti/indietro
    const prevSlide = () => setIndex((prev) => (prev - 1 + shuffledProducts.length) % shuffledProducts.length);
    const nextSlide = () => setIndex((prev) => (prev + 1) % shuffledProducts.length);

    return (
        <section className="hero-section">
            <button className="hero-button " onClick={prevSlide}>
                <i class="bi bi-caret-left-fill"></i>
            </button>
            <div
                className="hero-container"
                //pausa slider al passaggio mouse
                onMouseEnter={() => setIsPaused(true)}
                //riprende slider quando esce
                onMouseLeave={() => setIsPaused(false)}
            >
                <Link className="hero-link" to={`/product/${product.slug}`}>
                    <img className="hero-image" src={product.image} alt={product.name} />
                </Link>
            </div>
            <button className="hero-button " onClick={nextSlide}>
                <i class="bi bi-caret-right-fill"></i>
            </button>
        </section>
    );
}

export default HeroSection;