import React, { useState } from 'react';

function Adar() {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const products = [
    { id: 1, pro: 'Product A', price: 20 },
    { id: 2, pro: 'Product B', price: 30 },
    { id: 3, pro: 'Product C', price: 40 },
    { id: 4, pro: 'Product D', price: 50 }
  ];

  const filteredProducts = products.filter(product => {
    const price = parseFloat(product.price);
    return (minPrice === '' || price >= parseFloat(minPrice)) && (maxPrice === '' || price <= parseFloat(maxPrice));
  });

  return (
    <div>
      <h1>Store Website</h1>
      <div>
        <label htmlFor="minPrice">Minimum Price:</label>
        <input type="number" id="minPrice" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
      </div>
      <div>
        <label htmlFor="maxPrice">Maximum Price:</label>
        <input type="number" id="maxPrice" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
      </div>
      <div>
        {filteredProducts.map(product => (
          <div key={product.id} className="product">
            {product.pro} - ${product.price}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Adar;
