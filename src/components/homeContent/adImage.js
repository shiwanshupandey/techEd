import React, {Link,useState, useEffect, useContext} from "react";
import "../../components/homeContent/adImage.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import { useFilterContext } from "../context/filter_context";
import { useNavigate } from "react-router-dom";


function AdImage() {
  const { updateFilterValue, filters, all_products } = useFilterContext();
  const [searchResults, setSearchResults] = useState([]);
  const [showResultsPopup, setShowResultsPopup] = useState(false);
  const navigate = useNavigate(); 

  const imageUrls = [
    "https://images.unsplash.com/photo-1696084087414-3e86de567929?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?auto=format&fit=crop&q=80&w=2083&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1494178270175-e96de2971df9?auto=format&fit=crop&q=80&w=1980&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const handleSearch = (e) => {
    const searchText = e.target.value;
    updateFilterValue(e);
    if (searchText.trim() === "") {
      setSearchResults([]);
      setShowResultsPopup(false);
      return;
    }

    const filteredResults = all_products.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );

    setSearchResults(filteredResults);
    setShowResultsPopup(true);
  };

  const handleSearchIconClick = () => {
    if (searchResults.length > 0) {
      const firstSearchResult = searchResults[0];
      navigate(`/singleproduct/${firstSearchResult._id}`);
    }
  };
  

  const handleResultClick = (_id) => {
    navigate(`/singleproduct/${_id}`); // Handle click on a search result
  };


  return (
    <div className="adImageDiv">
    <div className="offerDiv">
      <h2>Learn on your schedule</h2>
      <p>Study any topic, anytime. Explore thousands of courses.</p>

      <div className="searchBarDiv">
          <input
            className="searchBar"
            placeholder="What do you want to learn?"
            onChange={handleSearch}
          />
          <div className="searchIconDiv">
            <SearchOutlinedIcon
              className="icon"
              onClick={handleSearchIconClick}
            />
          </div>
          <div className="filter-search"></div>

          {showResultsPopup && (
            <div className="search-results-popup">
              {searchResults.map((result) => (
                <div
                  key={result._id}
                  className="search-result-item"
                  onClick={() => handleResultClick(result._id)}
                >
                  {result.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    <Carousel autoPlay infiniteLoop showThumbs={false} interval={3000} showArrows={false}>
  {imageUrls.map((imageUrl, index) => (
    <div key={index}>
      <img className="adImage" src={imageUrl} alt={`AdImage ${index}`} />
    </div>
  ))}
</Carousel>

  </div>
  );
}

export default AdImage;
