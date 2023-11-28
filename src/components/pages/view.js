import { NavLink } from "react-router-dom";
import styled from "styled-components";
import FormatPrice from "../../Helper/FormatPrice";
import { Button } from "../styles/Button";
import React, { useEffect, useState } from 'react';
import AddToCart from "./AddToCart";


const View = ({ products }) => {
  
    return (
        <Wrapper className="section">
          <div className="container grid">
            {products.map((curElem) => {
              const { _id, name, creator, image, price, section } = curElem;
              const description = curElem.description || '';
    
              return (
                <div className="card grid grid-two-column" key={_id}>
                  <NavLink to={`/singleproduct/${_id}`} className="btn-main">
                    <figure>
                      <img src={image} alt={name} />
                    </figure>
                  </NavLink>
    
                  <div className="card-data">
                    <h3>{name}</h3>
                    <h4>{creator}</h4>
                    <h5>{section}</h5>
                    <p>
                      <FormatPrice price={price} />
                    </p>
                    <p>{description.slice(0, 100)}...</p>
                    <AddToCart product={curElem} />
                  </div>
                </div>
              );
            })}
          </div>
        </Wrapper>
      );
    };

const Wrapper = styled.section`
  padding: 9rem 0;

  .container {
    max-width: 120rem;
  }

  .grid {
    gap: 3.2rem;
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
    }
    &:hover img {
      transform: scale(1.2);
    }
    img {
      max-width: 90%;
      margin-top: 1.5rem;
      height: 20rem;
      transition: all 0.2s linear;
      border-radius: 2rem;
    }
  }

  .card {
    border: 0.1rem solid rgb(170 170 170 / 40%);
    margin-bottom: 2rem;

    .card-data {
      padding: 0 2rem;
    }

    h3 {
      margin: 2rem 0;
      font-weight: 300;
      font-size: 2.4rem;
      text-transform: capitalize;
    }

    .btn {
      margin: 2rem 0;
      background-color: rgb(0 0 0 / 0%);
      border: 0.1rem solid rgb(98 84 243);
      display: center;
      justify-content: center;
      align-items: center;
      color: black;

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

    .btn-main .btn:hover {
      color: #fff;
    }
  }
`;

export default View;