import styled from "styled-components";
import CategoryFilter from "./CategoryFilter";
import ProductList from "../ProductList";
import Sort from "../Sort";
import { useFilterContext } from "../../context/filter_context";

const Category = () => {
  return (
    <Wrapper>
      <div className="container grid grid-filter-column">
        <div>
          <CategoryFilter />
        </div>

        <section className="product-view--sort">
          <div className="sort-filter">
            <Sort />
          </div>
          <div className="main-product">
            <ProductList />
          </div>
        </section>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .grid-filter-column {
    grid-template-columns: 0.2fr 1fr;
  }

`;

export default Category;
