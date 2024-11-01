import React, { useState, useContext } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation } from "react-router-dom";
import { useCookie } from "react-use";
import { SearchResultContext } from "../../Submission/SearchResultContext ";
import { parseISO, isSameDay } from "date-fns";
import { ApiBaseURL } from "../../../services/config/Endpoints";
// import { ApiBaseURL, ApiEndpoints } from "../../ApiConfig";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const [loggedIn] = useCookie("maang");
  const { setSearchResults } = useContext(SearchResultContext);

  const handleSearch = async () => {
    if (searchTerm !== "" && location.pathname === "/student/submission") {
      try {
        const response = await fetch(
          `${ApiBaseURL}test-management/search-data/?search_name=${searchTerm}`,
          {
            headers: {
              Authorization: `Token ${JSON.parse(loggedIn).token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    if (value === "") {
      setSearchResults([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Paper
      component="form"
      className="rounded-lg"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 200 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search..."
        inputProps={{ "aria-label": "search..." }}
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown} // Adding keydown event listener
      />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={handleSearch}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
