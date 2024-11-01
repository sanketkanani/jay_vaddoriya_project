import React from 'react';
import serach from '../../assets/svg/search.svg';

const SearchBar = ({ setSearchQuery }) => {
  const handleSearch = (e) => {
    setSearchQuery(e.target.value); // Update search query state
  };

  return (
    <div>
      <div className="sub-section">
        <div className="w-[80%] border border-primary custom-shadow mx-auto p-3 flex bg-white gap-2 items-center justify-start !rounded-full z-50">
          <img src={serach} alt="" />
          <input
            type="search"
            placeholder="Search"
            className="border-none outline-none flex-1 bg-transparent text-sm text-secondary font-medium"
            onChange={handleSearch} // Call handleSearch on input change
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
