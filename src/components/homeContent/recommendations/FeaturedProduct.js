import { useProductContext } from "../../context/productcontext";
import styled from "styled-components";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Product from "../../pages/Product";
import { useState, useEffect } from 'react';

const FeatureProduct = () => {
  const { isLoading, featureProducts } = useProductContext();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      const interval = setInterval(() => {
        const nextSlide = (activeSlide + 1) % groupedProducts.length;
        setActiveSlide(nextSlide);
      }, 3000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [activeSlide, isLoading]);

  const groupedProducts = [];
  if (!isLoading) {
    for (let i = 0; i < featureProducts.length; i += 3) {
      groupedProducts.push(featureProducts.slice(i, i + 3));
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      const prevSlide = (activeSlide - 1 + groupedProducts.length) % groupedProducts.length;
      setActiveSlide(prevSlide);
    } else if (event.key === 'ArrowRight') {
      const nextSlide = (activeSlide + 1) % groupedProducts.length;
      setActiveSlide(nextSlide);
    }
  };

  return (
    <Wrapper className="section" onKeyDown={handleKeyDown} tabIndex="0">
      <div className="container">
        <Carousel
          showArrows={true}
          showStatus={false}
          showThumbs={false}
          selectedItem={activeSlide}
        >
          {groupedProducts.map((group, groupIndex) => (
            <div key={groupIndex}>
              <div className="grid grid-three-column">
                {group.map((curElem) => (
                  <Product key={curElem._id} {...curElem} />
                ))}
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
padding: 2rem 0;

.container {
  width: 100%;
  max-width: 80rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Display three columns */
  gap: 2rem; /* Adjust the gap between grid items */
}

.card {
  background-color: #fff;
  border-radius: 2rem;
  box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-0.2rem);
    box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.2);
  }

  figure {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    transition: all 0.5s linear;
    cursor: pointer;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      
      transition: all 0.2s linear;
      border-radius: 2rem; /* Rounded overlay */
    }

    &:hover::after {
      width: 100%;
    }

    img {
      max-width: 100%;
      height: auto;
      transition: transform 0.3s ease-in-out;
      border-radius: 2rem;

      &:hover {
        transform: scale(1.05);
      }
    }

    .caption {
      position: absolute;
      top: 15%;
      right: 10%;
      text-transform: uppercase;
      padding: 0.8rem 2rem;
      font-size: 1.2rem;
      border-radius: 2rem;
      background-color: #007bff;
      color: #fff;
    }
  }

  .card-data {
    padding: 1rem 2rem;
  }

  h3 {
    display: flex;
    justify-content: center;
    margin-top: 0;
    font-size: 1.8rem;
    font-weight: 300;
  }

  .card-data--price {
    display: flex;
    justify-content: center;
    font-size: 1.6rem;
    font-weight: 300;
    color: #007bff;
  }

  .btn {
    margin: 1rem auto;
    border: 0.1rem solid #007bff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem 1rem;
    font-size: 1rem;

    &:hover {
      background-color: #007bff;
      color: #fff;
    }
  }
}

`;

export default FeatureProduct;

