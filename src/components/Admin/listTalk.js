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

const TalkRow = (props) => (
  <tr>
    <td>{props.talk.name}</td>
    <td>{props.talk.Email}</td>
    <td>{props.talk.message}</td>
    <td>

      <ActionButtons>
      <DeleteButton
        className="btn btn-danger"
        onClick={() => {
          props.deleteTalk(props.talk._id);
        }}
      >
        Delete
      </DeleteButton>
      </ActionButtons>
      
    </td>
  </tr>
);

class ListTalk extends Component {
  constructor(props) {
    super(props);
    this.state = {
        talk: [],
      error: null,
    };
    this.deleteTalk = this.deleteTalk.bind(this);
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/talk')
      .then((res) => {
        this.setState({ talk: res.data });
      })
      .catch((error) => {
        this.setState({ error });
      });
  }

  deleteTalk(_id) {
    const shouldDelete = window.confirm('Are you sure you want to delete this category?');
    if (!shouldDelete) {
      return; // Don't delete if the user cancels
    }
    
    axios.delete(`http://localhost:5000/talk/${_id}`).then((res) => {
      console.log(res.data);
    });
    this.setState({ talk: this.state.talk.filter((el) => el._id !== _id) });
  }

  talkList() {
    const { talk } = this.state;

    if (!Array.isArray(talk) || talk.length === 0) {
      return (
        <tr>
          <td colSpan="6">Not found.</td>
        </tr>
      );
    }

    return talk.map((currentTalk) => (
      <TalkRow
      talk={currentTalk}
        deleteTalk={this.deleteTalk}
        key={currentTalk._id}
      />
    ));
  }

  render() {
    return (
      <AttendanceContainer>
        <AttendanceHeader>
        <h3>Logged Talk</h3>
        </AttendanceHeader>
        
        
        <StyledTable className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.talkList()}</tbody>
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


export default ListTalk;
