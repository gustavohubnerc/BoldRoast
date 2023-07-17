import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ProductPage from "./pages/ProductPage"
import HomePage from "./pages/HomePage"
import FixedRodape from "./components/Rodape"
import { useState } from "react"
import AuthContext from "./context/AuthContext"
import CheckoutPage from "./pages/CheckoutPage"
import ShopPage from "./pages/ShopPage"
import CartContext from "./context/CartContext"

export default function App() {
  

  const [token, setToken] = useState(localStorage.getItem("token"));

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [notes, setNotes] = useState("");

  return (
    <>
      <AuthContext.Provider value={{ token, setToken }}>
      <CartContext.Provider value={{ products, setProducts, total, setTotal, notes, setNotes }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/shop" element={<ShopPage />} />
        </Routes>
      </BrowserRouter>
      </CartContext.Provider>
      </AuthContext.Provider>

      <FixedRodape />
    </>
  )
}

