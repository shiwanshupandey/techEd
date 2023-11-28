import { useProductContext} from "../../context/productcontext";
import styled from "styled-components";
import Product from "../../pages/Product";

const BoughtProducts = () => {
  const { isLoading, boughtProducts } = useProductContext();

  // console.log("~ file , boughtProducts",boughtProducts);

  if (isLoading) {
    return <div> ......Loading </div>;
  }

  return (
    <Wrapper className="section">
      <div className="container">
        <div className="grid grid-three-column">
          {boughtProducts.map((curElem) => {
            return <Product key={curElem.id} {...curElem} />;
          })}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 9rem 0;


  .container {
    max-width: 80rem;
  }

  figure {
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    transition: all 0.5s linear;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      transition: all 0.2s linear;
      cursor: pointer;
    }
    &:hover::after {
      width: 100%;
      border-radius: 5rem;
    }
    &:hover img {
      transform: scale(1.2);
      border-radius: 5rem;
    }
    img {
      max-width: 100%;
      margin-top: 1rem;
      height: 20rem;
      transition: all 0.2s linear;
    }

    .caption {
      position: absolute;
      top: 15%;
      right: 10%;
      text-transform: uppercase;
      padding: 0.8rem 2rem;
      font-size: 1.2rem;
      border-radius: 2rem;
    }
  }

  .card {
    background-color: #fff;
    border-radius: 5rem;
    margin : 20px;

    .card-data {
      padding: 0 2rem;
    }

    .card-data-flex {
      margin: 2rem 2rem;
      display: center;
      justify-content: space-between;
      align-items: center;
      margin-left:4rem;
      gap:4rem;
    }

    h3 {

      text-transform: capitalize;
    }

    .card-data--price {

    }

    .btn {
      margin: 2rem auto;
      background-color: rgb(0 0 0 / 0%);
      border: 0.1rem solid rgb(98 84 243);
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        background-color: rgb(98 84 243);
      }

      &:hover a {
        color: #fff;
      }
      a {
        color: rgb(98 84 243);
        font-size: 1.4rem;
      }
    }
  }
`;

export default BoughtProducts;

