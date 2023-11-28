import styled from "styled-components";
import { useFilterContext } from "../../context/filter_context";
import { Button } from "../../styles/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // Use an appropriate Font Awesome icon


const FilterSection = () => {
  const {
    filters: { text, category},
    updateFilterValue,
    all_products,
    clearFilters,
  } = useFilterContext();

  // get the unique values of each property
  const getUniqueData = (data, attr) => {
    let newVal = data.map((curElem) => {
      return curElem[attr];
    });

    return (newVal = ["all", ...new Set(newVal)]);
  };


  const categoryData = getUniqueData(all_products, "category");


  return (
    <Wrapper>
      <div className="filter-category type">
  <h3>Category</h3>
  <div className="category-buttons">
    {categoryData.map((curElem, index) => {
      return (
        <button
          key={index}
          type="button"
          name="category"
          value={curElem}
          className={curElem === category ? "active" : ""}
          onClick={updateFilterValue}
        >
          {curElem}
        </button>
      );
    })}
  </div>
</div>
<div className="filter-search">
  <form onSubmit={(e) => e.preventDefault()}>
    <div className="search-container">
      <FontAwesomeIcon icon={faSearch} className="search-icon" />
      <input
        type="text"
        name="text"
        placeholder="Search"
        value={text}
        onChange={updateFilterValue}
      />
    </div>
  </form>
</div>




      <div className="filter-clear">
        <Button className="btn" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
/* Add this CSS to your styles */
.search-container {
  display: flex;
  align-items: center;
  background: #f2f2f2;
  border-radius: 2rem;
  padding: 0.5rem 1rem;
}

.search-icon {
  margin-right: 0.5rem; /* Adjust the spacing as needed */
}


/* Add this CSS to your styles */
.filter-search {
  background: #f2f2f2;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;

  form {
    width: 100%;
  }

  input {
    width: 100%;
    border: none;
    border-radius: 2rem;
    padding: 0.5rem 1rem;
    outline: none;
    font-size: 1rem;
  }
}


/* Add this CSS to your styles */
.category-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
}

.filter-category.type h3 {
  text-align: center;
}

.filter-category.type button {
  background: transparent;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  text-transform: capitalize;
  font-size: 1rem;
  border: 2px solid transparent;
  border-radius: 0.5rem;

  &.active {
    border-color: #000;
    font-weight: bold;
  }

  &:hover {
    text-decoration: underline;
  }
}

  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  h3 {
    padding: 2rem 0;
    font-size: bold;
  }

  .filter-search {
    background: #f2f2f2;
    border-radius: 4rem;
    input {
      padding: 0.6rem 1rem;
      width: 80%;
      border-color: black;
      border-radius:20%;
    }
  }

  .filter-clear .btn {
    background-color: #ec7063;
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
  }

  .filter-category {
    div {
      display: center;
      flex-direction: row;
      align-items: flex-start;
      gap: 1.4rem;

      button {
        border: 4rem;
        margin-left: 50px;

        text-transform: capitalize;
        cursor: pointer;

        &:hover {

        }
      }

      .active {
        border-bottom: 1px solid #000;

      }
    }
  }

  .filter-teachers--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;

    text-transform: capitalize;
  }

  .filter-color-style {
    display: flex;
    justify-content: center;
  }

  .color-all--style {
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    cursor: pointer;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  .filter_price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }

  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .filter-clear .btn {
    background-color: #ec7063;
    color: #000;
  }

  /* Add this to your CSS */
.filter-category.type {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.filter-category.type h3 {
  text-align: center;
}

.filter-category.type div {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center; /* Center-align the buttons */
}
`;

export default FilterSection;