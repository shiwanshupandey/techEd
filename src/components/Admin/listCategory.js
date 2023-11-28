import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from "styled-components";
import {
  StyledTable,
  AttendanceContainer,
  AttendanceHeader,
  LinkButton,
  ActionButtons,
  EditButton,
  DeleteButton,
} from './styles';

const CategoryRow = (props) => (
  <tr>
    <td>{props.category.category}</td>
    <td>
      <ActionButtons>
      <EditButton className="btn btn-secondary">
        <Link to={`/edit-category/${props.category._id}`} style={{ color: 'white' }}>
          Edit
        </Link>
      </EditButton>{' '}
      ||{' '}
      <DeleteButton
        className="btn btn-danger"
        onClick={() => {
          props.deleteCategory(props.category._id);
        }}
      >
        Delete
      </DeleteButton>
      </ActionButtons>
      
    </td>
  </tr>
);

class ListCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
        category: [],
      error: null,
    };
    this.deleteCategory = this.deleteCategory.bind(this);
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/category')
      .then((res) => {
        this.setState({ category: res.data });
      })
      .catch((error) => {
        this.setState({ error });
      });
  }

  deleteCategory(_id) {
    const shouldDelete = window.confirm('Are you sure you want to delete this category?');
    if (!shouldDelete) {
      return; // Don't delete if the user cancels
    }
    
    axios.delete(`http://localhost:5000/category/${_id}`).then((res) => {
      console.log(res.data);
    });
    this.setState({ category: this.state.category.filter((el) => el._id !== _id) });
  }

  categoryList() {
    const { category } = this.state;

    if (!Array.isArray(category) || category.length === 0) {
      return (
        <tr>
          <td colSpan="6">No category found.</td>
        </tr>
      );
    }

    return category.map((currentCategory) => (
      <CategoryRow
        category={currentCategory}
        deleteCategory={this.deleteCategory}
        key={currentCategory._id}
      />
    ));
  }

  render() {
    return (
      <AttendanceContainer>
        <AttendanceHeader>
        <h3>Logged Category</h3>
        <LinkButton to="/create-category" className="button-link">
          <h6>Create category</h6>
        </LinkButton>
        </AttendanceHeader>
        
        <StyledTable className="table">
          <thead className="thead-light">
            <tr>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.categoryList()}</tbody>
        </StyledTable>
      </AttendanceContainer>
    );
  }
}


const Wrapper = styled.section`
/* In your component's stylesheet or a global stylesheet */
.button-link {
  display: inline-block;
  background-color: #0074d9; /* Button background color */
  color: #fff; /* Text color */
  padding: 10px 20px; /* Padding for spacing */
  text-decoration: none; /* Remove underlines from links */
  border-radius: 4px; /* Rounded corners */
  text-align: center; /* Center text within the button */
}

.button-link:hover {
  background-color: #0056a4; /* Darker color on hover */
}


`


export default ListCategory;
