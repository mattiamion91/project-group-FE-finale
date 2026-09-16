import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

function MainFooter() {
    return (
        <footer className="footer-custom py-5 mt-5">
            <div className="container">
                <div className="row g-4">
                    {/*Footer links column*/}
                    <div className="col-lg-4 col-md-6">
                        <h5 className="mb-4">La nostra storia</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">I nostri partner</li>
                            <li className="mb-2">Beneficenza</li>
                            <li className="mb-2">Spedizioni</li>
                            <li className="mb-2">Contatti</li>
                            <li className="mb-2">FAQ</li>
                        </ul>
                    </div>

                    {/*<!-- Social media column -->*/}
                    <div className="col-lg-4 col-md-6">
                        <h5 className="mb-4">Seguici sui social</h5>
                        <div className="d-flex gap-3">
                            <a href="#" className="fs-4">
                                <FaFacebookF />
                            </a>
                            <a href="#" className="fs-4">
                                <FaInstagram />
                            </a>
                            <a href="#" className="fs-4">
                                <FaTwitter />
                            </a>
                        </div>
                    </div>

                    {/*<!-- Newsletter/Signup column -->*/}
                    <div className="col-lg-4 col-md-12">
                        <h5 className="mb-4">Iscriviti alla newsletter</h5>
                        <p className="text-light-opacity mb-4">
                            Rimani aggiornato sulle nostre offerte speciali, nuovi prodotti e eventi esclusivi.
                        </p>
                        <div className="input-group">
                            <input type="email" className="form-control form-control-lg" placeholder="Inserisci la tua email" />
                            <button className="btn btn-success" type="button">Iscriviti</button>
                        </div>
                    </div>
                </div>
            </div>

            {/*<!-- Footer bottom -->*/}
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="border-top border-secondary pt-4 mt-4 text-center text-light-opacity">
                            © 2026 Sapori d’Italia
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default MainFooter;