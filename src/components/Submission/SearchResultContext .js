// SearchResultContext.js

import React, { createContext, useState } from "react";

export const SearchResultContext = createContext();

export const SearchResultProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  // console.log(searchResults);
  return (
    <SearchResultContext.Provider value={{ searchResults, setSearchResults }}>
      {children}
    </SearchResultContext.Provider>
  );
};
