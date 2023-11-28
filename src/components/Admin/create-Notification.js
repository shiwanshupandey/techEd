import React, { Component } from 'react';
import axios from 'axios';
// import styled from "styled-components";
import "./allCourses.css";

class CreateNotification extends Component {
  constructor(props) {
    super();
    this.state = {
      title: '',
      subject: '',
      image: '',
      date: '',
    };
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeSubject = this.onChangeSubject.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeTitle(e) {
    this.setState({ title: e.target.value });
  }

  onChangeSubject(e) {
    this.setState({ subject: e.target.value });
  }

  onChangeImage(e) {
    this.setState({ image: e.target.value });
  }

  onChangeDate(e) {
    this.setState({ date: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const notification = {
      title: this.state.title,
      subject: this.state.subject,
      image: this.state.image,
      date: this.state.date,
    };

    axios
      .post('http://localhost:5000/notification/add', notification)
      .then((res) => {
        this.setState({
          successMessage: 'notification created successfully!',
          errorMessage: '',
        });

        this.setState({
            title: '',
            subject: '',
            image: '',
            date: '',
        });
      })
      .catch((error) => {
        this.setState({
          errorMessage: 'Error creating user. Please check your data and try again.',
          successMessage: '',
        });
        console.error(error);
      });
  }

  render() {

    return (
      <div className="containe">
        
        <h3>Create New Notification Log</h3>
        {this.state.errorMessage && (
          <div className="alert alert-danger">{this.state.errorMessage}</div>
        )}
        {this.state.successMessage && (
          <div className="alert alert-success">{this.state.successMessage}</div>
        )}
        <form onSubmit={this.onSubmit}>
          <div className="random-mb-5">
            <label for="name" className="random-form-label">Title:</label>
            <input
              type="text"
              required
              className="random-form-input"
              value={this.state.title}
              onChange={this.onChangeTitle}
            />
          </div>
          <div className="random-mb-5">
            <label for="name" className="random-form-label">Subject:</label>
            <input
              type="text"
              required
              className="random-form-input"
              value={this.state.subject}
              onChange={this.onChangeSubject}
            />
          </div>
          <div className="random-mb-5">
            <label for="name" className="random-form-label">image:</label>
            <input
              type="text"
              className="random-form-input"
              value={this.state.image}
              onChange={this.onChangeImage}
            />
          </div>
          <div className="random-mb-5">
            <label for="name" className="random-form-label">date:</label>
            <input
              type="text"
              className="random-form-input"
              value={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
          <div className="random-mb-5">
            <input type="submit" value="Create notification Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}




export default CreateNotification;




