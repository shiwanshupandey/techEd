// styles.js

import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  th {
    background-color: #f2f2f2;
  }
`;

export const AttendanceContainer = styled.section`
  margin: 20px auto;
  max-width: 1500px;
`;

export const AttendanceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h3 {
    margin: 0;
  }
`;

export const LinkButton = styled(Link)`
  background-color: #0074d9;
  color: #fff;
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 4px;
  margin-right: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5bc0de;
    color: black;
  }

  &:active {
    background-color: black;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const EditButton = styled(Link)`
  background-color: #0074d9;
  color: #fff;
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 4px;
  margin-right: 8px;

  &:hover {
    background-color: #0056a4;
  }
`;

export const DeleteButton = styled.button`
  background-color: #dc3545;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #bd2130;
  }
`;
