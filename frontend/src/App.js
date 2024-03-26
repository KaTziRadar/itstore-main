import React, { useState } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product";
import Notfound from "./pages/404";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Stav from "./pages/Stav";
import Adar from "./pages/Adar";
import Ido from "./pages/Ido";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import ProductDetails from "./components/ProductDetails";
import Cart from "./pages/Cart";

const App = () => {
  const [cart,setCart] = useState([]);
  const [cartSize,setCartSize] = useState([])
  return (
    <section className="">
      <Navbar size={cartSize.length}/>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product cart={cart} setCart={setCart} cartSize={cartSize} setCartSize={setCartSize} />} />
          <Route path="product/:id" element={<ProductDetails cart={cart} setCart={setCart} cartSize={cartSize} setCartSize={setCartSize} />} />
          <Route path="/:id" element={<ProductDetails cart={cart} setCart={setCart} cartSize={cartSize} setCartSize={setCartSize} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} cartSize={cartSize} setCartSize={setCartSize} />} />
          <Route path="*" element={<Notfound />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/stav" element={<Stav />} />
          <Route path="/adar" element={<Adar />} />
          <Route path="/Ido" element={<Ido />} />
        </Routes>
      </main>

      <Footer />
    </section>
  );
};

export default App;
