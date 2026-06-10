//import axios
import axios from "axios";

//import useGlobal
import { useGlobal } from "../context/GlobalContext";

//import useState 
import { useState, useEffect } from "react";

function CheckoutPage() {

    //importiamo gli elementi che ci servono tramite la useContext
    const { cart, setCart, shippingData, setShippingData, billingData, setBillingData, discountCode, setDiscountCode, discountPercentage, setDiscountPercentage, applyDiscount, fetchShipping, shippingPrice, setShippingPrice, getProductPricing } = useGlobal();

    //aggiungiamo una varibile di stato per far combaciare i duen dati di fatturazione
    const [sameAsShipping, setSameAsShipping] = useState(true);

    //creazione varibile endpoint in un salvare l'API
    const endpointCheckout = "http://localhost:3000/api/orders/checkout";

    //funzione di validaizone
    function validateFields(data) {
        const requiredFields = [
            "name",
            "surname",
            "email",
            "phone",
            "street",
            "city",
            "region",
            "province",
            "postal_code",
            "country"
        ];

        for (let field of requiredFields) {
            if (!data[field] || data[field].toString().trim() === "") {
                return false;
            }
        }

        return true;
    }

    //creiamo una funzione per avviare la chiamta POST al click
    function handleCheckout() {

        // VALIDAZIONE
        const isShippingValid = validateFields(shippingData);

        if (!isShippingValid) {
            alert("Compila tutti i campi di spedizione");
            return;
        }

        if (!sameAsShipping) {
            const isBillingValid = validateFields(billingData);

            if (!isBillingValid) {
                alert("Compila tutti i campi di fatturazione");
                return;
            }
        }

        axios.post(endpointCheckout, {
            shippingData,
            billingData,
            products: cart,
            shipping_price: shippingPrice,
            discount_code: discountCode,
            discount_percentage: discountPercentage
        })
            .then(res => {
                const order = res.data.order;

                //ricostruiamo il totale con i prezzi aggiornati
                let cartTotal = 0;
                let message = `Ordine confermato!\nID: ${order.id}\n\nProdotti:\n`;

                //aggiorniamo i prezzi con getProductPricing
                order.products.forEach(p => {
                    const { price, finalPrice, discount, isOnSale } = getProductPricing(p);
                    cartTotal += finalPrice * p.quantity;

                    if (isOnSale) {
                        message += `- ${p.name} x${p.quantity} (€${price.toFixed(2)} -> scontato €${finalPrice.toFixed(2)})\n`;
                    } else {
                        message += `- ${p.name} x${p.quantity} (€${price.toFixed(2)})\n`;
                    }
                });

                //calcoliamo sconto e totale finale
                const discountAmount = cartTotal * (discountPercentage / 100);
                const totalFinal = cartTotal - discountAmount + shippingPrice;

                //aggiungiamo spedizione, sconto e totale finale al messaggio
                message += `\nSpedizione: €${shippingPrice.toFixed(2)}`;
                message += `\nSconto: €${discountAmount.toFixed(2)}`;
                message += `\nTotale finale: €${totalFinal.toFixed(2)}`;

                //mostriamo alert
                alert(message);

                //reset dei campi
                setShippingData({
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

                setBillingData({
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
                setDiscountCode("");
                setCart([]);
                setDiscountPercentage(0);
            })
            .catch(err => console.error("Errore nella chiamata POST:", err));
    }

    //creiamo una funzione per generaliziane la presa dei valori dagli input per i dati di spedizione
    function handleChangeShippingData(e) {
        //prende name e value dall'input
        const { name, value } = e.target;
        //salviamo in una nuova varibile i valori di shippingData
        const updatedShipping = { ...shippingData, [name]: value };
        //aggiorniamo shippingData
        setShippingData(updatedShipping);
        //se sameAsShipping è vero
        if (sameAsShipping) {
            setBillingData({ ...updatedShipping });
        }
    }

    //creiamo una funzione per generaliziane la presa dei valori dagli input per i dati di fatturazione
    function handleChangeBillingData(e) {
        //prende name e value dall'input
        const { name, value } = e.target;
        setBillingData({ ...billingData, [name]: value });
    }

    //creaimo un calcolo di spedizione dinamico
    useEffect(() => {
        if (cart.length > 0) {
            fetchShipping(cart);
        } else {
            //se carrello vuoto, resetta spedizione
            setShippingPrice(0);
        }
    }, [cart]);

    //creaimno constanti per i calcoli per il totale carrello, sconto e totale finale
    const cartTotal = cart.reduce((sum, p) => {
        const { finalPrice } = getProductPricing(p);
        return sum + finalPrice * p.quantity;
    }, 0);
    const discountAmount = cartTotal * (discountPercentage / 100);
    const totalFinal = cartTotal - discountAmount + shippingPrice;

    return (
        <main>

            <div className="checkout-container">




                <div className="checkout-dates-container">
                    <div className="checkout-dates">
                        <h2>Dati spedizione</h2>

                        <label>
                            <input
                                type="checkbox"
                                checked={sameAsShipping}
                                onChange={(e) => {
                                    const checked = e.target.checked;
                                    setSameAsShipping(checked);

                                    if (checked) {
                                        setBillingData({ ...shippingData });
                                    }
                                }}
                            />
                            Usa gli stessi dati della spedizione per la fatturazione
                        </label>

                        <div className="checkout-input-container">

                            <label>
                                Nome
                                <input
                                    name="name"
                                    value={shippingData?.name || ""}
                                    onChange={handleChangeShippingData}
                                    required
                                />
                            </label>

                            <label>
                                Cognome
                                <input
                                    name="surname"
                                    value={shippingData?.surname || ""}
                                    onChange={handleChangeShippingData}
                                    required
                                />
                            </label>

                            <label>
                                Email
                                <input
                                    type="email"
                                    name="email"
                                    value={shippingData?.email || ""}
                                    onChange={handleChangeShippingData}
                                    required
                                />
                            </label>

                            <label>
                                Telefono
                                <input
                                    name="phone"
                                    value={shippingData?.phone || ""}
                                    onChange={handleChangeShippingData}
                                    required
                                />
                            </label>

                            <label>
                                Via
                                <input
                                    name="street"
                                    value={shippingData?.street || ""}
                                    onChange={handleChangeShippingData}
                                    required
                                />
                            </label>

                            <label>
                                Città
                                <input
                                    name="city"
                                    value={shippingData?.city || ""}
                                    onChange={handleChangeShippingData}
                                    required
                                />
                            </label>

                            <label>
                                Regione
                                <input
                                    name="region"
                                    value={shippingData?.region || ""}
                                    onChange={handleChangeShippingData}
                                    required
                                />
                            </label>

                            <label>
                                Provincia
                                <input
                                    name="province"
                                    value={shippingData?.province || ""}
                                    onChange={handleChangeShippingData}
                                    required
                                />
                            </label>

                            <label>
                                CAP
                                <input
                                    name="postal_code"
                                    value={shippingData?.postal_code || ""}
                                    onChange={handleChangeShippingData}
                                    required
                                />
                            </label>

                            <label>
                                Nazione
                                <input
                                    name="country"
                                    value={shippingData?.country || ""}
                                    onChange={handleChangeShippingData}
                                    required
                                />
                            </label>

                        </div>
                    </div>


                    {!sameAsShipping && (

                        <div className="checkout-dates">
                            <div className="cheackout-billing-title">
                                <h2>Dati fatturazione</h2>


                            </div>

                            <div className="checkout-input-container">
                                <label>
                                    Nome
                                    <input
                                        name="name"
                                        value={billingData?.name || ""}
                                        onChange={handleChangeBillingData}
                                        required
                                    />
                                </label>

                                <label>
                                    Cognome
                                    <input
                                        name="surname"
                                        value={billingData?.surname || ""}
                                        onChange={handleChangeBillingData}
                                        required
                                    />
                                </label>

                                <label>
                                    Email
                                    <input
                                        type="email"
                                        name="email"
                                        value={billingData?.email || ""}
                                        onChange={handleChangeBillingData}
                                        required
                                    />
                                </label>

                                <label>
                                    Telefono
                                    <input
                                        name="phone"
                                        value={billingData?.phone || ""}
                                        onChange={handleChangeBillingData}
                                        required
                                    />
                                </label>

                                <label>
                                    Via
                                    <input
                                        name="street"
                                        value={billingData?.street || ""}
                                        onChange={handleChangeBillingData}
                                        required
                                    />
                                </label>

                                <label>
                                    Città
                                    <input
                                        name="city"
                                        value={billingData?.city || ""}
                                        onChange={handleChangeBillingData}
                                        required
                                    />
                                </label>

                                <label>
                                    Regione
                                    <input
                                        name="region"
                                        value={billingData?.region || ""}
                                        onChange={handleChangeBillingData}
                                        required
                                    />
                                </label>

                                <label>
                                    Provincia
                                    <input
                                        name="province"
                                        value={billingData?.province || ""}
                                        onChange={handleChangeBillingData}
                                        required
                                    />
                                </label>

                                <label>
                                    CAP
                                    <input
                                        name="postal_code"
                                        value={billingData?.postal_code || ""}
                                        onChange={handleChangeBillingData}
                                        required
                                    />
                                </label>

                                <label>
                                    Nazione
                                    <input
                                        name="country"
                                        value={billingData?.country || ""}
                                        onChange={handleChangeBillingData}
                                        required
                                    />
                                </label>
                            </div>

                        </div>
                    )}
                </div>



                <div className="checkout-footer">

                    <div className="checkout-discount-container">
                        <div>
                            <h2>Codice sconto</h2>
                            <input
                                placeholder="Inserisci codice sconto"
                                value={discountCode || ""}
                                onChange={e => setDiscountCode(e.target.value)}
                            />
                            <button
                                className="checkout-button"
                                type="button"
                                onClick={applyDiscount}
                            >
                                Applica
                            </button>
                            {discountPercentage > 0 && (
                                <p>Sconto applicato: {discountPercentage}%</p>
                            )}
                        </div>
                        <div>
                            <h4>
                                Totale carrello: €{cartTotal.toFixed(2)}
                            </h4>
                            {discountPercentage > 0 && (
                                <h5>
                                    Sconto applicato: €{discountAmount.toFixed(2)} ({discountPercentage}%)
                                </h5>
                            )}
                            <h4>
                                Spedizione: {shippingPrice === 0 ? "Gratuita" : `€${shippingPrice.toFixed(2)}`}
                            </h4>
                            <h3>
                                Totale finale: €{totalFinal.toFixed(2)}
                            </h3>
                        </div>
                    </div>



                    <div className="checkout-button-container">
                        <button
                            type="button"
                            className="checkout-button"
                            onClick={handleCheckout}>
                            Conferma ordine
                        </button>
                    </div>
                </div>

            </div>
        </main>
    );
}

export default CheckoutPage;