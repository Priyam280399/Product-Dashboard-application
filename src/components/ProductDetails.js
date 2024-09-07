import React from 'react';

// Product Details component for showing detailed info in a modal
const ProductDetails = ({ product }) => {
  return (
    <div className="product-details">
      <h2>{product.title}</h2>
      <p>Price: {product.price}</p>
      <p>Popularity: {product.popularity}</p>
      <p>Description: {product.description || 'No description available.'}</p>
    </div>
  );
};

export default ProductDetails;
