import React, { createContext, useState, useContext, useCallback } from "react";
import BASE_URL from "../Helper/Helper";

const SearchContext = createContext();

export const useSearch = () => {
  return useContext(SearchContext);
};

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  
  const handleSearch = useCallback(async (term) => {
    setSearchTerm(term);
    if (term.trim()) {
      try {
        const response = await fetch(
          `${BASE_URL}/product/get-product?search=${term}`
        );
        const data = await response.json();
        const filteredResults = data.filter((product) =>
          product.title.toLowerCase().includes(term.toLowerCase())
        );
        setSearchResults(filteredResults);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    } else {
      setSearchResults([]);
    }
  }, []);

  return (
    <SearchContext.Provider value={{ searchTerm, searchResults, handleSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
