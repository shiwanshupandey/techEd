import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  StyledTable,
  AttendanceContainer,
  AttendanceHeader,
  LinkButton,
  ActionButtons,
  EditButton,
  DeleteButton,
} from './styles';
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

const NotificationRow = (props) => (
  <tr>
    <td>{props.notification.title}</td>
    <td><ReadMore>{props.notification.subject}</ReadMore></td>
    <td><img src={props.notification.image} alt="Notification" style={{ maxWidth: '150px', maxHeight: '130px' }} /></td>
    <td>{props.notification.date}</td>
    <td>
      <ActionButtons>
      <EditButton className="btn btn-secondary">
        <Link to={`/edit-notifcation/${props.notification._id}`} style={{ color: 'white' }}>
          Edit
        </Link>
      </EditButton>{' '}
      ||{' '}
      <DeleteButton
        className="btn btn-danger"
        onClick={() => {
          props.deleteNotification(props.notification._id);
        }}
      >
        Delete
      </DeleteButton>
      </ActionButtons>
      
    </td>
  </tr>
);

class ListNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      error: null,
    };
    this.deleteNotification = this.deleteNotification.bind(this);
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/notification/get/')
      .then((res) => {
        this.setState({ notifications: res.data });
      })
      .catch((error) => {
        this.setState({ error });
      });
  }

  deleteNotification(_id) {
    const shouldDelete = window.confirm('Are you sure you want to delete this course?');
    if (!shouldDelete) {
      return; // Don't delete if the user cancels
    }
    
    axios.delete(`http://localhost:5000/notification/delete/${_id}`).then((res) => {
      console.log(res.data);
    });
    this.setState({ notifications: this.state.notifications.filter((el) => el._id !== _id) });
  }

  notificationsList() {
    const { notifications } = this.state;

    if (!Array.isArray(notifications) || notifications.length === 0) {
      return (
        <tr>
          <td colSpan="6">No notifications found.</td>
        </tr>
      );
    }

    return notifications.map((currentNotification) => (
      <NotificationRow
        notification={currentNotification}
        deleteNotification={this.deleteNotification}
        key={currentNotification._id}
      />
    ));
  }

  render() {
    return (
      <AttendanceContainer>
        <AttendanceHeader>
        <h3>Logged Notifications</h3>
        <LinkButton to="/create-notification" className="button-link">
          <h6>Create Notification</h6>
        </LinkButton>
        </AttendanceHeader>
        
        <StyledTable className="table">
          <thead className="thead-light">
            <tr>
              <th>Title</th>
              <th>Subject</th>
              <th>Image</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.notificationsList()}</tbody>
        </StyledTable>
      
      </AttendanceContainer>
    );
  }
}



export default ListNotification;
