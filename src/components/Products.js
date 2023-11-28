import styled from "styled-components";
import FilterSection from "./pages/FilterSection";
import ProductList from "./pages/ProductList";
import Sort from "./pages/Sort";
import { useFilterContext } from "./context/filter_context";


const Courses = () => {
  return (
    <Wrapper>
      <div className="container grid grid-filter-column">
        <div>
          <FilterSection />
        </div>

        <section className="courses-view--sort">
          <div className="sort-filter">
            <Sort />
          </div>
          <div className="main-courses">
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

export default Courses;