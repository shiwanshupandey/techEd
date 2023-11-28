import React from "react";
import styled from "styled-components";
import Product from "./Product";

const GridView = ({ products }) => {

  return (
    <Wrapper className="section">
      <div className="container grid grid-three-column">
        {products.map((curElem) => {
          return <Product key={curElem.id} {...curElem} />;
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
/* GridView.css */

.section {
  padding: 2rem;
}

.container {
  max-width: 120rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3.2rem;
}

.grid {
  gap: 5rem;
  padding: 2rem;
}

/* Add any additional styles or adjustments as needed */

/* Responsive Styles */
@media (max-width: 1024px) {
  .container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
  }
}



`;

export default GridView;