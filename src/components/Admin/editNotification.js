import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./allCourses.css";

function EditNotification() {
  const { id } = useParams(); // Access route parameter 'id' using useParams
  const [notification, setNotification] = useState({
    title: '',
    subject: '',
    image: '',
    date: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:5000/notification/${id}`)
      .then((res) => {
        const notificationData = res.data;
        setNotification({
          title: notificationData.title,
          subject: notificationData.subject,
          image: notificationData.image,
          date: notificationData.date,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const onChangeInput = (e, field) => {
    setNotification({ ...notification, [field]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/notification/update/${id}`, notification)
      .then((res) => {
        setSuccessMessage('Course updated successfully!');
        setErrorMessage('');
      })
      .catch((error) => {
        setErrorMessage('Error updating course. Please check your data and try again.');
        setSuccessMessage('');
        console.error(error);
      });
  };

  return (
    <div className="containe">
      
      <h3>Edit Notification</h3>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <form onSubmit={onSubmit}>
        <div className="random-mb-5">
          <label for="name" className="random-form-label">Title</label>
          <input
            type="text"
            required
            className="random-form-input"
            value={notification.title}
            onChange={(e) => onChangeInput(e, 'title')}
          />
        </div>
        <div className="random-mb-5">
          <label for="name" className="random-form-label">Subject:</label>
          <input
            type="text"
            required
            className="random-form-input"
            value={notification.subject}
            onChange={(e) => onChangeInput(e, 'subject')}
          />
        </div>
        <div className="random-mb-5">
          <label for="name" className="random-form-label">Image:</label>
          <input
            type="text"
            required
            className="random-form-input"
            value={notification.image}
            onChange={(e) => onChangeInput(e, 'image')}
          />
        </div>
        <div className="random-mb-5">
          <label for="name" className="random-form-label">Date:</label>
          <input
            type="text"
            required
            className="random-form-input"
            value={notification.date}
            onChange={(e) => onChangeInput(e, 'date')}
          />
        </div>
        <div className="random-mb-5">
          <input type="submit" value="Edit Notification" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}

export default EditNotification;





