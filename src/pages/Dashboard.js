// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ProductList from '../components/ProductList';
// import SearchBar from '../components/SearchBar';
// import Filters from '../components/Filters';
// import Pagination from '../components/Pagination';
// import Data from '../Data/in.json';

// // Main Dashboard Component
// const Dashboard = () => {
//    console.log(Data);
//   // State to hold product data
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 20;
//      for(const x in Data.products ){
//           console.log( Data.products[`${x}`]);
//      }
//   // async function fetchdata() {
//   //   try {
//   //     const response = await fetch('https://cdn.drcode.ai/interview-materials/products.json', { method: "GET" });
      
//   //     if (!response.ok) {
//   //       throw new Error(`HTTP error! Status: ${response.status}`);
//   //     }
      
//   //     const data = await response.json();
//   //     console.log(data); // Process the data as needed
//   //   } catch (error) {
//   //     console.error('Error fetching data:', error);
//   //   }
//   // }
  
//   // Fetch product data from API
//   useEffect(() => {
//     // fetchdata()
//     // axios.get('https://thingproxy.freeboard.io/fetch/https://cdn.drcode.ai/interview-materials/products.json')
//     //   .then(response => {
//     //     setProducts(response.data);
//     //     setFilteredProducts(response.data);
//     //     setLoading(false);
//     //   })
//     //   .catch(error => {
//     //     setError('Failed to fetch products. Please try again.');
//     //     setLoading(false);
//     //   });
//   }, []);

//   // Handle search functionality
//   useEffect(() => {
//     const results = products.filter(product =>
//       product.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredProducts(results);
//   }, [searchTerm, products]);

//   // Pagination calculations
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="dashboard">
//       <h1>Product Dashboard</h1>
//       {loading ? <p>Loading...</p> : null}
//       {error ? <p>{error}</p> : null}
//       {/* Search Bar Component */}
//       <SearchBar setSearchTerm={setSearchTerm} />
//       {/* Filter Component */}
//       <Filters setFilteredProducts={setFilteredProducts} products={products} />
//       {/* Product List Component */}
//       <ProductList products={currentProducts} />
//       {/* Pagination Component */}
//       <Pagination
//         productsPerPage={productsPerPage}
//         totalProducts={filteredProducts.length}
//         paginate={paginate}
//         currentPage={currentPage}
//       />
//     </div>
//   );
// };

// export default Dashboard;
// Dashboard.js
import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import Data from '../Data/in.json'; // Assuming Data is an object with a products property

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  useEffect(() => {
    if (Data.products && typeof Data.products === 'object') {
      const productsArray = Object.values(Data.products);
      setProducts(productsArray);
      setFilteredProducts(productsArray);
    } else {
      console.error('Data.products is not an object', Data.products);
      setError('Failed to load products. Data is not in expected format.');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (Array.isArray(products)) {
      const results = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      console.error('Products is not an array', products);
    }
  }, [searchTerm, products]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    if (pageNumber < 1) pageNumber = 1;
    if (pageNumber > Math.ceil(filteredProducts.length / productsPerPage)) pageNumber = Math.ceil(filteredProducts.length / productsPerPage);
    setCurrentPage(pageNumber);
  };

  return (
    <div className="dashboard">
      <h1>Product Dashboard</h1>
      {loading ? <p>Loading...</p> : null}
      {error ? <p>{error}</p> : null}

      {/* Search Bar */}
      <div className="search-bar">
        <SearchBar setSearchTerm={setSearchTerm} />
      </div>

      {/* Filters */}
      <div className="filters">
        <Filters setFilteredProducts={setFilteredProducts} products={products} />
      </div>

      {/* Product List */}
      <div className="product-list">
        <ProductList products={currentProducts} />
      </div>

      {/* Pagination */}
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Dashboard;
