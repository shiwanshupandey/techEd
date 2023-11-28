import React, { Component } from 'react';
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

const Exam = (props) => (
  <tr>
    <td>
      <input
        type="checkbox"
        checked={props.selected}
        onChange={() => props.toggleSelect(props.exam._id)}
      />
    </td>
    <td>{props.exam.product.name}</td>
    <td>
      <ActionButtons>
      <EditButton className="btn btn-secondary">
        <Link to={`/edit-exam/${props.exam._id}`} style={{ color: 'white' }}>
          Edit
        </Link>
      </EditButton>{' '}
      ||{' '}
      <DeleteButton
        className="btn btn-danger"
        onClick={() => {
          props.deleteExam(props.exam._id);
        }}
      >
        Delete
      </DeleteButton>
      </ActionButtons>
      
    </td>
  </tr>
);

class ListExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Exam: [],
      Result: [],
      selectedExams: [],
    };
    this.deleteExam = this.deleteExam.bind(this);
    this.toggleSelect = this.toggleSelect.bind(this);
    this.deleteSelectedExams = this.deleteSelectedExams.bind(this);

  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/exam/')
      .then((res) => {
        this.setState({ Exam: res.data });
      })
      .catch((error) => {
        console.error(error);
      });

      axios
      .get('http://localhost:5000/result')
      .then((res) => {
        this.setState({ Result: res.data });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  deleteExam(_id) {
    const shouldDelete = window.confirm('Are you sure you want to delete this course?');
    if (!shouldDelete) {
      return; // Don't delete if the user cancels
    }

    axios.delete(`http://localhost:5000/exam/${_id}`).then((res) => {
      console.log(res.data);
    });
    this.setState({ Exam: this.state.Exam.filter((el) => el._id !== _id) });
  }

  toggleSelect(_id) {
    this.setState((prevState) => ({
      selectedExams: prevState.selectedExams.includes(_id)
        ? prevState.selectedExams.filter((id) => id !== _id)
        : [...prevState.selectedExams, _id],
    }));
  }

  deleteSelectedExams() {
    const shouldDelete = window.confirm('Are you sure you want to delete the selected exams?');
    if (!shouldDelete) {
      return; // Don't delete if the user cancels
    }

    this.state.selectedExams.forEach((_id) => {
      axios.delete(`http://localhost:5000/exam/${_id}`).then((res) => {
        console.log(res.data);
      });
    });

    this.setState({
      exams: this.state.exams.filter((exam) => !this.state.selectedExams.includes(exam._id)),
      selectedExams: [],
    });
  }

  examList() {
    if (!Array.isArray(this.state.Exam) || this.state.Exam.length === 0) {
      return (
        <tr>
          <td colSpan="6">No Exam found.</td>
        </tr>
      );
    }

    return this.state.Exam.map((currentExam) => (
      <Exam 
      exam={currentExam} 
      deleteExam={this.deleteExam} 
      key={currentExam._id}
      toggleSelect={this.toggleSelect}
      selected={this.state.selectedExams.includes(currentExam._id)}
      />
    ));
  }

  render() {
    return (
      <AttendanceContainer>
        <AttendanceHeader>
        <h3>Exam</h3>
          <LinkButton to="/create-exam" className="button-link">
            <h6>create_exam</h6>
          </LinkButton>
        </AttendanceHeader>
          
          {this.state.selectedExams.length > 0 && (
            <button className="delete-selected-button" onClick={this.deleteSelectedExams}>
            Delete Selected
          </button>          
          )}

          <StyledTable className="table">
            <thead className="thead-light">
              <tr>
                <th>Select</th>
                <th>product</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>{this.examList()}</tbody>
          </StyledTable>
          <AttendanceHeader> <h3>Result</h3> </AttendanceHeader>
          
        {this.state.Result.length > 0 ? (
          <StyledTable className="table">
            <thead className="thead-light">
              <tr>
                
                <th>user</th>
                <th>exam</th>
                <th>score</th>
                
              </tr>
            </thead>
            <tbody>
              
              {this.state.Result.map((resultItem) => (
                <tr key={resultItem._id}>
                  <td>{resultItem.user.email}</td>
                  <td>{resultItem.exam.product.name}</td>
                  <td>{resultItem.score}</td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        ) : (
          <p>No result found.</p>
        )}
      
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

  /* styles.css (or any other CSS file you prefer) */
.delete-selected-button {
  background-color: #ff0000; /* Red background color */
  color: #fff; /* Text color */
  padding: 10px 20px; /* Padding for spacing */
  border: none; /* Remove button border */
  border-radius: 4px; /* Rounded corners */
  cursor: pointer; /* Show a pointer cursor on hover */
  margin-right: 10px; /* Add some spacing to the right of the button */
}

.delete-selected-button:hover {
  background-color: #cc0000; /* Darker red color on hover */
}

`;

export default ListExam;
