import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const PageNavigation = ({ title }) => {
  return (
    <Wrapper>
      <NavLink to="/">Home</NavLink>/{title}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  height: 3rem;
  background-color: #fff!important;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 1rem;
  padding-left: 2rem;


  a {
    font-size: 1.5rem;
  }
`;

export default PageNavigation;