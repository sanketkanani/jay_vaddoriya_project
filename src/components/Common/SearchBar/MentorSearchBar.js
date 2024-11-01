import React, { useState, useContext } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation } from "react-router-dom";
import { useCookie } from "react-use";
import { SearchResultContext } from "../../Submission/SearchResultContext ";
import { ApiBaseURL } from "../../../services/config/Endpoints";
// import { ApiBaseURL, ApiEndpoints } from "../../ApiConfig";
const MentorSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const [loggedIn] = useCookie("maang");
  const { setSearchResults } = useContext(SearchResultContext);

  const handleSearch = async () => {
    if (searchTerm !== "" && location.pathname === "/mentor/submission") {
      try {
        // console.log("Searching with term:", searchTerm);

        const ongoingResponse = await fetch(
          `${ApiBaseURL}mentor-management/inst-search-ongoing-data/?search_name=${searchTerm}`,
          {
            headers: {
              Authorization: `Token ${JSON.parse(loggedIn).token}`,
            },
          }
        );

        const prevResponse = await fetch(
          `${ApiBaseURL}mentor-management/inst-search-prev-data/?search_name=${searchTerm}`,
          {
            headers: {
              Authorization: `Token ${JSON.parse(loggedIn).token}`,
            },
          }
        );

        if (ongoingResponse.ok && prevResponse.ok) {
          const ongoingData = await ongoingResponse.json();
          const prevData = await prevResponse.json();

          if (ongoingData.ongoing_data.length > 0) {
            // console.log(
            //   "Showing results from ongoing API:",
            //   ongoingData.ongoing_data
            // );
            setSearchResults(ongoingData.ongoing_data);
          } else if (prevData.previous_data.length > 0) {
            // console.log(
            //   "Showing results from previous API:",
            //   prevData.previous_data
            // );
            setSearchResults(prevData.previous_data);
          } else {
            // console.log("No search results found");
            setSearchResults([]);
          }
        } else if (ongoingResponse.ok) {
          const ongoingData = await ongoingResponse.json();
          // console.log(
          //   "Showing results from ongoing API:",
          //   ongoingData.ongoing_data
          // );
          setSearchResults(ongoingData.ongoing_data);
        } else if (prevResponse.ok) {
          const prevData = await prevResponse.json();
          // console.log(
          //   "Showing results from previous API:",
          //   prevData.previous_data
          // );
          setSearchResults(prevData.previous_data);
        } else {
          console.error("Failed to fetch data from both APIs");
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setSearchResults([]);
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

export default MentorSearchBar;
