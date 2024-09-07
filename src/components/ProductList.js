import React, { useState } from 'react';
import ProductDetails from './ProductDetails';

// Product List component that displays products in a table
const ProductList = ({ products }) => {
  // State to track the selected product for details
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Function to handle product click and show details
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowDetails(true);
  };

  // Function to close the product details view
  const closeDetails = () => {
    setShowDetails(false);
    setSelectedProduct(null);
  };

  // Inline styles
  const tableContainerStyle = {
    overflowX: 'auto',
    padding: '1rem',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '1rem',
  };

  const thStyle = {
    backgroundColor: '#f4f4f4',
    padding: '0.5rem',
    textAlign: 'left',
    fontWeight: 'bold',
  };

  const titleStyle = {
    color: '#007bff',
    fontWeight: 'bold',
  };

  const priceStyle = {
    color: '#28a745',
    fontWeight: 'bold',
  };

  const popularityStyle = {
    color: '#dc3545',
    fontWeight: 'bold',
  };

  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '2rem',
    border: '1px solid #ddd',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    zIndex: '1000',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    borderRadius: '4px',
    marginTop: '1rem',
  };

  return (
    <div>
      <div style={tableContainerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Popularity</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr
                key={product.id}
                onClick={() => handleProductClick(product)}
              >
                <td style={titleStyle}>{product.title}</td>
                <td style={priceStyle}>{product.price}</td>
                <td style={popularityStyle}>{product.popularity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Show product details when a product is clicked */}
      {showDetails && selectedProduct && (
        <div style={modalStyle}>
          <ProductDetails product={selectedProduct} />
          <button onClick={closeDetails} style={buttonStyle}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
