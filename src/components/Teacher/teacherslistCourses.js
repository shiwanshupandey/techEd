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
} from '../Admin/styles.js';



const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 50) : text}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? "...read more" : " show less"}
      </span>
    </p>
  );
};


const Courses = (props) => (
  <React.Fragment>
    {props.courses.products.map((product, index) => (
      <tr key={product._id}>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>{product.category}</td>
        <td>{product.section}</td>
        <td>{product.creator}</td>
        <td>
          {product.description ? (
            <ReadMore>{product.description}</ReadMore>
          ) : null}
        </td>
        
        <td>
          <ActionButtons>
          <EditButton className="btn btn-secondary edit-button">
            <Link to={`/edit-courses/${product._id}`} style={{ color: 'white' }}>
              Edit
            </Link>
          </EditButton>{' '}
          <span className="separator">|</span>{' '}
          <DeleteButton
            className="btn btn-danger delete-button"
            onClick={() => {
              props.deleteCourses(props.courses._id,product._id);
            }}
          >
            Delete
          </DeleteButton>
          </ActionButtons>
          
        </td>
      </tr>
    ))}
  </React.Fragment>
);



class TeacherListCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [{
        products: [],
      }],
    };
    this.deleteCourses = this.deleteCourses.bind(this);
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/teacher/')
      .then((res) => {
		console.log('API Response:', res.data);
        this.setState({ courses: res.data });
      })
      .catch((error) => {
		console.error(error);
	  });
    
  }

  deleteCourses(teacherId, productId) {
    const shouldDelete = window.confirm('Are you sure you want to delete this course?');
    if (!shouldDelete) {
      return; // Don't delete if the user cancels
    }
  
    axios
      .delete(`http://localhost:5000/teacher/${teacherId}/${productId}`)
      .then((res) => {
        // console.log(res.data);
        // Handle success, e.g., remove the course from the state.
        this.setState({
          courses: this.state.courses.map((currentCourses) => ({
            ...currentCourses,
            products: currentCourses.products.filter((el) => el._id !== productId),
          })),
        });
      })
      .catch((error) => {
        console.error(error);
        // Handle error, display a message, etc.
      });
  }
  
  

  coursesList() {
    if (!Array.isArray(this.state.courses) || this.state.courses.length === 0) {
      return (
        <tr>
          <td colSpan="6">No users found.</td>
        </tr>
      );
    }

    return this.state.courses.map((currentCourses) => (
      <Courses courses={currentCourses} deleteCourses={this.deleteCourses} key={currentCourses._id} />
    ));
  }

  render() {
    return (
      <AttendanceContainer>
        <AttendanceHeader>
        <h3>All Courses</h3>
		<LinkButton to="/create-courses" className="button-link">
		<h6>create_Courses</h6>
		</LinkButton>
        </AttendanceHeader>
        <StyledTable className="table">
          <thead className="thead-light">
            <tr>
              <th>id</th>
              <th>name</th>
              <th>price</th>
              <th>category</th>
              <th>section</th>
              <th>creator</th>
              <th>description</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>{this.coursesList()}</tbody>
        </StyledTable>
      
      </AttendanceContainer>
      
    );
  }
}


export default TeacherListCourses;


