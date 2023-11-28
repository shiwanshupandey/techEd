import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./allCourses.css";

function EditCategory() {
  const { id } = useParams(); // Access route parameter 'id' using useParams
  const [category, setCategory] = useState({
    category:'',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:5000/category/${id}`)
      .then((res) => {
        const Data = res.data;
        setCategory({
          category: Data.category,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const onChangeInput = (e, field) => {
    setCategory({ ...category, [field]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/category/${id}`, category)
      .then((res) => {
        setSuccessMessage('category updated successfully!');
        setErrorMessage('');
      })
      .catch((error) => {
        setErrorMessage('Error updating category. Please check your data and try again.');
        setSuccessMessage('');
        console.error(error);
      });
  };

  return (
    <div className="containe">
      <h3>Edit category</h3>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <form onSubmit={onSubmit}>
        <div className="random-mb-5 w-full">
          <label for="name" className="random-form-label">Category</label>
          <input
            type="text"
            required
            className="random-form-input"
            value={category.category}
            onChange={(e) => onChangeInput(e, 'category')}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Edit Category" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}

export default EditCategory;





