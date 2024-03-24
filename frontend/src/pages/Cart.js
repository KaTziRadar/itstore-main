import { Link } from "react-router-dom";
import './Cart.css';
import { NavLink } from "react-router-dom";

const Cart = (cart) => {
  console.log(cart);

  const continueShopping = () => {
   window.location.href='/product'
}

const convertToInteger = (str) => {
  return parseInt(str.replace(/[^0-9]/g, ''), 10);
};

const handleQuantityChange = (productId, change) => {
  cart.setCart(prevCart => {
      const updatedCart = prevCart.map(item => {
          if (item.id === productId) {
              const newQuantity = item.quantity + change;
              if (newQuantity <= 0) {
                  // If new quantity is zero or negative, remove the item from cart
                  return null;
              }
              return { ...item, quantity: newQuantity };
          }
          return item;
      });
      // Filter out null values (items with zero quantity)
      return updatedCart.filter(item => item !== null);
  });
}
const totalPrice = cart.cart.reduce((total, product) => total + (convertToInteger(product.price) * product.quantity), 0);

return (
  <div id="cart" className="cart-container">
      {cart.cart.length === 0 ? (
          <div>
              <p>Cart is empty</p>
              <button onClick={continueShopping}>Continue Shopping</button>
          </div>
      ) : (
          <div>
              {cart.cart.map(product => (
                  <div key={product.id} className="product">
                      <img src={product.img} alt={product.title} />
                      <div className="product-details">
                          <h3>{product.title}</h3>
                          <p>Brand: {product.brand}</p>
                          <p>Price: ${product.price}</p>
                          <p>Quantity: {product.quantity}</p>
                          <button onClick={() => handleQuantityChange(product.id, 1)}>Add</button>
                          <button onClick={() => handleQuantityChange(product.id, -1)}>Delete</button>
                      </div>
                  </div>
              ))}
              <p className="total-price">Total Price: ${totalPrice.toFixed(2)}</p>
          </div>
      )}
  </div>
);
}

export default Cart;
