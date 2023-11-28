import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from "styled-components";



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
  <tr>
    <td>{props.courses.id}</td>
    <td>{props.courses.name}</td>
    <td>{props.courses.price}</td>
    <td>{props.courses.category}</td>
    <td>{props.courses.section}</td>
    <td>{props.courses.creator.fullname}</td>
    <td><ReadMore>{props.courses.description}</ReadMore></td>
    {/* <td>{props.courses.review}</td> */}
    {/* <td>{props.courses.stars}</td> */}
    <td>
      <ActionButtons>
      <EditButton className="btn btn-secondary edit-button">
    <Link to={`/edit-courses/${props.courses._id}`} style={{ color: 'white' }}>
      Edit
    </Link>
  </EditButton>
  <span className="separator">||</span>
  <DeleteButton
    className="btn btn-danger delete-button"
    onClick={() => {
      props.deleteCourses(props.courses._id);
    }}
  >
    Delete
  </DeleteButton>
      </ActionButtons>
  
</td>

  </tr>
);

class ListCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
    };
    this.deleteCourses = this.deleteCourses.bind(this);
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/products/get/')
      .then((res) => {
		console.log('API Response:', res.data);
        this.setState({ courses: res.data });
      })
      .catch((error) => {
		console.error(error);
	  });
  }

  deleteCourses(_id) {
    const shouldDelete = window.confirm('Are you sure you want to delete this course?');
    if (!shouldDelete) {
      return; // Don't delete if the user cancels
    }
    
    axios.delete(`http://localhost:5000/products/delete/${_id}`).then((res) => {
      console.log(res.data);
    });
    this.setState({ courses: this.state.courses.filter((el) => el._id !== _id) });
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
            <h6>Create Courses</h6>
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
                {/* <th>review</th> */}
                {/* <th>stars</th> */}
                <th>actions</th>
              </tr>
            </thead>
            <tbody>{this.coursesList()}</tbody>
          </StyledTable>
        
        </AttendanceContainer>
      
    );
  }
}



const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center; /* Center-align table headers */

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  th {
    background-color: #f2f2f2;
  }
`;

const AttendanceContainer = styled.section`
  margin: 20px auto; /* Center the container and add top/bottom margin */
  max-width: 1500px; /* Set a fixed maximum width for the container */
`;

const AttendanceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h3 {
    margin: 0;
  }
`;

const LinkButton = styled(Link)`
  background-color: #0074d9;
  color: #fff;
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 4px;
  margin-right: 8px;
  transition: background-color 0.3s ease; /* Add smooth transition effect */

  &:hover {
    background-color: #5bc0de;
    color: black;
  }

  &:active {
    background-color: black; /* Change background color on click */
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EditButton = styled(Link)`
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

const DeleteButton = styled.button`
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

export default ListCourses;
