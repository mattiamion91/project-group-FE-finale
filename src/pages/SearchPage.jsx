//import { Link } from "react-router-dom"
import { Link } from "react-router-dom";
//import useEffect e useState
import { useEffect, useState } from "react";
//import useSearchParams
import { useSearchParams } from "react-router-dom";
//axios
import axios from "axios";
//import useGlobal dal contesto
import { useGlobal } from "../context/GlobalContext";
//import react icons
import { FaHeart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
//import Loader
import Loader from "../components/Loader";

function SearchPage() {

    //importiamo gli elementi che ci servono dal contesto globale
    const { onlyDiscounted, addToCart, addToWishlist, getProductPricing } = useGlobal();

    const [searchParams, setSearchParams] = useSearchParams();
    const [searched, setSearched] = useState(searchParams.get("query"));
    const [searchedItems, setSearchedItems] = useState([]);
    const [isGridActive, setIsGridActive] = useState(true);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
    const [regions, setRegions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState(searchParams.get("region") || "");
    const [sort, setSort] = useState(searchParams.get("sort") || "");

    //loader LOCALE (solo per questa pagina)
    const [localLoading, setLocalLoading] = useState(false);

    //funzione per aggiornare filtri e URL
    const updateFilters = (key, value) => {
        const newParams = new URLSearchParams(searchParams);
        if (value) newParams.set(key, value);
        else newParams.delete(key);

        if (key === "category" || key === "region") {
            newParams.delete("query");
            setSearched("");
        }

        setSearchParams(newParams);
    };


    // CHIAMATA REGIONI
    useEffect(() => {
        const controller = new AbortController();

        axios.get('http://localhost:3000/api/regions', { signal: controller.signal })
            .then(res => setRegions(res.data))
            .catch(err => { if (!axios.isCancel(err)) console.log(err); })

        return () => controller.abort();
    }, []);

    // CHIAMATA CATEGORIE
    useEffect(() => {
        const controller = new AbortController();

        axios.get('http://localhost:3000/api/products/categories', { signal: controller.signal })
            .then(res => setCategories(res.data))
            .catch(err => { if (!axios.isCancel(err)) console.log(err); })

        return () => controller.abort();
    }, []);


    // CHIAMATA PRODOTTI
    useEffect(() => {
        const controller = new AbortController();

        setLocalLoading(true); // uso loader locale

        const start = Date.now(); // ⬅️ tempo iniziale

        let endpoint = `http://localhost:3000/api/products?search=${searched}&category=${selectedCategory}&region=${selectedRegion}&sort=${sort}`;
        if (onlyDiscounted) {
            endpoint = `http://localhost:3000/api/products/discounted?search=${searched}&category=${selectedCategory}&region=${selectedRegion}&sort=${sort}`;
        }

        axios.get(endpoint, { signal: controller.signal })
            .then(res => setSearchedItems(res.data.results))
            .catch(err => {
                if (axios.isCancel(err)) console.log("Richiesta cancellata");
                else console.log(err);
            })
            .finally(() => {
                const elapsed = Date.now() - start; // ⬅️ quanto è durata
                const remaining = Math.max(0, 200 - elapsed); // ⬅️ quanto manca

                setTimeout(() => setLocalLoading(false), remaining); // delay solo qui
            });

        return () => controller.abort();
    }, [searched, selectedCategory, selectedRegion, onlyDiscounted, sort]);


    // AGGIORNO STATI LOCALI QUANDO CAMBIA L'URL
    useEffect(() => {
        setSelectedCategory(searchParams.get("category") || "");
        setSelectedRegion(searchParams.get("region") || "");
        setSearched(searchParams.get("query") || "");
        setSort(searchParams.get("sort") || "");
    }, [searchParams]);

    return (
        <main>

            {localLoading && <Loader />}

            <div className="selcet-container">
                <div className="filter-section">
                    <label>Categoria: </label>
                    <select value={selectedCategory} onChange={(e) => updateFilters("category", e.target.value)}>
                        <option value="">Tutte le categorie</option>
                        {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                </div>

                <div className="filter-region">
                    <label>Regione: </label>
                    <select value={selectedRegion} onChange={(e) => updateFilters("region", e.target.value)}>
                        <option value="">Tutte le regioni</option>
                        {regions.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
                    </select>
                </div>

                <div className="filter-sort">
                    <label>Ordina per: </label>
                    <select value={sort} onChange={(e) => updateFilters("sort", e.target.value)}>
                        <option value="">Default</option>
                        <option value="name_asc">Nome A-Z</option>
                        <option value="name_desc">Nome Z-A</option>
                        <option value="price_asc">Prezzo crescente</option>
                        <option value="price_desc">Prezzo decrescente</option>
                    </select>
                </div>
            </div>

            {searchedItems.length > 0 ? (
                <div>
                    <div className="search-button-container">
                        <h2>Risultati per: {searched}</h2>
                        <button className="search-button-search" onClick={() => setIsGridActive(prev => !prev)}>
                            {isGridActive ? "Vista Lista" : "Vista Griglia"}
                        </button>
                    </div>
                    <div className={isGridActive ? "home-container" : "list-layout"}>
                        {searchedItems.map(item => {
                            const { price, finalPrice, isOnSale } = getProductPricing(item);
                            return (
                                <div className={isGridActive ? "card-container" : "list-item"} key={item.id}>
                                    <div className="img-container">
                                        <img className="card-image" src={item.image} alt={item.name} />
                                    </div>
                                    {isGridActive || (<p className="description-container">{item.descriptions}</p>)}
                                    <div className="text-container">
                                        <Link className="card-link" to={`/product/${item.slug}`}>{item.name}</Link>
                                        <div className="card-weight-button-container">
                                            <div className="card-weight">{item.weight} g</div>
                                            <div className="card-button-container">
                                                <button className="card-button" onClick={() => addToCart(item)}><FaCartPlus /></button>
                                                <button className="card-button" onClick={() => addToWishlist(item)}><FaHeart /></button>
                                            </div>
                                        </div>
                                        <div className="card-price">
                                            Prezzo: {isOnSale ? (
                                                <>
                                                    <span style={{ textDecoration: 'line-through', color: '#999' }}>€{price.toFixed(2)}</span>{' '}
                                                    <span style={{ color: 'red' }}>€{finalPrice.toFixed(2)}</span>
                                                </>
                                            ) : <>€{price.toFixed(2)}</>}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (<p>Nessun prodotto trovato </p>)}
        </main>
    );
}

export default SearchPage;