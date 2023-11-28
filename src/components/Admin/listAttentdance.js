import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from "styled-components";
import "./allCourses.css";

const Attendance = (props) => (
  <tr>
    <td>{new Date(props.attendance.date).toLocaleDateString()}</td>
    <td>{props.attendance.products.name}</td>
    <td>{props.attendance.Present.map((user) => user.fullname).join(', ')}</td>
    
    <td>
    <ActionButtons>
  <EditButton to={`/edit-attendance/${props.attendance._id}`}>Edit</EditButton>
  {' || '}
  <DeleteButton onClick={() => { props.deleteAttendance(props.attendance._id); }}>Delete</DeleteButton>
</ActionButtons>
</td>
  </tr>
);

class ListAttendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attendance: [],
    };
    this.deleteAttendance = this.deleteAttendance.bind(this);
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/attend/') // Update the API endpoint
      .then((res) => {
        this.setState({ attendance: res.data });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  deleteAttendance(_id) {
    const shouldDelete = window.confirm('Are you sure you want to delete this attendance record?');
    if (!shouldDelete) {
      return; // Don't delete if the user cancels
    }

    axios.delete(`http://localhost:5000/attend/${_id}`).then((res) => {
      console.log(res.data);
    });
    this.setState({ attendance: this.state.attendance.filter((el) => el._id !== _id) });
  }

  attendanceList() {
    if (!Array.isArray(this.state.attendance) || this.state.attendance.length === 0) {
      return (
        <tr>
          <td colSpan="2">No attendance records found.</td>
        </tr>
      );
    }

    return this.state.attendance.map((currentAttendance) => (
      <Attendance attendance={currentAttendance} deleteAttendance={this.deleteAttendance} key={currentAttendance._id} />
    ));
  }

  render() {

    const totalAttendees = this.state.attendance.length;
    return (
      <AttendanceContainer>
        <AttendanceHeader>
          <h3>Attendance</h3>
          <LinkButton to="/create-attendance">Create Attendance</LinkButton>
        </AttendanceHeader>
        <StyledTable>
          <thead>
            <tr>
              <th>Date</th>
              <th>Product</th>
              <th>Present</th>
              
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.attendanceList()}</tbody>
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

  &:hover {
    background-color: #0056a4;
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


export default ListAttendance;
