//import useState e useEffect
import { useState, useEffect } from "react";

//import useGlobal
import { useGlobal } from "../context/GlobalContext";

//import Link
import { Link, useParams, useNavigate } from "react-router-dom";

//import axios
import axios from "axios";

//import ProductCard
import ProductCard from "../components/ProductCard";

function RegionProductPage() {

    //importiamo gli elementi che ci servono tramite la useContext
    const { setIsLoading } = useGlobal();

    //ricaviamo l'id dall'url di rotta
    const { name } = useParams();

    //salviamo un'istanza di useNavigate per poterlo poi utilizzare 
    const redirect = useNavigate();

    //creazione varibile endpoint in un salvare l'API
    const endpoint = `http://localhost:3000/api/regions/name/${name}/products`;

    //creazione varbile di stato come un array vuoto
    const [products, setProducts] = useState([]);

    //creiamo una funzione per gestire la chiamta axios alla rotta index
    function fetchRegionProducts() {

        //facciamo in modo che all'avvio della chiamata la varibile di stato cambi in true e parta il Loader
        setIsLoading(true)

        axios.get(endpoint)
            .then(res => {
                const normalizedProducts = res.data.map(p => {
                    let img = p.image;

                    if (img) {
                        // Se è relativo, aggiungi il dominio
                        if (!img.startsWith('http')) {
                            img = img.startsWith('/') ? img.slice(1) : img;
                            img = `http://localhost:3000/${img}`;
                        }

                        // Sostituisci regions-images con product-images
                        img = img.replace('/images/regions-images/', '/images/product-images/');
                    }

                    return { ...p, image: img };
                });

                setProducts(normalizedProducts);
            })
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

    //richiamiamo la funzione fetchProducts (una sola volta) al motnaggio della pagine grazie ad useEffect
    useEffect(() => {
        fetchRegionProducts();
    }, [endpoint, redirect]);

    return (
        <main>

            <h2 className="region-product-subtitle">Prodotti della regione: {decodeURIComponent(name)}</h2>
            <div className="region-product-container">
                {products
                    //mescola l'array
                    .sort(() => Math.random() - 0.5)
                    .map(product => {
                        return (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        )
                    })}
            </div>
            <div className="region-navigation">
                <Link className="nav-button" to="/">
                    Torna alla Home
                </Link>

                <Link className="nav-button secondary" to="/region">
                    Torna alle Regioni
                </Link>
            </div>
        </main>
    )
}

export default RegionProductPage
