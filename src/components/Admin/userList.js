import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './sidebar';
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

const User = (props) => (
  <tr>
    <td>{props.user.email}</td>
    {/* <td>{props.user.password}</td> */}
    <td>{props.user.fullname}</td>
    <td>{props.user.role}</td>
    <td>
      <ActionButtons>
      <EditButton className="btn btn-secondary">
        <Link to={`/edit/${props.user._id}`} style={{ color: 'white' }}>
          Edit
        </Link>
      </EditButton>{' '}
      |{' '}
      <DeleteButton
        className="btn btn-danger"
        onClick={() => {
          props.deleteUser(props.user._id);
        }}
      >
        Delete
      </DeleteButton>
      </ActionButtons>
      
    </td>
  </tr>
);

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/users/get/')
      .then((res) => {
		console.log('API Response:', res.data);
        this.setState({ users: res.data });
      })
      .catch((error) => {
		console.error(error);
	  });
  }

  deleteUser(_id) {
    const shouldDelete = window.confirm('Are you sure you want to delete this course?');
    if (!shouldDelete) {
      return; // Don't delete if the user cancels
    }
    
    axios.delete(`http://localhost:5000/users/delete/${_id}`).then((res) => {
      console.log(res.data);
    });
    this.setState({ users: this.state.users.filter((el) => el._id !== _id) });
  }

  usersList() {
    if (!Array.isArray(this.state.users) || this.state.users.length === 0) {
      return (
        <tr>
          <td colSpan="6">No users found.</td>
        </tr>
      );
    }

    return this.state.users.map((currentUser) => (
      <User user={currentUser} deleteUser={this.deleteUser} key={currentUser._id} />
    ));
  }

  render() {
    return (
      <AttendanceContainer>
        <AttendanceHeader>
        <h3>Logged User</h3>
		<LinkButton to="/create-user" className="button-link">
		<h6>create_user</h6>
		</LinkButton>
        </AttendanceHeader>
        <StyledTable className="table">
          <thead className="thead-light">
            <tr>
              <th>email</th>
              {/* <th>password</th> */}
              <th>fullname</th>
              <th>role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.usersList()}</tbody>
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

export default List;



























// import React, { Component } from 'react';
// import { Link } from "react-router-dom";
// import axios from "axios";
// const User = props => (
// <tr>
// <td>{props.user.email}</td>
// <td>{props.user.password}</td>
// <td>{props.user.fname}</td>
// <td>{props.user.lname}</td>
// <td>{props.user.role}</td>
// <td>
// <button className="btn btn-secondary"><Link to={"/edit/"+props.user.id} style={{color:"white"}}>Edit</Link></button> 
// | <button className="btn btn-danger" onClick={() => {props.deleteUser(props.user.id) }}>Delete</button>
// </td>
// </tr>
// )
// class List extends Component {
// constructor(props) {
// super(props);
// this.state = {
// users: []
// }
// this.deleteUser = this.deleteUser.bind(this);
// }
// componentDidMount() {
// axios.get('http://localhost:5000/users/get/')
// .then(res => {
// this.setState({ users: res.data })
// })
// .catch(error => console.log(error));
// }
// deleteUser(id) {
// axios.delete('http://localhost:5000/users/delete/' +id)
// .then(res => console.log(res.data));
// this.setState({ users: this.state.users.filter(el => el.id !== id)})
// }
// usersList() {
// return this.state.users.map(currentuser=> {
// return <User user={currentuser} deleteUser={this.deleteUser} key={currentuser.id} />
// })
// }
// render() {
// return (
// <div className="container">
// <h3>Logged User</h3>
// <table className="table">
// <thead className="thead-light">
// <tr>
// <th>email</th>
// <th>passsword</th>
// <th>fname</th>
// <th>lname</th>
// <th>role</th>
// <th>Action</th>
// </tr>
// </thead>
// <tbody>
// {this.usersList()}
// </tbody>
// </table>
// </div>
// );
// }
// }
// export default List;