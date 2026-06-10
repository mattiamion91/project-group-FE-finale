//import libreria rotte
import { BrowserRouter, Routes, Route } from "react-router-dom"

//import del GlobalProvider
import { GlobalProvider } from "./context/GlobalContext"

//import Layout
import DefaultLayout from "./layouts/DefaultLayout"
//import NotFound Page
import NotFound from "./pages/NotFound"
//import HomePage, ProductPage, RegionPage e RegionProductPage, importo searchpage
import HomePage from "./pages/HomePage"
import ProductPage from "./pages/ProductPage"
import RegionPage from "./pages/RegionPage"
import RegionProductPage from "./pages/RegionProductPage"
//import CartPage, CheckoutPage e WhislistPage
import CartPage from "./pages/CartPage"
import CheckoutPage from "./pages/CheckoutPage"
import WishlistPage from "./pages/WishlistPage"
import SearchPage from "./pages/SearchPage"

function App() {

  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />} >
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/region/:name/products" element={<RegionProductPage />} />
            <Route path="/cart/" element={<CartPage />} />
            <Route path="/checkout/" element={<CheckoutPage />} />
            <Route path="/wishlist/" element={<WishlistPage />} />
            <Route path="/region/:name" element={<RegionProductPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
