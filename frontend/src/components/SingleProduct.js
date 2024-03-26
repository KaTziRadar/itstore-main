import { useState } from "react";
import { Link } from "react-router-dom";

const SingleProduct = ({ product,cart,cartSize,setCart,setCartSize}) => {
  
  const { img, title, brand, price } = product;

  const addToCart = (id,img, title, brand, price) =>
  {
    const obj = {
      id,img, title, brand, price,quantity:1
    }
    const index = cart.findIndex(product => product.id === obj.id);
    if(index !== -1) {
      cart[index].quantity++;
      setCartSize([...cartSize,1])
    } else {
      setCart([...cart,obj]);
      setCartSize([...cartSize,1])
      console.log("Cart element",cart)
      console.log("cart size is",cartSize);
    }
    
  }
  return (
    <div className="single-product flex flex-col bg-gray-50 gap-3 shadow-md hover:shadow-xl hover:scale-105 duration-300 px-4 py-7 rounded-sm overflow-hidden">
      <div className="flex justify-center">
        <img
          className="w-72 h-48 object-contain hover:scale-110 duration-500"
          src={img}
          alt={title}
        />
      </div>
      <Link
        to={title}
        state={product}
        className="hover:text-rose-500 duration-300 flex justify-between items-center"
      >
        <h2 className="text-stone-950 font-semibold text-xl capitalize">
          {product.title.slice(0, 20)}
        </h2>
      </Link>
      <p className="text-sm text-gray-600">
        Brand: <span className="font-semibold capitalize">{brand}</span>
      </p>
      <p className="text-sm text-gray-600">
        Price: <span className="text-rose-500 font-semibold">{price}</span>
      </p>
      <div className="flex justify-between items-center">
        <Link
          to={title}
          state={product}
          className="hover:text-rose-50 text-gray-900 duration-300 flex justify-between items-center"
        >
          <button className="text-sky-400 px-2 py-1 border border-sky-400 rounded-md hover:bg-sky-400 hover:text-sky-50 duration-300">
            More Info
          </button>
        </Link>
        <button
          onClick={() => addToCart(product.id,product.img , product.title,product.brand,product.price)}
          className="bg-sky-400 text-sky-50 hover:bg-sky-50 hover:text-sky-400 duration-300 border border-sky-400 px-2 py-1 rounded-md"
        >
          add to cart
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;
