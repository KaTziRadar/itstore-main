import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product";
import Notfound from "./pages/404";
import StavPage from "./pages/Stav";
import Adar from "./pages/Adar";
import Ido from "./pages/Ido";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import ProductDetails from "./components/ProductDetails";
import Cart from "./pages/Cart";

const App = () => {
  return (
    <section className="">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Notfound />} />
          <Route path="/stav" element={<StavPage />} />
          <Route path="/adar" element={<Adar />} />
          <Route path="/Ido" element={<Ido />} />
        </Routes>
      </main>

      <Footer />
    </section>
  );
};

export default App;
