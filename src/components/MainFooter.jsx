import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

function MainFooter() {
    return (
        <footer className="footer">

            <div className="footer-container">


                <div className="footer-left">
                    <ul className="footer-links">
                        <li>La nostra storia</li>
                        <li>I nostri partner</li>
                        <li>Beneficenza</li>
                        <li>Spedizioni</li>
                        <li>Contatti</li>
                        <li>FAQ</li>
                    </ul>
                </div>


                <div className="footer-right">
                    <ul className="footer-socials">

                        <li>
                            <a href="#">
                                <FaFacebookF />
                                <span>Facebook</span>
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                <FaInstagram />
                                <span>Instagram</span>
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                <FaTwitter />
                                <span>Twitter</span>
                            </a>
                        </li>

                    </ul>
                </div>

            </div>

            <div className="footer-bottom">
                © 2026 Sapori d’Italia
            </div>

        </footer>
    )
}

export default MainFooter;