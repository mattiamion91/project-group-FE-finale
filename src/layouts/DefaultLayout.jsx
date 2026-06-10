//import dell'header e del footer
import MainHeader from "../components/MainHeader";
import MainFooter from "../components/MainFooter";
//import Loader
import Loader from "../components/Loader";

//import useGlobal
import { useGlobal } from "../context/GlobalContext";

//import dell'outlet
import { Outlet } from "react-router-dom";


function DefaultLayout() {

    //importiamo gli elementi che ci servono tramite la useContext
    const { isLoading } = useGlobal();

    return (
        <>
            <MainHeader />
            <Outlet />
            <MainFooter />
            {isLoading && <Loader />}
        </>
    )
}

export default DefaultLayout
