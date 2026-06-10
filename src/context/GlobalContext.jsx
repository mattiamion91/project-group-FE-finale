//import dei componenti di context, useState e useEffect
import { useState, useEffect, createContext, useContext } from "react";

//import axios
import axios from "axios";

//salviamo su una variabile il createContext
const GlobalContext = createContext();

function GlobalProvider({ children }) {

    //creo una varibnile di stato per filtrare i prodotti in sconto
    const [onlyDiscounted, setOnlyDiscounted] = useState(false);

    //creiamo una variabile di stato per settare l'attivazione e la disattivazione del Loader
    const [isLoading, setIsLoading] = useState(false);

    //creazione varibile endpoint in un salvare l'API
    const endpointIndexProducts = "http://localhost:3000/api/products";

    //creazione varibile endpoint in un salvare l'API
    const endpointRegions = "http://localhost:3000/api/regions";

    //creazione varbile di stato come un array vuoto
    const [products, setProducts] = useState([]);

    //creazione varbile di stato come un array vuoto
    const [regions, setRegions] = useState([]);

    //creaimo una funzione per la gestione del prezzo e dello sconto
    function getProductPricing(product) {
        const discount = product.discount_percentage ?? 0;
        const isOnSale = discount > 0;
        const price = product.price ?? 0;
        const finalPrice = product.final_price ?? price;
        return { price, finalPrice, discount, isOnSale };
    }

    //creiamo una funzione per gestire la chiamta axios alla rotta index
    function fetchProducts() {

        //facciamo in modo che all'avvio della chiamata la varibile di stato cambi in true e parta il Loader
        setIsLoading(true)

        axios.get(endpointIndexProducts)
            .then(res => { setProducts(res.data.results) })
            .catch(err => {
                console.log(err);
            })
            //facciamo in modo che a chiamta effettuata la varibile di stato torni false e scompaia il Loader
            .finally(() => {
                //metto questi secondi per verificare che funzioni
                setIsLoading(false)
            });
    };

    //creiamo una funzione per gestire la chiamta axios alla rotta index
    function fetchRegions() {

        //facciamo in modo che all'avvio della chiamata la varibile di stato cambi in true e parta il Loader
        setIsLoading(true)

        axios.get(endpointRegions)
            .then(res => { setRegions(res.data) })
            .catch(err => {
                console.log(err);
            })
            //facciamo in modo che a chiamta effettuata la varibile di stato torni false e scompaia il Loader
            .finally(() => {
                //metto questi secondi per verificare che funzioni
                setIsLoading(false)
            });
    };


    //creazione variabile di stato per il carello
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    //salviamo il carello nel browswer al al cambio della varibile di stato Cart
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    //creazione variabili si statp per indirizzi di spedizione e fatturazione
    const [shippingData, setShippingData] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        region: "",
        province: "",
        postal_code: "",
        country: ""
    });

    const [billingData, setBillingData] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        region: "",
        province: "",
        postal_code: "",
        country: ""
    });

    //creiamo una funzione per aggiungere i prodotti al carello
    function addToCart(product) {
        //cerchiamo nel carrello se il prodotto esiste già, confrontando l'id
        const exist = cart.find(p => p.id === product.id);

        //se il prodotto esiste già nel carrello:
        if (exist) {
            //facciamo un map su tutti gli elementi del carrello:
            setCart(cart.map(p =>
                //se l'id corrisponde al prodotto da aggiungere
                p.id === product.id
                    //incrementiamo la quantità di 1
                    ? { ...p, quantity: p.quantity + 1 }
                    //altrimenti lasciamo il prodotto invariato
                    : p
            ));
            //se il prodotto non esiste ancora nel carrello
        } else {
            //aggiungiamo il prodotto al carrello con quantità iniziale 1
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    }

    //creiamo una funzione per rimuovere i prodotti dal carello
    function removeFromCart(id) {
        setCart(
            //facciamo un map su tutti i prodotti del carrello
            cart
                .map(p =>
                    //se l'id del prodotto corrisponde a quello che vogliamo rimuovere
                    p.id === id
                        //creiamo una nuova copia del prodotto con quantità diminuita di 1
                        ? { ...p, quantity: p.quantity - 1 }
                        //altrimenti lasciamo il prodotto invariato
                        : p
                )
                //filtriamo l'array: rimangono solo i prodotti con quantità maggiore di 0
                .filter(p => p.quantity > 0)
        );
    }

    //creaimo una varibile di codice sconto e una di percentuale
    const [discountCode, setDiscountCode] = useState("");
    const [discountPercentage, setDiscountPercentage] = useState(0);

    async function applyDiscount() {
        //se l'utente non inserisce alcun codice, non facciamo nulla
        if (!discountCode) {
            //impostiamo lo sconto a 0 per sicurezza
            setDiscountPercentage(0);
            //usciamo dalla funzione senza chiamare il backend
            return;
        }

        //se l'utente inserisce un codice di sconto
        try {
            //facciamo partire una chiamata al backend per validare il codice sconto
            const response = await axios.post(
                "http://localhost:3000/api/discounts/validate",
                { code: discountCode }
            );

            //se il codice è valido, aggiorniamo lo stato della percentuale
            setDiscountPercentage(response.data.percentage);

            //mostriamo un messaggio di conferma all'utente
            alert(`Codice valido! Sconto ${response.data.percentage}%`);

        } catch (error) {
            //se il codice non è valido o scaduto, resettiamo lo sconto a 0
            console.error(error);
            setDiscountPercentage(0);

            //informiamo l'utente
            alert("Codice sconto non valido o scaduto");
        }
    }

    //creo una variabile di stato per i costi di spedizione
    const [shippingPrice, setShippingPrice] = useState(0);

    //creo una funzione asincrona per calcolare la spedizione in base ai prodotti nel carrello
    async function fetchShipping(products) {
        try {
            //facciamo una chiamata POST al backend alla rotta /calculate-shipping, inviamo i prodotti del carrello come body della richiesta
            const response = await axios.post(
                "http://localhost:3000/api/orders/calculate-shipping",
                { products }
            );

            //aggiorniamo lo stato della spedizione con il valore calcolato dal backend
            setShippingPrice(response.data.shippingPrice);

            //restituiamo anche i dati completi calcolati (totale carrello, spedizione, totale finale)
            return response.data;
        } catch (error) {
            //in caso di errore nella chiamata al backend
            console.error("Errore calcolo spedizione:", error);

            // reset dello stato della spedizione a 0 per sicurezza
            setShippingPrice(0);

            //restituiamo valori di default per evitare crash nel frontend
            return { cartTotal: 0, shippingPrice: 0, totalFinal: 0 };
        }
    }

    //creiamo una varibile di stato per la wishlist
    const [wishlist, setWishlist] = useState(() => {
        const savedWishlist = localStorage.getItem("wishlist");
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    //salviamo la wishlist nel browswer al al cambio della varibile di stato wishlist
    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    //creiamo una funzione per aggiungere i prodotti alla wishlist
    function addToWishlist(product) {

        //aggiorniamo lo stato di wishlist
        setWishlist(prev => {
            //controlliamo se il prodotto è già presnete nella wishlist
            if (prev.find(p => p.id === product.id)) {
                //se il prodotto è già presente, rimane tutto invariato
                return prev;
            }
            //altriemnti la aggiungiamo
            return [...prev, product];
        });
    }

    //creiamo una funzione per rimuovere i prodotti alla wishlist
    function removeFromWishlist(id) {

        //aggiorniamo lo stato di wishlist
        setWishlist(prev =>
            //utiliziamo un filter per ircrare l'array senza il prodotto con l'id selezioanto
            prev.filter(p => p.id !== id));
    }

    //creiamo funzione per contare prdotti carrello
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

    //creiamo funzione per contare prodotti whislist
    const wishlistItemCount = wishlist.length;

    return (
        <GlobalContext.Provider
            value={{
                endpointIndexProducts,
                endpointRegions,
                fetchRegions,
                setIsLoading,
                fetchProducts,
                products,
                setProducts,
                regions,
                setRegions,
                cart,
                setCart,
                addToCart,
                removeFromCart,
                shippingData,
                setShippingData,
                billingData,
                setBillingData,
                discountCode,
                setDiscountCode,
                discountPercentage,
                setDiscountPercentage,
                applyDiscount,
                shippingPrice,
                setShippingPrice,
                fetchShipping,
                wishlist,
                setWishlist,
                addToWishlist,
                removeFromWishlist,
                getProductPricing,
                onlyDiscounted,
                setOnlyDiscounted,
                cartItemCount,
                wishlistItemCount
            }}
        >
            {children}
        </GlobalContext.Provider>
    );

}

//definiamo un hook per consumare il contesto
function useGlobal() {
    const context = useContext(GlobalContext);
    return context;
}

export { GlobalProvider, useGlobal }
