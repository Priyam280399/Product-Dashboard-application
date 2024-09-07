import React, { useState } from 'react';

// Filters component for price, popularity filtering, and sorting
const Filters = ({ setFilteredProducts, products }) => {
  const [priceRange, setPriceRange] = useState('');
  const [popularityRange, setPopularityRange] = useState('');
  const [sortBy, setSortBy] = useState('');

  // Handle filtering and sorting based on user selections
  const filterAndSortProducts = () => {
    let filtered = [...products];
    
    // Filter by price range
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split('-').map(Number);
      filtered = filtered.filter(product => product.price >= minPrice && product.price <= (maxPrice || Infinity));
    }

    // Filter by popularity range
    if (popularityRange) {
      const [minPop, maxPop] = popularityRange.split('-').map(Number);
      filtered = filtered.filter(product => product.popularity >= minPop && product.popularity <= (maxPop || Infinity));
    }

    // Sort based on selected option
    if (sortBy) {
      const [field, order] = sortBy.split('-');
      filtered.sort((a, b) => {
        if (order === 'asc') {
          return a[field] > b[field] ? 1 : -1;
        } else {
          return a[field] < b[field] ? 1 : -1;
        }
      });
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="filters">
      <div>
        <label>Price Range:</label>
        <select onChange={(e) => setPriceRange(e.target.value)}>
          <option value="">All</option>
          <option value="0-5000">0 - 5000</option>
          <option value="5000-10000">5000 - 10000</option>
          <option value="10000-20000">10000 - 20000</option>
          <option value="20000-">20000+</option>
        </select>
      </div>
      <div>
        <label>Popularity Range:</label>
        <select onChange={(e) => setPopularityRange(e.target.value)}>
          <option value="">All</option>
          <option value="0-10000">0 - 10000</option>
          <option value="10000-30000">10000 - 30000</option>
          <option value="30000-50000">30000 - 50000</option>
          <option value="50000-">50000+</option>
        </select>
      </div>
      <div>
        <label>Sort By:</label>
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="">None</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
          <option value="popularity-asc">Popularity (Low to High)</option>
          <option value="popularity-desc">Popularity (High to Low)</option>
        </select>
      </div>
      <button onClick={filterAndSortProducts}>Apply Filters</button>
    </div>
  );
};

export default Filters;
