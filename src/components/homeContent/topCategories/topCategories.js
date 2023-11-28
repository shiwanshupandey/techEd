import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./topCategories.css";
import CategoryCard from "./categoryCard";
import { useFilterContext } from "../../context/filter_context";
import styled from "styled-components";
import { Link } from 'react-router-dom'; 


function TopCategories() {

  const [categories, setCategories] = useState([]);

  useEffect(() => {

    axios.get('http://localhost:5000/products/categories')
      .then((response) => {
        const sortedCategories = response.data.sort();
        setCategories(sortedCategories);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    // <div className="topCategories">
    //   <h2 className="categoryHeading">Top Categories</h2>
    //   <div className="categories">
    //     <CategoryCard
    //       imgSrc={
    //         "https://s.udemycdn.com/home/top-categories/lohp-category-design.jpg"
    //       }
    //       title={"Maths"}
    //     />
    //     <CategoryCard
    //       imgSrc={
    //         "https://s.udemycdn.com/home/top-categories/lohp-category-development.jpg"
    //       }
    //       title={"Development"}
    //     />
    //     <CategoryCard
    //       imgSrc={
    //         "https://s.udemycdn.com/home/top-categories/lohp-category-marketing.jpg"
    //       }
    //       title={"History"}
    //     />
    //     <CategoryCard
    //       imgSrc={
    //         "https://s.udemycdn.com/home/top-categories/lohp-category-it-and-software.jpg"
    //       }
    //       title={"Science"}
    //     />
    //     <CategoryCard
    //       imgSrc={
    //         "https://s.udemycdn.com/home/top-categories/lohp-category-personal-development.jpg"
    //       }
    //       title={"geography"}
    //     />
    //     <CategoryCard
    //       imgSrc={
    //         "https://s.udemycdn.com/home/top-categories/lohp-category-business.jpg"
    //       }
    //       title={"English"}
    //     />
    //     <CategoryCard
    //       imgSrc={
    //         "https://s.udemycdn.com/home/top-categories/lohp-category-photography.jpg"
    //       }
    //       title={"Photography"}
    //     />
    //     <CategoryCard
    //       imgSrc={
    //         "https://s.udemycdn.com/home/top-categories/lohp-category-music.jpg"
    //       }
    //       title={"Music"}
    //     />
    //   </div>
    // </div>

    <div>
    <h2>Categories</h2>
    <ul>
      {categories.map((category, index) => (
        <li key={index}>
          <Link to={`/products/${category}`}>{category}</Link>
        </li>
      ))}
    </ul>
  </div>

    
  );
}



const Wrapper = styled.section`
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

export default TopCategories;
