import { useEffect } from "react";
import { useGlobal } from "../context/GlobalContext";
import { Link } from "react-router-dom";

function RegionPage() {
    const { regions, fetchRegions } = useGlobal();

    useEffect(() => {
        fetchRegions();
    }, []);

    return (
        <main>
            <div className="region-container">
                {[...regions]
                    .sort(() => Math.random() - 0.5)
                    .map(region => (
                        <Link
                            className="region-card-container"
                            key={region.id}
                            to={`/region/${encodeURIComponent(region.name)}/products`}
                        >
                            <div className="region-img-container">
                                <img
                                    className="card-image"
                                    src={region.image}
                                    alt={region.name}
                                />
                            </div>

                            <div className="region-text-container">
                                <span className="region-name">
                                    {region.name}
                                </span>
                            </div>
                        </Link>
                    ))}
            </div>
        </main>
    );
}

export default RegionPage;